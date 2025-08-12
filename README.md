# 🎬 YouTube Clone

A full-stack YouTube clone application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This project allows users to create channels, upload videos, watch them, leave comments, and manage their content.

## 🚀 Features

- Register and Log into your YouTube account
- Upload and play videos
- View channel-specific videos
- Add, edit, and delete comments
- Create and manage your own channel
- Edit and delete videos from your channel
- Log out of your account anytime
- User authentication with secure password storage
- File upload using **multer**
- Toast notifications for user feedback
- Fully responsive UI with smooth UX

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (for file uploads)
- Bcrypt.js (for password hashing)
- JWT (for authentication)

## 📂 Project Structure
```
Youtube_clone/
├── backend/                       # Backend (Node.js + Express)
│   ├── controllers/               # Controller files
│   ├── models/                    # Mongoose models 
│   ├── routes/                    # Express route files
│   ├── .env                       # Environment variables 
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Entry point for backend
│
├── frontend/                      # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/                # Images, icons, static files
│   │   ├── components/            # Reusable UI components
│   │   ├── context/               # React Context API files
│   │   ├── pages/                 # Page-level components
│   │   ├── styles/                # CSS/SCSS files
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json               # Frontend dependencies
│   └── vite.config.js
│
├── .gitignore                     # Files/folders to ignore in git
├── README.md                      # Project documentation
```

## 💻 Run your application

1. **Frontend Setup**

```bash
cd frontend
npm install
npm run dev // Start Frontend server
```

2. **Backend Setup**

```bash
cd backend
npm install
npm start // Start backend server
```

## Github Link
```
https://github.com/indrakhichaki-16/YouTube-Capstone
```
