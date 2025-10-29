# 🌐 Frontend Developer Task – Task Management System

This is a full-stack **Task Management Web Application** built with **Next.js (React + TypeScript)** for the frontend and **Django REST Framework (Python)** for the backend.  
It includes JWT authentication, task CRUD operations, search and filter functionality, and a responsive UI designed for both desktop and mobile.

---

## 🚀 Features

✅ User registration and login with JWT authentication  
✅ Add, edit, delete, and mark tasks as completed  
✅ Search and filter tasks by name or completion status  
✅ Toast notifications for user feedback (login, signup, add, delete, etc.)  
✅ Responsive and clean UI built with Tailwind CSS  
✅ Backend API built using Django REST Framework  
✅ Secure password handling using Django’s built-in authentication system  

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14, React, TypeScript, Tailwind CSS  
**Backend:** Django, Django REST Framework  
**Authentication:** JWT (via rest_framework_simplejwt)  
**Database:** MySQL (configurable to SQLite)  
**Notifications:** react-hot-toast  
**API Communication:** Axios  

---

## ⚙️ Setup Instructions

### **Backend Setup**

```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
Backend runs on http://127.0.0.1:8000
```
### **Frontend Setup**

```
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:3000
```
### **🔐 Authentication Flow**
JWT tokens are issued upon login (/api/token/).
Tokens are stored securely in local storage.
Protected routes are only accessible when authenticated.

### **📁 Project Structure**
```
frontend-developer-task/
│
├── backend/          # Django project (settings, urls, wsgi)
│   ├── api/          # Django app (models, views, serializers, urls)
│
├── frontend/         # Next.js frontend app
│
├── manage.py         # Django project manager
├── requirements.txt  # Backend dependencies
└── README.md         # Project documentation
```
### **✨ Author**
##### **Aswin**
Frontend Developer Task — 2025
