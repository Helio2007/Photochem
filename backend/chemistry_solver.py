"""
Chemistry equation balancing module.
Implements proper chemical equation balancing using matrix methods.
"""
import re
from typing import Dict, List, Tuple, Optional
from collections import defaultdict
import numpy as np

# Try to import sympy for alternative balancing method
try:
    from sympy import Matrix, lcm
    SYMPY_AVAILABLE = True
except ImportError:
    SYMPY_AVAILABLE = False


class ChemicalFormula:
    """Represents a chemical formula and can parse it."""
    
    def __init__(self, formula: str):
        self.formula = formula.strip()
        self.elements = self._parse_formula()
    
    def _parse_formula(self) -> Dict[str, int]:
        """Parse a chemical formula and return element counts."""
        elements = {}
        # Pattern to match element symbols (capital letter + optional lowercase + optional number)
        pattern = r'([A-Z][a-z]?)(\d*)'
        matches = re.findall(pattern, self.formula)
        
        for element, count_str in matches:
            count = int(count_str) if count_str else 1
            elements[element] = elements.get(element, 0) + count
        
        return elements
    
    def get_elements(self) -> Dict[str, int]:
        return self.elements.copy()


class EquationBalancer:
    """Balances chemical equations using matrix methods."""
    
    def __init__(self, equation: str):
        self.original_equation = equation
        self.reactants = []
        self.products = []
        self.all_elements = set()
        self.coefficients = []
        self.steps = []
        
    def parse_equation(self) -> bool:
        """Parse the equation into reactants and products."""
        # Find the separator
        separators = ['→', '->', '=>', '=']
        separator = None
        for sep in separators:
            if sep in self.original_equation:
                separator = sep
                break
        
        if not separator:
            return False
        
        parts = self.original_equation.split(separator)
        if len(parts) != 2:
            return False
        
        reactants_str = parts[0].strip()
        products_str = parts[1].strip()
        
        # Parse reactants
        self.reactants = [ChemicalFormula(f.strip()) for f in reactants_str.split('+')]
        
        # Parse products
        self.products = [ChemicalFormula(f.strip()) for f in products_str.split('+')]
        
        # Collect all elements
        for formula in self.reactants + self.products:
            self.all_elements.update(formula.get_elements().keys())
        
        self.all_elements = sorted(list(self.all_elements))
        return True
    
    def build_matrix(self) -> Tuple[np.ndarray, np.ndarray]:
        """Build the matrix for balancing (Ax = 0)."""
        num_compounds = len(self.reactants) + len(self.products)
        num_elements = len(self.all_elements)
        
        # Create matrix A
        A = np.zeros((num_elements, num_compounds), dtype=int)
        
        # Fill matrix for reactants (positive coefficients)
        for i, formula in enumerate(self.reactants):
            elements = formula.get_elements()
            for j, element in enumerate(self.all_elements):
                A[j, i] = elements.get(element, 0)
        
        # Fill matrix for products (negative coefficients)
        for i, formula in enumerate(self.products):
            elements = formula.get_elements()
            for j, element in enumerate(self.all_elements):
                A[j, len(self.reactants) + i] = -elements.get(element, 0)
        
        return A, np.zeros(num_elements)
    
    def solve_balance(self) -> Optional[List[int]]:
        """Solve the balancing equation using null space."""
        A, _ = self.build_matrix()
        
        # Try using SymPy if available (more reliable)
        if SYMPY_AVAILABLE:
            try:
                A_sympy = Matrix(A.tolist())
                # Find null space
                nullspace = A_sympy.nullspace()
                if nullspace:
                    null_vec = nullspace[0]
                    # Convert to numpy array
                    null_space_vec = np.array([float(x) for x in null_vec])
                    # Make positive
                    if np.any(null_space_vec < 0):
                        null_space_vec = -null_space_vec
                    # Rationalize
                    solution = self._rationalize_coefficients(null_space_vec)
                    if np.all(solution > 0):
                        return solution.tolist()
            except Exception:
                pass
        
        # Fallback to QR decomposition
        try:
            Q, R = np.linalg.qr(A.T)
            rank = np.sum(np.abs(np.diag(R)) > 1e-10)
            null_dim = A.shape[1] - rank
            
            if null_dim > 0:
                null_space_vec = Q[:, -1]
                if np.any(null_space_vec < 0):
                    null_space_vec = -null_space_vec
                solution = self._rationalize_coefficients(null_space_vec)
                if np.all(solution > 0):
                    return solution.tolist()
        except Exception:
            pass
        
        # Final fallback to SVD
        try:
            U, s, Vt = np.linalg.svd(A.astype(float), full_matrices=True)
            null_space_vec = Vt[-1]
            if np.any(null_space_vec < 0):
                null_space_vec = -null_space_vec
            solution = self._rationalize_coefficients(null_space_vec)
            if np.all(solution > 0):
                return solution.tolist()
        except Exception:
            pass
        
        return None
    
    def _rationalize_coefficients(self, coeffs: np.ndarray) -> np.ndarray:
        """Convert float coefficients to smallest integer coefficients."""
        # Find the minimum positive value
        min_val = np.min(coeffs[coeffs > 0])
        
        # Scale to make minimum value 1
        scaled = coeffs / min_val
        
        # Find LCM to convert to integers
        from fractions import Fraction
        
        fractions = [Fraction(c).limit_denominator(1000) for c in scaled]
        denominators = [f.denominator for f in fractions]
        lcm = self._lcm_multiple(denominators)
        
        # Convert to integers
        int_coeffs = np.array([int(f * lcm) for f in fractions])
        
        # Find GCD and simplify
        gcd = self._gcd_multiple(int_coeffs)
        if gcd > 0:
            int_coeffs = int_coeffs // gcd
        
        return int_coeffs
    
    def _gcd(self, a: int, b: int) -> int:
        """Greatest common divisor."""
        while b:
            a, b = b, a % b
        return abs(a)
    
    def _gcd_multiple(self, numbers: np.ndarray) -> int:
        """GCD of multiple numbers."""
        result = numbers[0]
        for num in numbers[1:]:
            result = self._gcd(result, int(num))
        return result
    
    def _lcm(self, a: int, b: int) -> int:
        """Least common multiple."""
        return abs(a * b) // self._gcd(a, b) if a and b else 0
    
    def _lcm_multiple(self, numbers: List[int]) -> int:
        """LCM of multiple numbers."""
        result = numbers[0]
        for num in numbers[1:]:
            result = self._lcm(result, num)
        return result
    
    def generate_steps(self, coefficients: List[int]) -> List[str]:
        """Generate step-by-step solution."""
        steps = []
        
        steps.append(f"Original equation: {self.original_equation}")
        steps.append("Step 1: Identify all elements in the equation")
        steps.append(f"   Elements found: {', '.join(self.all_elements)}")
        
        steps.append("Step 2: Count atoms on each side")
        for element in self.all_elements:
            reactant_count = sum(
                coeff * formula.get_elements().get(element, 0)
                for coeff, formula in zip(coefficients[:len(self.reactants)], self.reactants)
            )
            product_count = sum(
                coeff * formula.get_elements().get(element, 0)
                for coeff, formula in zip(coefficients[len(self.reactants):], self.products)
            )
            steps.append(f"   {element}: Reactants = {reactant_count}, Products = {product_count}")
        
        steps.append("Step 3: Apply coefficients to balance atoms")
        steps.append(f"   Coefficients: {coefficients}")
        
        steps.append("Step 4: Verify the balanced equation")
        
        return steps
    
    def format_balanced_equation(self, coefficients: List[int]) -> str:
        """Format the balanced equation with coefficients."""
        parts = []
        
        # Add reactants
        reactant_parts = []
        for i, (coeff, formula) in enumerate(zip(coefficients[:len(self.reactants)], self.reactants)):
            if coeff == 1:
                reactant_parts.append(formula.formula)
            else:
                reactant_parts.append(f"{coeff}{formula.formula}")
        parts.append(" + ".join(reactant_parts))
        
        # Add arrow
        parts.append("→")
        
        # Add products
        product_parts = []
        for i, (coeff, formula) in enumerate(zip(coefficients[len(self.reactants):], self.products)):
            if coeff == 1:
                product_parts.append(formula.formula)
            else:
                product_parts.append(f"{coeff}{formula.formula}")
        parts.append(" + ".join(product_parts))
        
        return " ".join(parts)
    
    def balance(self) -> Dict:
        """Main method to balance the equation."""
        if not self.parse_equation():
            return {
                "error": "Invalid equation format. Please use → or -> to separate reactants and products."
            }
        
        coefficients = self.solve_balance()
        
        if coefficients is None:
            return {
                "error": "Could not balance the equation. Please check the equation format."
            }
        
        # Verify the balance
        for element in self.all_elements:
            reactant_count = sum(
                coeff * formula.get_elements().get(element, 0)
                for coeff, formula in zip(coefficients[:len(self.reactants)], self.reactants)
            )
            product_count = sum(
                coeff * formula.get_elements().get(element, 0)
                for coeff, formula in zip(coefficients[len(self.reactants):], self.products)
            )
            if reactant_count != product_count:
                return {
                    "error": f"Balancing failed. {element} atoms don't match: {reactant_count} ≠ {product_count}"
                }
        
        balanced_eq = self.format_balanced_equation(coefficients)
        steps = self.generate_steps(coefficients)
        
        explanation = f"The equation has been balanced. All {len(self.all_elements)} elements are now balanced on both sides."
        
        return {
            "equation": self.original_equation,
            "balanced_equation": balanced_eq,
            "steps": steps,
            "explanation": explanation,
            "coefficients": {
                "reactants": dict(zip([f.formula for f in self.reactants], coefficients[:len(self.reactants)])),
                "products": dict(zip([f.formula for f in self.products], coefficients[len(self.reactants):]))
            }
        }


def balance_equation(equation: str) -> Dict:
    """Main function to balance a chemical equation."""
    try:
        balancer = EquationBalancer(equation)
        return balancer.balance()
    except Exception as e:
        return {
            "error": f"Error balancing equation: {str(e)}"
        }
