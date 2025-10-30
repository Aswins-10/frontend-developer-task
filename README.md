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
## 🔐 Authentication Flow

JWT tokens are issued upon **login** (`/api/token/`).  
Tokens are stored securely in **local storage**, and all protected routes are only accessible when authenticated.  
This ensures that unauthorized users cannot access task operations.


### **📁 Project Structure**
```
frontend-developer-task/
│
├── backend/               # Django project (settings, urls, wsgi)
│   ├── api/               # Django app (models, views, serializers, urls)
│
├── frontend/              # Next.js frontend app
│
├── postman/               # Postman collection for API testing
│   └── frontend-developer-task-api.postman_collection.json
│
├── manage.py              # Django project manager
├── requirements.txt       # Backend dependencies
└── README.md              # Project documentation

```
## 🧪 API Testing (Postman Collection)

All APIs for authentication and task management can be tested using **Postman**.

📁 **Collection File:**  
[`/postman/frontend-developer-task-api.postman_collection.json`](./postman/frontend-developer-task-api.postman_collection.json)

This collection includes:

- **User Registration** – `POST /api/register/`  
- **Login (JWT)** – `POST /api/token/`  
- **View All Tasks** – `GET /api/tasks/`  
- **Create Task** – `POST /api/tasks/`  
- **Update Task** – `PUT /api/tasks/{id}/`  
- **Delete Task** – `DELETE /api/tasks/{id}/`  

You can also **import this file directly into Postman** for quick testing.

---

## 🚀 Scaling Notes

This project is built with **Django REST Framework** and can scale efficiently with the following strategies:

### 🗄️ Database Scaling
- Move from a single **MySQL instance** to a managed service (e.g., **AWS RDS**).  
- Use **read replicas** and **Redis caching** to handle heavy reads and reduce DB load.

### ⚙️ Backend Scaling
- Serve Django via **Gunicorn + Nginx** or **Uvicorn + ASGI** for better concurrency.  
- Containerize using **Docker** and deploy with **Kubernetes** or **AWS ECS** for horizontal scaling.

### 💻 Frontend Optimization
- Serve the **Next.js static build** from a **CDN (Cloudflare/AWS CloudFront)**.  
- Enable **code splitting** and **lazy loading** to improve initial load times.

### 🔐 Security Enhancements
- Use **HTTPS**, **environment variables** for secrets, and secure **JWT handling**.  
- Implement **rate limiting** and **token rotation** for better protection.

### 📊 Monitoring & Logging
- Integrate with **Sentry** or **Prometheus** for live error tracking and analytics.  
- Implement **structured logs** with request IDs for better debugging.

---

## ✨ Author

**Aswin**  
Frontend Developer Task — 2025  
📧 _Developed as part of a full-stack assignment using Next.js and Django REST Framework_
