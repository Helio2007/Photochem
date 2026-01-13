from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import re
from typing import Optional

# Import our chemistry solver
from chemistry_solver import balance_equation

# Try to import OCR, but make it optional
try:
    import pytesseract
    # Try to configure Tesseract path for Windows (if not in PATH)
    import os
    if os.name == 'nt':  # Windows
        default_path = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        if os.path.exists(default_path):
            pytesseract.pytesseract.tesseract_cmd = default_path
    
    # Test if Tesseract is accessible
    try:
        pytesseract.get_tesseract_version()
        OCR_AVAILABLE = True
        print("✅ Tesseract OCR is available and ready!")
    except Exception as e:
        OCR_AVAILABLE = False
        print(f"⚠️  Warning: pytesseract installed but Tesseract executable not found.")
        print(f"   Error: {e}")
        print("   Install Tesseract from: https://github.com/UB-Mannheim/tesseract/wiki")
        print("   Or see INSTALL_OCR.md for detailed instructions")
except ImportError:
    OCR_AVAILABLE = False
    print("Warning: pytesseract not available. OCR features will be limited.")
    print("Install with: pip install pytesseract")

app = FastAPI(title="PhotoChem API", version="1.0.0")

# CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "PhotoChem API is running!"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


def extract_equation_from_text(text: str) -> Optional[str]:
    """Extract chemical equation from text using pattern matching."""
    if not text:
        return None
    
    # Clean the text - remove extra whitespace, normalize
    text = ' '.join(text.split())  # Normalize whitespace
    text = text.replace('\n', ' ').replace('\r', ' ')
    
    # Common OCR mistakes to fix
    replacements = {
        'O': 'O',  # Sometimes 0 is read as O
        'l': '1',  # Sometimes l is read as 1
        'I': '1',  # Sometimes I is read as 1
    }
    
    # More flexible patterns to match chemical equations
    patterns = [
        # Pattern: H2 + O2 → H2O (with arrow variations)
        r'([A-Z][a-z]?\d*(?:\s*\+\s*[A-Z][a-z]?\d*)+)\s*(?:→|->|=>|=|arrow)\s*([A-Z][a-z]?\d*(?:\s*\+\s*[A-Z][a-z]?\d*)+)',
        # Pattern with coefficients: 2H2 + O2 → 2H2O
        r'(\d*[A-Z][a-z]?\d*(?:\s*\+\s*\d*[A-Z][a-z]?\d*)+)\s*(?:→|->|=>|=)\s*(\d*[A-Z][a-z]?\d*(?:\s*\+\s*\d*[A-Z][a-z]?\d*)+)',
        # Pattern for single reactant/product: CaCO3 → CaO + CO2
        r'([A-Z][a-z]?\d*(?:\s*\+\s*[A-Z][a-z]?\d*)*)\s*(?:→|->|=>|=)\s*([A-Z][a-z]?\d*(?:\s*\+\s*[A-Z][a-z]?\d*)+)',
        # More lenient - allow spaces in formulas
        r'([A-Z][a-z]?\s*\d*(?:\s*\+\s*[A-Z][a-z]?\s*\d*)+)\s*(?:→|->|=>|=)\s*([A-Z][a-z]?\s*\d*(?:\s*\+\s*[A-Z][a-z]?\s*\d*)+)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            reactants = match.group(1).strip()
            products = match.group(2).strip()
            
            # Clean up the equation (remove extra spaces in formulas)
            reactants = re.sub(r'([A-Z])\s+(\d)', r'\1\2', reactants)  # H 2 -> H2
            products = re.sub(r'([A-Z])\s+(\d)', r'\1\2', products)
            
            # Normalize the arrow
            return f"{reactants} → {products}"
    
    return None


def preprocess_image(image: Image.Image) -> Image.Image:
    """Preprocess image to improve OCR accuracy."""
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize if too small (OCR works better on larger images)
    min_size = 300
    if image.width < min_size or image.height < min_size:
        scale = max(min_size / image.width, min_size / image.height)
        new_width = int(image.width * scale)
        new_height = int(image.height * scale)
        image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Enhance contrast (optional - can help with text recognition)
    from PIL import ImageEnhance
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.2)  # Slight contrast boost
    
    return image


def extract_text_from_image(image: Image.Image) -> str:
    """Extract text from image using OCR."""
    if not OCR_AVAILABLE:
        return ""
    
    try:
        # Preprocess image for better OCR
        processed_img = preprocess_image(image)
        
        # Configure OCR for better chemistry equation recognition
        # Use custom config for better number and symbol recognition
        custom_config = r'--oem 3 --psm 6 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+->→=()[]'
        
        # Try OCR with custom config
        text = pytesseract.image_to_string(processed_img, config=custom_config)
        
        # If that doesn't work well, try without restrictions
        if not text or len(text.strip()) < 3:
            text = pytesseract.image_to_string(processed_img)
        
        return text
    except Exception as e:
        print(f"OCR error: {e}")
        # If pytesseract is installed but Tesseract executable not found
        if "tesseract" in str(e).lower() or "not found" in str(e).lower():
            print("Note: Tesseract OCR executable not found. Install Tesseract OCR for image text extraction.")
        return ""


@app.post("/api/process-image")
async def process_image(image: UploadFile = File(...)):
    """
    Process uploaded chemistry problem image.
    1. Extract text from image using OCR
    2. Parse the chemistry equation
    3. Balance the equation
    4. Return step-by-step solution
    """
    try:
        # Read image
        contents = await image.read()
        img = Image.open(io.BytesIO(contents))
        
        # Extract text from image using OCR
        extracted_text = extract_text_from_image(img)
        
        # Try to extract equation from text
        equation = extract_equation_from_text(extracted_text)
        
        if not equation:
            # Provide helpful error message
            error_msg = "Could not detect a chemical equation in the image."
            suggestions = []
            
            if not OCR_AVAILABLE:
                suggestions.append("OCR is not available. Please install Tesseract OCR for image text extraction.")
            elif not extracted_text or len(extracted_text.strip()) < 3:
                suggestions.append("No text was extracted from the image. Try:")
                suggestions.append("- Uploading a clearer, higher resolution image")
                suggestions.append("- Ensuring the equation is clearly visible")
                suggestions.append("- Using better lighting")
            else:
                suggestions.append(f"Extracted text: {extracted_text[:100]}...")
                suggestions.append("The text doesn't appear to contain a valid chemical equation.")
            
            suggestions.append("\nYou can enter the equation manually using the input field below.")
            
            return JSONResponse(content={
                "error": error_msg,
                "extracted_text": extracted_text[:300] if extracted_text else "No text extracted",
                "suggestions": suggestions,
                "ocr_available": OCR_AVAILABLE
            })
        
        # Balance the equation
        result = balance_equation(equation)
        
        # Check if balancing had an error
        if "error" in result:
            return JSONResponse(content={
                "error": f"Detected equation: {equation}\n\n{result['error']}",
                "detected_equation": equation,
                "extracted_text": extracted_text[:200] if extracted_text else "No text extracted"
            })
        
        # Add metadata
        result["image_processed"] = True
        result["image_size"] = f"{img.width}x{img.height}"
        result["extracted_text"] = extracted_text[:200] if extracted_text else "No text extracted"
        result["detected_equation"] = equation
        result["ocr_used"] = OCR_AVAILABLE
        
        return JSONResponse(content=result)
        
    except Exception as e:
        import traceback
        error_detail = str(e)
        print(f"Error processing image: {error_detail}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error processing image: {error_detail}")


from pydantic import BaseModel

class EquationRequest(BaseModel):
    equation: str

@app.post("/api/solve-equation")
async def solve_equation(request: EquationRequest):
    """
    Solve a chemical equation directly from text input.
    """
    try:
        result = balance_equation(request.equation)
        return JSONResponse(content=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error solving equation: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
