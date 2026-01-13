import { useState } from 'react'

function ManualInput({ onEquationSolved, loading }) {
  const [equation, setEquation] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!equation.trim()) {
      setError('Please enter a chemical equation')
      return
    }

    try {
      const response = await fetch('/api/solve-equation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ equation: equation.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to solve equation')
      }

      const data = await response.json()
      onEquationSolved(data)
    } catch (err) {
      setError(err.message || 'An error occurred while solving the equation')
      console.error('Error:', err)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Or Enter Equation Manually
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="e.g., H2 + O2 → H2O"
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 transition-colors outline-none"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Use → or -> to separate reactants and products
          </p>
        </div>
        <button
          type="submit"
          disabled={loading || !equation.trim()}
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Solving...' : 'Solve Equation'}
        </button>
      </form>
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold mb-1">Examples:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>H2 + O2 → H2O</li>
          <li>CH4 + O2 → CO2 + H2O</li>
          <li>Fe + O2 → Fe2O3</li>
          <li>CaCO3 → CaO + CO2</li>
        </ul>
      </div>
    </div>
  )
}

export default ManualInput
