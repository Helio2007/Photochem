import { useState, useRef } from 'react'

function CameraCapture({ onImageCaptured, loading }) {
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      onImageCaptured(file)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          📁 Upload Image
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Click to upload an image or take a photo from your device
      </p>

      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full h-auto rounded-lg shadow-md mx-auto"
          />
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Processing chemistry problem...</p>
        </div>
      )}
    </div>
  )
}

export default CameraCapture
