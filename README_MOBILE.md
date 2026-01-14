# 📱 Mobile Access - Quick Reference

## 🚀 Quick Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   venv\Scripts\activate
   python app.py

   # Terminal 2 - Frontend  
   cd frontend
   npm run dev
   ```

3. **Access on phone:**
   - **QR Code:** Open on desktop, click "Show QR Code", scan with phone
   - **Manual:** Go to `http://YOUR_IP:5173` on phone browser

4. **Install as app:**
   - iPhone: Safari → Share → Add to Home Screen
   - Android: Chrome → Menu → Install App

## 📋 Find Your IP Address

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address"
```

**Mac/Linux:**
```bash
ifconfig
# or
ip addr
```

## ✨ Features

- ✅ Install as app (PWA)
- ✅ Camera access on mobile
- ✅ Offline support
- ✅ Touch-optimized UI
- ✅ QR code quick access

## 📚 Full Documentation

- `MOBILE_ACCESS.md` - Complete mobile setup guide
- `MOBILE_SETUP_SUMMARY.md` - What was added

## 🔔 Reminder

**OCR Setup:** Check `QUICK_OCR_INSTALL.md` when ready to install Tesseract OCR!
