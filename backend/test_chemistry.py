"""
Simple test script to verify equation balancing works.
Run this to test: python test_chemistry.py
"""
import sys
import io
from chemistry_solver import balance_equation

# Fix encoding for Windows console
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def test_equations():
    test_cases = [
        "H2 + O2 -> H2O",
        "CH4 + O2 -> CO2 + H2O",
        "Fe + O2 -> Fe2O3",
        "CaCO3 -> CaO + CO2",
        "N2 + H2 -> NH3",
    ]
    
    print("Testing equation balancing...\n")
    
    for equation in test_cases:
        print(f"Testing: {equation}")
        result = balance_equation(equation)
        
        if "error" in result:
            print(f"  Error: {result['error']}\n")
        else:
            print(f"  Balanced: {result['balanced_equation']}\n")
            print(f"  Steps: {len(result['steps'])} steps generated\n")

if __name__ == "__main__":
    test_equations()
