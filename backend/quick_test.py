"""Quick test to debug the balancing issue"""
from chemistry_solver import balance_equation

# Test the simple equation
result = balance_equation("H2 + O2 -> H2O")
print("Result:", result)
if "error" in result:
    print("ERROR:", result["error"])
else:
    print("SUCCESS!")
    print("Balanced:", result["balanced_equation"])
