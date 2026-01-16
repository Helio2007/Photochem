import { useState, useEffect } from 'react'
import QRCode from 'qrcode.react'

function QRCodeAccess() {
  const [url, setUrl] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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
    <div 
      className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-4 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          📱 Mobile Access
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Scan QR code to open on your phone
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowQR(!showQR)
            }}
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
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

          {showQR && (
            <div className="flex flex-col items-center space-y-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="bg-white p-3 rounded-lg">
                <QRCode 
                  value={url}
                  size={150}
                  level="H"
                  includeMargin={true}
                  renderAs="svg"
                />
              </div>
              <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                Scan with your phone camera
              </p>
            </div>
          )}

          <details className="text-xs text-gray-600 dark:text-gray-400">
            <summary className="cursor-pointer font-medium mb-2">More info</summary>
            <div className="mt-2 space-y-2 pl-4">
              <p>• Make sure phone and computer are on same Wi-Fi</p>
              <p>• Find IP: Windows: <code className="bg-gray-100 dark:bg-gray-600 px-1 rounded">ipconfig</code> | Mac/Linux: <code className="bg-gray-100 dark:bg-gray-600 px-1 rounded">ifconfig</code></p>
              <p>• Use: <code className="bg-gray-100 dark:bg-gray-600 px-1 rounded">http://YOUR_IP:5173</code></p>
              <p>• Add to home screen for app-like experience!</p>
            </div>
          </details>
        </div>
      )}
    </div>
  )
}

export default QRCodeAccess
