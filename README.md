# 🧠 Habit Tracker

A full-stack web application designed to help users **build new habits, stay consistent, and track their progress** through interactive dashboards, streaks, and reminders.

> “What gets measured gets improved.” — *Peter Drucker*

---

## 🚀 Overview

The **Habit Tracker** helps users try new habits and stay on track by sending **reminders and notifications**.  
It provides an intuitive dashboard to visualize progress, maintain streaks, and celebrate daily wins.

This project is built with a **Next.js + TypeScript frontend** and a **Django backend** powered by **PostgreSQL**.  
It focuses on modular design, clean RESTful API communication, and secure JWT-based authentication.

---

## 🧩 Features

- ✅ **Create and Manage Habits** — add, edit, and delete daily or weekly habits  
- 🔁 **Track Progress** — monitor streaks and visualize performance over time  
- 🔒 **JWT Authentication** — secure login and session handling  
- 🕓 **Reminders & Notifications** — keep users on schedule  
- 📊 **Responsive Dashboard** — optimized for both desktop and mobile devices  
- 💾 **Persistent Data** — PostgreSQL ensures reliable data storage

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js, TypeScript, Tailwind CSS |
| **Backend** | Django, Django REST Framework |
| **Database** | PostgreSQL |
| **Authentication** | JWT Tokens |
| **Version Control** | Git & GitHub |

---

## ⚙️ Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/HBasra1428/habit-tracker-project.git
cd habit-tracker-project
```
###2️⃣ Setup the Backend
```bash
cd habit_tracker_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
The backend will start at http://127.0.0.1:8000/
3️⃣ Setup the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will start at http://localhost:3000/

##🧭 Folder Structure
```plaintext
habit-tracker-project/
├── frontend/                # Next.js frontend
│   ├── components/          # Reusable UI components
│   ├── pages/               # App routes
│   ├── styles/              # Styling (Tailwind / global CSS)
│   └── utils/               # Frontend utilities
│
├── habit_tracker_backend/   # Django backend
│   ├── api/                 # REST API endpoints
│   ├── models/              # Database models
│   ├── serializers/         # Django REST serializers
│   └── settings.py          # Configuration
│
└── README.md
```
📸 Screenshots (Optional)
Dashboard	Habit Details
	

    (Replace with actual screenshots when available.)
## 🤝 Contributing

Contributions are welcome!

To contribute:
1. Fork this repository  
2. Create a feature branch (`feature/your-feature-name`)  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request

##👤 Author

#Himanshu Basra
🎓 Computer Science @ University of Calgary
# Surkhab Singh
🎓 Computer Science @ University of Calgary
# Sufian Tariq
🎓 Computer Science @ University of Calgary
