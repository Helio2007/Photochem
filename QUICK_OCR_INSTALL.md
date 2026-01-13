# Quick OCR Installation Guide

## For Windows Users

### What You Need:
1. ✅ **pytesseract** (Python package) - Already installed!
2. ❌ **Tesseract OCR** (executable) - Need to install this

### Installation Steps:

#### Step 1: Download Tesseract
- Go to: **https://github.com/UB-Mannheim/tesseract/wiki**
- Click on the latest Windows installer
- Download: `tesseract-ocr-w64-setup-v5.x.x.exe`

#### Step 2: Install
1. Run the downloaded `.exe` file
2. **Important:** Install to default location: `C:\Program Files\Tesseract-OCR`
3. ✅ **Check the box** "Add to PATH" during installation (makes it easier)
4. Click "Install"

#### Step 3: Verify
Open a **new** Command Prompt and type:
```bash
tesseract --version
```

You should see version info. If you see "command not found", Tesseract isn't in PATH.

#### Step 4: Restart Backend
```bash
cd backend
venv\Scripts\activate
python app.py
```

You should see: `✅ Tesseract OCR is available and ready!`

### If Installation Fails:

**Option 1: Add to PATH manually**
1. Search "Environment Variables" in Windows
2. Click "Environment Variables"
3. Under "System variables", find "Path" and click "Edit"
4. Click "New" and add: `C:\Program Files\Tesseract-OCR`
5. Click OK on all dialogs
6. **Restart your terminal**

**Option 2: The code will auto-detect it**
The app will automatically find Tesseract at `C:\Program Files\Tesseract-OCR\tesseract.exe`

### Test It:
1. Restart your backend server
2. Try uploading an image with a chemistry equation
3. OCR should now work!

## Troubleshooting

### "tesseract is not installed" error:
- Make sure Tesseract is installed (not just pytesseract)
- Check if it's in PATH: `tesseract --version` in CMD
- Restart your terminal after installation

### Still not working?
Run the test script:
```bash
cd backend
python test_ocr.py
```

This will tell you exactly what's wrong!
