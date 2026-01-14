import { useState, useEffect } from 'react'
import QRCode from 'qrcode.react'

function QRCodeAccess() {
  const [url, setUrl] = useState('')
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    // Get the current URL (for mobile access)
    const currentUrl = window.location.origin
    setUrl(currentUrl)
  }, [])

  const getNetworkIP = () => {
    // This will be set by the user or detected
    // For now, show localhost with instructions
    return 'http://localhost:5173'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        📱 Mobile Access
      </h3>
      
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <strong>Quick Access:</strong> Scan the QR code with your phone to open PhotoChem on mobile!
          </p>
        </div>

        <button
          onClick={() => setShowQR(!showQR)}
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors"
        >
          {showQR ? 'Hide QR Code' : 'Show QR Code'}
        </button>

        {showQR && (
          <div className="flex flex-col items-center space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="bg-white p-4 rounded-lg">
              <QRCode 
                value={url}
                size={200}
                level="H"
                includeMargin={true}
                renderAs="svg"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Scan with your phone camera
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                URL: {url}
              </p>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            📋 Instructions:
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Make sure your phone and computer are on the same Wi-Fi network</li>
            <li>Find your computer's IP address (see below)</li>
            <li>Update the URL in the QR code or use: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">http://YOUR_IP:5173</code></li>
            <li>Scan the QR code with your phone</li>
            <li>Add to home screen for app-like experience!</li>
          </ol>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>💡 Tip:</strong> To find your computer's IP address:
            <br />
            Windows: Open CMD and type <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">ipconfig</code>, look for "IPv4 Address"
            <br />
            Mac/Linux: Open Terminal and type <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">ifconfig</code> or <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">ip addr</code>
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>✨ PWA Feature:</strong> After opening on mobile, you can "Add to Home Screen" 
            to install PhotoChem as an app! Look for the install prompt or browser menu option.
          </p>
        </div>
      </div>
    </div>
  )
}

export default QRCodeAccess
