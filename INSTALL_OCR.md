# Installing Tesseract OCR for Windows

## Step-by-Step Installation Guide

### Step 1: Download Tesseract OCR

1. Go to: https://github.com/UB-Mannheim/tesseract/wiki
2. Download the Windows installer (latest version)
   - Look for: `tesseract-ocr-w64-setup-v5.x.x.exe` (or similar)
   - Choose the 64-bit version if you have 64-bit Windows

### Step 2: Install Tesseract

1. Run the downloaded installer
2. **Important:** Install to the default location:
   ```
   C:\Program Files\Tesseract-OCR
   ```
3. During installation, you can optionally:
   - ✅ Check "Add to PATH" (recommended - makes it easier)
   - ✅ Install additional language data if needed

### Step 3: Verify Installation

Open a new Command Prompt or PowerShell and run:
```bash
tesseract --version
```

You should see version information like:
```
tesseract 5.x.x
```

### Step 4: Configure Python (if needed)

If Tesseract is NOT in your PATH, you may need to tell pytesseract where it is.

**Option A: If you added to PATH during installation**
- You're done! Restart your terminal and backend server

**Option B: If you didn't add to PATH**
- You'll need to configure it in the code (see below)

### Step 5: Test in Your App

1. Restart your backend server:
   ```bash
   cd backend
   venv\Scripts\activate
   python app.py
   ```

2. Try uploading an image with a chemistry equation

## Troubleshooting

### "TesseractNotFoundError" or "tesseract is not installed"

**Solution 1: Add to PATH manually**
1. Find where Tesseract is installed (usually `C:\Program Files\Tesseract-OCR`)
2. Add to Windows PATH:
   - Search "Environment Variables" in Windows
   - Edit "Path" variable
   - Add: `C:\Program Files\Tesseract-OCR`
   - Restart terminal

**Solution 2: Configure in code**
Edit `backend/app.py` and add at the top (after imports):
```python
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

### Still not working?

1. Verify Tesseract is installed:
   ```bash
   "C:\Program Files\Tesseract-OCR\tesseract.exe" --version
   ```

2. Check if pytesseract can find it:
   ```python
   python -c "import pytesseract; print(pytesseract.get_tesseract_version())"
   ```

## Quick Test Script

Create a file `test_ocr.py` in the backend folder:

```python
try:
    import pytesseract
    from PIL import Image
    import io
    
    # Try to get version
    version = pytesseract.get_tesseract_version()
    print(f"✅ Tesseract OCR is working! Version: {version}")
    
    # If you have a test image, uncomment below:
    # img = Image.open('test_image.png')
    # text = pytesseract.image_to_string(img)
    # print(f"Extracted text: {text}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    print("\nTroubleshooting:")
    print("1. Make sure Tesseract is installed")
    print("2. Check if it's in PATH or configure the path in code")
```

Run it:
```bash
cd backend
python test_ocr.py
```
