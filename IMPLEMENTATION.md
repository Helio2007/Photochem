# Implementation Details

## What Was Implemented

### 1. Real Chemical Equation Balancing ✅

Created `backend/chemistry_solver.py` with a proper equation balancing algorithm that:
- Parses chemical formulas and extracts elements
- Uses matrix methods (SVD) to find balanced coefficients
- Provides step-by-step solutions
- Handles complex equations with multiple reactants and products

**How it works:**
- Converts the balancing problem into a system of linear equations (Ax = 0)
- Uses Singular Value Decomposition (SVD) to find the null space
- Converts fractional solutions to smallest integer coefficients
- Verifies that all atoms are balanced

### 2. OCR Support (Optional) 📸

Added OCR capability using `pytesseract`:
- Extracts text from uploaded images
- Automatically detects chemical equations in the text
- Falls back gracefully if OCR is not available

**Note:** To use OCR, you need to:
1. Install Tesseract OCR on your system
2. Install pytesseract: `pip install pytesseract`

### 3. Manual Equation Input ✍️

Added a manual input component so users can:
- Type equations directly if OCR fails
- Test equations without uploading images
- See example equations to try

### 4. Enhanced API Endpoints

- `POST /api/process-image` - Now uses real OCR and balancing
- `POST /api/solve-equation` - Accepts JSON body with equation

## Testing the Implementation

### Test the Balancing Algorithm

Run the test script:
```bash
cd backend
python test_chemistry.py
```

This will test several common equations:
- H2 + O2 → H2O
- CH4 + O2 → CO2 + H2O
- Fe + O2 → Fe2O3
- And more...

### Test via API

1. Start the backend:
   ```bash
   cd backend
   python app.py
   ```

2. Test with curl or Postman:
   ```bash
   curl -X POST http://localhost:8000/api/solve-equation \
     -H "Content-Type: application/json" \
     -d '{"equation": "H2 + O2 → H2O"}'
   ```

### Test via Frontend

1. Start both servers (backend and frontend)
2. Try entering equations manually:
   - `H2 + O2 → H2O`
   - `CH4 + O2 → CO2 + H2O`
   - `Fe + O2 → Fe2O3`

## Installing OCR (Optional)

### Windows:
1. Download Tesseract from: https://github.com/UB-Mannheim/tesseract/wiki
2. Install it (default location: `C:\Program Files\Tesseract-OCR`)
3. Add to PATH or set in code:
   ```python
   pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
   ```

### macOS:
```bash
brew install tesseract
```

### Linux:
```bash
sudo apt-get install tesseract-ocr
```

## How Equation Balancing Works

1. **Parse the equation**: Split into reactants and products
2. **Extract elements**: Identify all unique elements (H, O, C, etc.)
3. **Build matrix**: Create a matrix where each row is an element and each column is a compound
4. **Solve**: Use linear algebra to find coefficients that balance all atoms
5. **Simplify**: Convert to smallest integer coefficients
6. **Verify**: Check that all atoms are balanced

## Example Output

For input: `H2 + O2 → H2O`

Output:
```json
{
  "equation": "H2 + O2 → H2O",
  "balanced_equation": "2H2 + O2 → 2H2O",
  "steps": [
    "Original equation: H2 + O2 → H2O",
    "Step 1: Identify all elements in the equation",
    "   Elements found: H, O",
    "Step 2: Count atoms on each side",
    "   H: Reactants = 4, Products = 4",
    "   O: Reactants = 2, Products = 2",
    ...
  ],
  "explanation": "The equation has been balanced. All 2 elements are now balanced on both sides."
}
```

## Limitations

- Currently handles simple to moderate complexity equations
- Very complex equations with many compounds might need optimization
- OCR accuracy depends on image quality
- Some edge cases with parentheses in formulas may need additional parsing

## Future Enhancements

- [ ] Support for parentheses in formulas (e.g., Ca(OH)2)
- [ ] Support for charges in ionic equations
- [ ] Stoichiometry calculations
- [ ] Reaction type identification
- [ ] Better OCR with preprocessing (image enhancement)
- [ ] Support for handwritten equations (ML model)
