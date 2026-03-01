# 🔧 Troubleshooting Guide

## Issue: Frontend Shows Plain Text (No Styling)

If you see plain text without any colors, gradients, or styling, follow these steps:

### Solution 1: Hard Refresh Browser
1. Open http://localhost:5174
2. Press `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
3. This clears the cache and reloads everything

### Solution 2: Clear Browser Cache
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Solution 3: Check Browser Console
1. Press F12 to open Developer Tools
2. Go to the "Console" tab
3. Look for any red error messages
4. If you see errors, share them for debugging

### Solution 4: Restart Frontend Server
```bash
# Stop the current server (Ctrl+C in the terminal)
cd frontend
npm run dev
```

### Solution 5: Reinstall Dependencies
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Solution 6: Check if Vite is Running
- Frontend should be at: http://localhost:5174
- Backend should be at: http://localhost:8000
- Make sure both are running

### Solution 7: Try Different Browser
- Sometimes browser extensions block styling
- Try opening in Incognito/Private mode
- Or try a different browser (Chrome, Firefox, Edge)

---

## Issue: "Failed to Submit Application"

### Fixed! ✅
This issue has been resolved by:
- Making resume upload optional
- Updating database schema
- Improving error handling

If you still see this error:
1. Make sure you're logged in as a candidate
2. Check that you filled in the cover letter
3. Try without uploading a resume first

---

## Issue: Backend Not Running

### Start Backend:
```bash
cd backend
.\venv\Scripts\python.exe manage.py runserver
```

Should see:
```
Starting development server at http://127.0.0.1:8000/
```

---

## Issue: Frontend Not Running

### Start Frontend:
```bash
cd frontend
npm run dev
```

Should see:
```
VITE ready in XXX ms
Local: http://localhost:5174/
```

---

## Quick Health Check

### 1. Check Backend
Open: http://localhost:8000/admin
- Should see Django admin login page
- Login with: admin / admin123

### 2. Check Frontend
Open: http://localhost:5174
- Should see colorful gradient homepage
- Should see "Find Your Dream Job" with gradient text

### 3. Check API
Open: http://localhost:8000/api/jobs/
- Should see JSON data with job listings

---

## Common Issues

### Port Already in Use
If you see "Port 5173 is in use":
- Vite automatically tries port 5174
- Check the terminal for the actual port number
- Use that port in your browser

### Module Not Found
```bash
cd frontend
npm install
```

### Database Errors
```bash
cd backend
.\venv\Scripts\python.exe manage.py migrate
```

### Permission Errors
- Make sure you're in the correct directory
- Check that virtual environment is activated

---

## Still Having Issues?

### Check These:
1. ✅ Both servers running?
2. ✅ Correct URLs (5174 for frontend, 8000 for backend)?
3. ✅ Browser cache cleared?
4. ✅ No errors in browser console?
5. ✅ No errors in terminal?

### Get Detailed Logs:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Go to Network tab
4. Try the action again
5. Look for failed requests (red)

---

## Emergency Reset

If nothing works, try this complete reset:

```bash
# Stop all servers (Ctrl+C)

# Backend Reset
cd backend
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py runserver

# Frontend Reset (in new terminal)
cd frontend
npm install
npm run dev
```

Then:
1. Clear browser cache completely
2. Open http://localhost:5174 in incognito mode
3. Should see the beautiful gradient UI

---

## Contact Info

If you're still stuck:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Make sure you're using the correct URLs
4. Try a different browser

The app is working - it's likely just a caching issue! 🚀
