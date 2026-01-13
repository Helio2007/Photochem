import { useState } from 'react'
import CameraCapture from './components/CameraCapture'
import ManualInput from './components/ManualInput'
import SolutionDisplay from './components/SolutionDisplay'
import './App.css'

function App() {
  const [solution, setSolution] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleImageProcessed = async (imageFile) => {
    setLoading(true)
    setError(null)
    setSolution(null)

    try {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      const data = await response.json()
      
      // Check if there's an error in the response
      if (data.error) {
        let errorMsg = data.error
        if (data.suggestions && Array.isArray(data.suggestions)) {
          errorMsg += '\n\n' + data.suggestions.join('\n')
        } else if (data.suggestion) {
          errorMsg += '\n\n' + data.suggestion
        }
        setError(errorMsg)
        setSolution(null)
      } else {
        setSolution(data)
        setError(null)
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing the image')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEquationSolved = (data) => {
    setError(null)
    if (data.error) {
      setError(data.error)
    } else {
      setSolution(data)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
            PhotoChem
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your Chemistry Problem Solver
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
            <CameraCapture 
              onImageCaptured={handleImageProcessed}
              loading={loading}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
            <ManualInput 
              onEquationSolved={handleEquationSolved}
              loading={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              <p className="font-bold mb-2">⚠️ Error:</p>
              <div className="whitespace-pre-line text-sm mb-3">{error}</div>
              <div className="mt-3 pt-3 border-t border-red-300 dark:border-red-700">
                <p className="font-semibold mb-1">💡 Quick Fix:</p>
                <p className="text-sm">Use the manual input field below to type your equation directly!</p>
              </div>
            </div>
          )}

          {solution && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
              <SolutionDisplay solution={solution} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
