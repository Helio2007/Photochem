"""
Quick test script to verify Tesseract OCR is installed and working.
Run: python test_ocr.py
"""
try:
    import pytesseract
    from PIL import Image
    
    print("Testing Tesseract OCR installation...")
    print("-" * 50)
    
    # Try to get version
    try:
        version = pytesseract.get_tesseract_version()
        print(f"✅ Tesseract OCR is installed!")
        print(f"   Version: {version}")
    except Exception as e:
        print(f"❌ Tesseract OCR not found!")
        print(f"   Error: {e}")
        print("\n💡 Solutions:")
        print("   1. Install Tesseract from: https://github.com/UB-Mannheim/tesseract/wiki")
        print("   2. Make sure it's in your PATH")
        print("   3. Or configure the path in backend/app.py:")
        print('      pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"')
        exit(1)
    
    # Test with a simple image (if available)
    print("\n" + "-" * 50)
    print("OCR is ready to use!")
    print("\nYou can now:")
    print("  - Upload images with chemistry equations")
    print("  - Use the camera to capture equations")
    print("  - OCR will extract text from images")
    
except ImportError:
    print("❌ pytesseract package not installed")
    print("   Run: pip install pytesseract")
except Exception as e:
    print(f"❌ Unexpected error: {e}")
