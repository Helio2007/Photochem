function SolutionDisplay({ solution }) {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Solution
      </h2>

      {solution.equation && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Equation:
          </h3>
          <p className="text-2xl font-mono text-gray-900 dark:text-white">
            {solution.equation}
          </p>
        </div>
      )}

      {solution.balanced_equation && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
            Balanced Equation:
          </h3>
          <p className="text-2xl font-mono text-green-900 dark:text-green-100">
            {solution.balanced_equation}
          </p>
        </div>
      )}

      {solution.steps && solution.steps.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
            Step-by-Step Solution:
          </h3>
          <ol className="list-decimal list-inside space-y-2">
            {solution.steps.map((step, index) => (
              <li
                key={index}
                className="text-gray-700 dark:text-gray-200 mb-2 pl-2"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {solution.explanation && (
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">
            Explanation:
          </h3>
          <p className="text-gray-700 dark:text-gray-200">
            {solution.explanation}
          </p>
        </div>
      )}

      {solution.error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            {solution.error}
          </p>
        </div>
      )}
    </div>
  )
}

export default SolutionDisplay
