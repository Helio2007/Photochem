# PhotoChem - Chemistry Problem Solver

A chemistry problem-solving app similar to Photomath, built with React + Vite frontend and Python FastAPI backend.

## Features

- 📸 Capture or upload chemistry problems
- 🧪 Solve chemical equations and balance reactions
- 📝 Step-by-step solutions
- 🎓 Educational explanations

## Project Structure

```
photochem/
├── frontend/          # React + Vite frontend
├── backend/           # Python FastAPI backend
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- npm or yarn

### Installation

1. **Install Frontend Dependencies:**
   ```bash
   npm run install-frontend
   ```

2. **Install Backend Dependencies:**
   ```bash
   npm run install-backend
   # Or manually:
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the Backend Server:**
   ```bash
   cd backend
   python app.py
   ```
   The backend will run on `http://localhost:8000`

2. **Start the Frontend Development Server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS (for styling)
- Axios (for API calls)

### Backend
- FastAPI
- Python 3.9+
- Pillow (for image processing)
- SymPy (for symbolic math)
- ChemPy (for chemistry calculations)

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
python app.py
```

## API Endpoints

- `POST /api/process-image` - Process uploaded chemistry problem image
- `POST /api/solve-equation` - Solve a chemical equation
- `GET /api/health` - Health check endpoint

## Future Enhancements

- [ ] OCR integration for text recognition
- [ ] Advanced equation balancing
- [ ] Stoichiometry calculations
- [ ] Periodic table integration
- [ ] Solution history
- [ ] User accounts and saved problems

## License

MIT
