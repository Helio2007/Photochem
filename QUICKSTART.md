# Quick Start Guide

Follow these steps to get PhotoChem up and running:

## Step 1: Install Frontend Dependencies

Open a terminal in the project root and run:

```bash
cd frontend
npm install
```

This will install all React, Vite, and Tailwind CSS dependencies.

## Step 2: Install Backend Dependencies

In a new terminal window (keep the frontend terminal open), run:

```bash
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows (Command Prompt):
venv\Scripts\activate
# On Windows (PowerShell):
venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate
```

**Important:** After activating the virtual environment, you should see `(venv)` at the beginning of your command prompt. This confirms it's activated.

Then install Python packages:

```bash
# Make sure (venv) is visible in your prompt before running this
pip install -r requirements.txt
```

**If you get a permission error on Windows:**
- Make sure the virtual environment is activated (you should see `(venv)` in your prompt)
- If still having issues, try: `python -m pip install -r requirements.txt`
- Alternative: Use `--user` flag: `pip install --user -r requirements.txt` (not recommended, but works if venv fails)

## Step 3: Start the Backend Server

In the backend terminal (with virtual environment activated):

```bash
python app.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

The backend API is now running at `http://localhost:8000`

## Step 4: Start the Frontend Development Server

In the frontend terminal:

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 5: Open the App

Open your browser and navigate to:
**http://localhost:5173**

## Testing the App

1. Click "Upload Image" to upload a chemistry problem image
2. Or click "Use Camera" to capture a photo
3. The app will process the image and display a solution (currently returns a sample response)

## Next Steps

### For Production Development:

1. **Add OCR Integration:**
   - Install Tesseract OCR: `pip install pytesseract`
   - Or use Google Vision API for better accuracy
   - Update `backend/app.py` to extract text from images

2. **Implement Real Equation Balancing:**
   - Use ChemPy library: `pip install chempy`
   - Implement proper chemical equation balancing algorithms
   - Add stoichiometry calculations

3. **Enhance UI:**
   - Add more chemistry-specific features
   - Implement solution history
   - Add periodic table integration

## Troubleshooting

### Windows Permission Error (Access Denied):
If you see `[WinError 5] Access is denied` when installing packages:

1. **Make sure virtual environment is activated:**
   - You should see `(venv)` at the start of your command prompt
   - If not, run: `venv\Scripts\activate` (Windows CMD) or `venv\Scripts\Activate.ps1` (PowerShell)

2. **Verify you're in the backend directory:**
   ```bash
   cd backend
   ```

3. **Try using python -m pip instead:**
   ```bash
   python -m pip install -r requirements.txt
   ```

4. **If PowerShell execution policy blocks activation:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

5. **Last resort - use --user flag (not recommended):**
   ```bash
   pip install --user -r requirements.txt
   ```

### Backend won't start:
- Make sure Python 3.9+ is installed: `python --version`
- Check that all dependencies are installed: `pip list`
- Verify virtual environment is activated (look for `(venv)` in prompt)
- Make sure you're in the `backend` directory when running `python app.py`

### Frontend won't start:
- Make sure Node.js 18+ is installed: `node --version`
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- Make sure you're in the `frontend` directory when running `npm run dev`

### CORS errors:
- Make sure backend is running on port 8000
- Check that frontend proxy is configured correctly in `vite.config.js`
- Verify backend shows: `INFO: Uvicorn running on http://0.0.0.0:8000`

## Project Structure

```
photochem/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── backend/               # Python FastAPI backend
│   ├── app.py            # Main API server
│   └── requirements.txt  # Python dependencies
└── README.md
```

## API Endpoints

- `GET /` - API welcome message
- `GET /api/health` - Health check
- `POST /api/process-image` - Process chemistry problem image
- `POST /api/solve-equation` - Solve equation from text

Visit `http://localhost:8000/docs` for interactive API documentation.
