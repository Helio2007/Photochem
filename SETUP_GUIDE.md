# Setup Guide - Quick Reference

## Do I Need to Install Packages Every Time?

**No!** Once you install packages in the virtual environment, they stay there. You just need to **activate** the virtual environment each time you open a new terminal.

### First Time Setup (One Time Only):

```bash
cd backend
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
```

### Every Time You Work on the Project:

**Just activate the virtual environment:**

```bash
cd backend
venv\Scripts\activate
```

You'll see `(venv)` at the start of your prompt - that means it's activated!

Then run:
```bash
python app.py
```

## Quick Start Commands

### Backend (Terminal 1):
```bash
cd backend
venv\Scripts\activate
python app.py
```

### Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

## Troubleshooting

### "Packages not found" error?
- Make sure virtual environment is activated (you see `(venv)` in prompt)
- If not activated: `venv\Scripts\activate`

### "Command not found" error?
- Make sure you're in the correct directory (`backend` or `frontend`)
- Check that Python/Node.js is installed

### Want to add new packages?
1. Activate venv: `venv\Scripts\activate`
2. Install: `python -m pip install package-name`
3. Update requirements: `python -m pip freeze > requirements.txt`
