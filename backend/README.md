# PhotoChem Backend

FastAPI backend for the PhotoChem chemistry problem solver.

## Setup

1. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Future Enhancements

- [ ] OCR integration (Tesseract, Google Vision API, or similar)
- [ ] Advanced equation balancing using ChemPy or similar
- [ ] Stoichiometry calculations
- [ ] Molecular structure recognition
- [ ] Periodic table data integration
