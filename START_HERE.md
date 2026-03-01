# 🚀 Job Board Platform - Quick Start Guide

## ✅ Project Status: READY TO USE!

Both backend and frontend are running successfully!

---

## 🌐 Access the Application

### Frontend (React + Vite + TailwindCSS)
**URL:** http://localhost:5174/

### Backend (Django REST API)
**URL:** http://localhost:8000/
**Admin Panel:** http://localhost:8000/admin/

---

## 👤 Test Accounts

### Admin Account (Django Admin)
- **Username:** admin
- **Password:** admin123
- **Access:** http://localhost:8000/admin/

### Employer Account
- **Username:** techcorp
- **Password:** password123
- **Type:** Employer (Can post jobs)

### Candidate Account
- **Username:** johndoe
- **Password:** password123
- **Type:** Job Seeker (Can apply for jobs)

---

## 🎨 Features Implemented

### ✨ Stunning Frontend
- **Beautiful Gradients** - Modern gradient backgrounds and text effects
- **Glass Morphism** - Frosted glass card effects
- **Smooth Animations** - Framer Motion animations throughout
- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Clean, intuitive interface

### 🔧 Backend Features
- **User Authentication** - JWT-based secure authentication
- **Role-Based Access** - Separate flows for Employers and Candidates
- **Job Management** - Full CRUD operations for job listings
- **Application Tracking** - Complete application lifecycle management
- **Advanced Search** - Filter jobs by type, location, remote status
- **Admin Dashboard** - Comprehensive admin panel with statistics
- **File Uploads** - Resume and company logo uploads
- **API Documentation** - RESTful API endpoints

---

## 📱 How to Use

### For Job Seekers (Candidates)
1. **Register** at http://localhost:5174/register (Select "Job Seeker")
2. **Browse Jobs** at http://localhost:5174/jobs
3. **Apply for Jobs** - Click on any job and submit your application
4. **Track Applications** - View status in your dashboard

### For Employers
1. **Register** at http://localhost:5174/register (Select "Employer")
2. **Post Jobs** at http://localhost:5174/post-job
3. **Manage Applications** - View and update application statuses
4. **Track Statistics** - Monitor job performance

---

## 🛠️ If Servers Stop

### Restart Backend
```bash
cd backend
.\venv\Scripts\python.exe manage.py runserver
```

### Restart Frontend
```bash
cd frontend
npm run dev
```

---

## 📊 Sample Data

The database includes:
- ✅ 3 Sample Jobs (Full Stack Developer, UI/UX Designer, DevOps Engineer)
- ✅ 1 Employer (TechCorp Solutions)
- ✅ 1 Candidate (John Doe)
- ✅ Admin user for management

---

## 🎯 Key Pages

- **Home:** http://localhost:5174/
- **Browse Jobs:** http://localhost:5174/jobs
- **Login:** http://localhost:5174/login
- **Register:** http://localhost:5174/register
- **Dashboard:** http://localhost:5174/dashboard
- **Post Job:** http://localhost:5174/post-job (Employers only)

---

## 🔥 Stunning Visual Features

### Gradient Effects
- Multi-color gradient text (blue → purple → pink)
- Gradient buttons with hover effects
- Gradient backgrounds throughout

### Animations
- Smooth page transitions
- Hover scale effects on cards
- Floating animations
- Fade-in effects

### Modern Design
- Glass morphism cards
- Backdrop blur effects
- Shadow elevations
- Rounded corners
- Professional color scheme

---

## 📁 Project Structure

```
job-board-platform/
├── backend/                 # Django REST Framework
│   ├── accounts/           # User management
│   ├── jobs/              # Job listings
│   ├── applications/      # Application tracking
│   ├── jobboard/          # Main settings
│   └── db.sqlite3         # Database
│
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── api/          # Axios configuration
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Auth context
│   │   ├── pages/        # Page components
│   │   └── index.css     # Tailwind styles
│   └── package.json
│
└── README.md
```

---

## 🎨 Color Scheme

- **Primary Blue:** #0ea5e9
- **Purple:** #a855f7
- **Pink:** #ec4899
- **Background:** Gradient from slate → blue → purple

---

## 🚀 Next Steps

1. **Explore the UI** - Check out the beautiful gradients and animations
2. **Test Features** - Try posting jobs and applying
3. **Customize** - Modify colors, add features, or adjust styling
4. **Deploy** - Ready for production deployment!

---

## 💡 Tips

- Use the **admin panel** to manage all data
- **Filter jobs** using the search and filter options
- Check the **dashboard** for statistics
- Upload **resumes** when applying for jobs
- Add **company logos** as an employer

---

## 🎉 Enjoy Your Premium Job Board Platform!

Everything is set up and ready to use. The platform features stunning visuals, smooth animations, and a complete job board experience!

**Happy Job Hunting! 🚀**
