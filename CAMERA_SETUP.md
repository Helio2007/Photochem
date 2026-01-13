# Camera and Image Upload Setup Guide

## How It Works

The app supports two ways to input chemistry problems:

1. **Upload Image** - Upload a photo of a chemistry equation
2. **Use Camera** - Take a photo directly with your device camera
3. **Manual Input** - Type the equation directly (fallback option)

## Image Processing Flow

1. **Image Upload/Capture** → Frontend sends image to backend
2. **Image Preprocessing** → Backend enhances image for better OCR
3. **OCR Text Extraction** → Extracts text from the image
4. **Equation Detection** → Finds chemical equation in the text
5. **Equation Balancing** → Solves and balances the equation
6. **Display Solution** → Shows step-by-step solution

## OCR Setup (Optional but Recommended)

For best results with image uploads, install Tesseract OCR:

### Windows:
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Install to default location: `C:\Program Files\Tesseract-OCR`
3. The Python package `pytesseract` is already in requirements.txt

### macOS:
```bash
brew install tesseract
```

### Linux:
```bash
sudo apt-get install tesseract-ocr
```

## Tips for Best Results

### Image Quality:
- ✅ Use clear, well-lit images
- ✅ Ensure text is readable
- ✅ Avoid blurry or dark images
- ✅ Higher resolution = better results

### Equation Format:
- ✅ Write equations clearly: `H2 + O2 → H2O`
- ✅ Use arrows: `→`, `->`, or `=`
- ✅ Separate compounds with `+`
- ✅ Use proper chemical notation

### If OCR Fails:
- The app will show the extracted text (if any)
- You can manually enter the equation using the input field
- Try taking a clearer photo or uploading a better image

## Troubleshooting

### "No text extracted" error:
- Check if Tesseract OCR is installed
- Try a clearer, higher resolution image
- Ensure good lighting
- Use the manual input as fallback

### "Could not detect equation" error:
- Check the extracted text shown in the error
- The equation format might not be recognized
- Try entering it manually

### Camera not working:
- Check browser permissions for camera access
- Use HTTPS (required for camera on most browsers)
- Try a different browser
- Use the upload option instead

## Testing Without OCR

Even without OCR installed, you can:
- ✅ Use manual equation input
- ✅ Test the balancing algorithm
- ✅ See how the app works

The app will gracefully handle missing OCR and suggest manual input.
