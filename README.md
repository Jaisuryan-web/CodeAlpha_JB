#  Job Board Platform - Premium Edition

A stunning, full-featured job board platform with beautiful gradients and modern UI/UX.

##  Features

### Backend (Django REST Framework)
- 🔐 JWT Authentication & Authorization
- 👔 Employer Management
- 💼 Job Listings with Advanced Search
- 👨‍💼 Candidate Profiles & Resume Management
- 📝 Application Tracking System
- 📊 Admin Panel with Analytics
- 📧 Email Notifications
- 🔍 Advanced Filtering & Search

### Frontend (React + Vite)
- 🎨 Stunning Gradient UI
- ⚡ Lightning-fast Performance
- 📱 Fully Responsive Design
- 🌈 Modern Animations
- 🔄 Real-time Updates
- 📊 Interactive Dashboards
- 🎯 Intuitive User Experience

## 🛠️ Tech Stack

**Backend:**
- Django version 5.0
- Django REST Framework
- PostgreSQL / SQLite
- JWT Authentication
- Celery (Background Tasks)
- Django Admin

**Frontend:**
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Query
- Axios
- React Router

##  Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📝 API Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/jobs/` - List all jobs
- `POST /api/jobs/` - Create job (Employer)
- `GET /api/jobs/{id}/` - Job details
- `POST /api/applications/` - Apply for job
- `GET /api/applications/` - List applications
- `POST /api/resumes/upload/` - Upload resume
- `GET /api/employers/` - List employers
- `GET /api/candidates/` - List candidates

##  Design Features

- Beautiful gradient backgrounds
- Smooth animations and transitions
- Glass-morphism effects
- Modern card designs
- Interactive hover effects
- Professional color schemes

## 📊 Admin Features

- User management
- Job approval system
- Application statistics
- Revenue tracking
- Analytics dashboard

## 🔒 Security

- JWT token authentication
- Password hashing
- CORS configuration
- Input validation
- SQL injection protection

---
Built with ❤️ for the best job board experience
