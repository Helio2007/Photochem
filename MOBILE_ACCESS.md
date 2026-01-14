# 📱 Mobile Access Guide

## Overview

PhotoChem can be accessed on your phone in two ways:
1. **Progressive Web App (PWA)** - Install as an app-like experience
2. **QR Code Access** - Quick scan to open on mobile

## Quick Setup for Mobile

### Step 1: Find Your Computer's IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., `192.168.1.100`)

**Mac/Linux:**
```bash
ifconfig
# or
ip addr
```
Look for your local network IP (usually starts with `192.168.` or `10.`)

### Step 2: Update Vite Config (if needed)

The server is already configured to accept network connections. Make sure `vite.config.js` has:
```js
server: {
  host: '0.0.0.0', // This allows network access
  port: 5173,
}
```

### Step 3: Start the Servers

**Backend:**
```bash
cd backend
venv\Scripts\activate
python app.py
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Step 4: Access on Mobile

**Option A: QR Code (Easiest)**
1. On desktop, open the app at `http://localhost:5173`
2. Click "Show QR Code" in the Mobile Access section
3. Scan with your phone's camera
4. The app will open in your phone's browser

**Option B: Manual URL**
1. On your phone, open a browser
2. Go to: `http://YOUR_IP:5173`
   - Replace `YOUR_IP` with your computer's IP address
   - Example: `http://192.168.1.100:5173`

### Step 5: Install as PWA (App-like Experience)

**On iPhone (Safari):**
1. Open the app in Safari
2. Tap the Share button (square with arrow)
3. Select "Add to Home Screen"
4. Name it "PhotoChem" and tap "Add"

**On Android (Chrome):**
1. Open the app in Chrome
2. Look for the "Install" banner or menu
3. Tap "Install" or "Add to Home Screen"
4. The app will appear like a native app!

## Features on Mobile

✅ **Camera Access** - Take photos directly with your phone camera
✅ **Touch-Friendly UI** - Optimized for mobile screens
✅ **Offline Capable** - Works even without internet (after first load)
✅ **App-like Experience** - Full screen, no browser bars
✅ **Fast Loading** - Cached for quick access

## Troubleshooting

### "Can't connect" on mobile:
- ✅ Make sure phone and computer are on the same Wi-Fi
- ✅ Check firewall isn't blocking port 5173
- ✅ Verify backend is running on port 8000
- ✅ Try using your computer's IP instead of localhost

### QR code not working:
- ✅ Make sure the URL in QR code matches your network IP
- ✅ Update the QR code URL manually if needed
- ✅ Try the manual URL method instead

### PWA install not showing:
- ✅ Make sure you're using HTTPS (or localhost)
- ✅ Use Chrome (Android) or Safari (iOS)
- ✅ Check if browser supports PWA
- ✅ Try accessing from the browser menu

### Camera not working on mobile:
- ✅ Grant camera permissions when prompted
- ✅ Use HTTPS or localhost (required for camera API)
- ✅ Try a different browser if issues persist

## Network Configuration

### For Development (Same Network):
- Use your local IP: `http://192.168.x.x:5173`
- Both devices must be on same Wi-Fi

### For Production (Internet):
- Deploy to a hosting service (Vercel, Netlify, etc.)
- Use HTTPS (required for camera and PWA)
- Update backend CORS to allow your domain

## Testing Mobile Features

1. **Camera Test:**
   - Tap "Use Camera"
   - Grant permissions
   - Take a photo of a chemistry equation

2. **Upload Test:**
   - Tap "Upload Image"
   - Select from phone gallery
   - Process the equation

3. **Manual Input Test:**
   - Type an equation
   - Verify touch keyboard works well
   - Test equation solving

## Next Steps

- [ ] Deploy to production for internet access
- [ ] Add push notifications (optional)
- [ ] Optimize for different screen sizes
- [ ] Add offline equation history

## Reminder

**Don't forget:** When you're ready to work on OCR, check `QUICK_OCR_INSTALL.md` for installation instructions! 📸
