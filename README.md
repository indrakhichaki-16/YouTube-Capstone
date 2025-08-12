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
├── backend/
│ ├── controllers/
| |
│ ├── models/
| |
│ ├── routes/
| |
| ├── .env
| |
| ├── package.json
| |
│ └── server.js
|
├── src
|    |__ assets
|    |__ components
|    |__ context
|    |__ pages
|    |__ styles
|    |__ App.css
|    |__ App.jsx
|    |__ index.css
|    |__ main.jsx
|
├── .gitignore
|
├── index.html
|
├── package.json
|
├── README.md
|
└── vite.config.js
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
