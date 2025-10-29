# 🧠 Frontend Developer Task — Task Management System

This is a **full-stack Task Management Web Application** built using **Next.js (React + TypeScript)** for the frontend and **Django REST Framework** for the backend.  
It supports user authentication with JWT, task CRUD operations, search and filter functionality, and a fully responsive UI designed for both desktop and mobile.

---

## 🚀 Features

✅ User registration and login with JWT authentication  
✅ Add, edit, delete, and mark tasks as completed  
✅ Search and filter tasks by name or completion status  
✅ Toast notifications for user feedback (login, signup, add, delete, etc.)  
✅ Responsive and clean UI built with Tailwind CSS  
✅ Secure password handling using Django’s built-in authentication system  
✅ Backend API built with Django REST Framework  

---

## 🛠️ Tech Stack

### **Frontend**
- Next.js 14 (React + TypeScript)
- Tailwind CSS
- Axios (API communication)
- react-hot-toast (user notifications)

### **Backend**
- Django & Django REST Framework (DRF)
- JWT Authentication via `rest_framework_simplejwt`
- SQLite (can be switched to MySQL/PostgreSQL)
- CORS Headers enabled for API communication

---

## ⚙️ Setup Instructions

### **Backend Setup**
1. Navigate to the project root folder and create a virtual environment:
   ```bash
   python -m venv env
   env\Scripts\activate
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run database migrations:

bash
Copy code
python manage.py makemigrations
python manage.py migrate
Start the development server:

bash
Copy code
python manage.py runserver
Backend runs on http://127.0.0.1:8000

Frontend Setup
Move to the frontend directory:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend app:

bash
Copy code
npm run dev
Open http://localhost:3000 to access the app.

🔐 Authentication Flow
JWT tokens are issued upon login (/api/token/)

Tokens are stored securely in local storage

Protected routes are only accessible when authenticated

📁 Project Structure
bash
Copy code
frontend-developer-task/
│
├── backend/                # Django project (settings, urls, wsgi)
├── api/                    # Django app (models, views, serializers, urls)
├── frontend/               # Next.js frontend app
├── manage.py               # Django project manager
├── requirements.txt        # Backend dependencies
└── README.md               # Project documentation
✨ Author
Aswin
Frontend Developer Task — 2025