import { useState, useRef } from 'react'

function CameraCapture({ onImageCaptured, loading }) {
  const [imagePreview, setImagePreview] = useState(null)
  const [useCamera, setUseCamera] = useState(false)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

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

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setUseCamera(true)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      alert('Unable to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setUseCamera(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Convert canvas to blob and create file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
          const reader = new FileReader()
          reader.onloadend = () => {
            setImagePreview(reader.result)
          }
          reader.readAsDataURL(file)
          onImageCaptured(file)
          stopCamera()
        } else {
          console.error('Failed to capture image from canvas')
          alert('Failed to capture image. Please try again.')
        }
      }, 'image/jpeg', 0.9)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📁 Upload Image
        </button>
        {!useCamera ? (
          <button
            onClick={startCamera}
            disabled={loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📷 Use Camera
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Stop Camera
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {useCamera && (
        <div className="space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-h-96 object-contain"
            />
          </div>
          <button
            onClick={capturePhoto}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Capture Photo
          </button>
        </div>
      )}

      {imagePreview && !useCamera && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full h-auto rounded-lg shadow-md mx-auto"
          />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

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
