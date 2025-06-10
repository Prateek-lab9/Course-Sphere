
# 🎓 CourseSphere

> A complete MERN Stack platform to sell and manage online courses with secure authentication, Stripe payment integration, and cloud media support.

![License](https://img.shields.io/badge/license-MIT-green)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Repo Size](https://img.shields.io/github/repo-size/Prateek-lab9/Course-Sphere)
![Last Commit](https://img.shields.io/github/last-commit/Prateek-lab9/Course-Sphere)

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="40"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" width="40"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="MongoDB" width="40"/>
  <img src="https://cdn.worldvectorlogo.com/logos/express-109.svg" alt="Express" width="40"/>
</div>

---

## 📚 Table of Contents

- [📝 Features](#-features)
- [📁 Folder Structure](#-folder-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Setup](#️-environment-setup)
- [🛠️ Tech Stack](#️-tech-stack)
- [🙌 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📝 Features

- 👩‍🏫 Admin can add/update/delete courses.
- 👨‍🎓 Users can browse and purchase courses.
- 🔐 Authentication using JWT (User/Admin roles).
- 💳 Stripe integration for secure payments.
- ☁️ Cloudinary integration for image uploads.
- 🌐 Frontend in React with Tailwind & Vite.

---

## 📁 Folder Structure

```
CourseSphere/
│
├── backend/               # Node.js + Express API
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── config.js
│   ├── index.js
│   └── .env
│
├── frontend/              # React + Vite + Tailwind frontend
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Prateek-lab9/Course-Sphere.git
cd Course-Sphere
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend/`:

```env
PORT=9001
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongo_db_uri
cloud_name=your_cloudinary_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_USER_PASSWORD=your_jwt_secret
JWT_ADMIN_PASSWORD=your_admin_secret
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Environment Setup

Ensure these tools are installed globally:

- Node.js (v16 or later)
- MongoDB Atlas (or local)
- Stripe Account
- Cloudinary Account

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **MongoDB** | Database |
| **Express.js** | Backend framework |
| **React.js** | Frontend framework |
| **Node.js** | Runtime environment |
| **JWT** | Authentication |
| **Cloudinary** | Image storage |
| **Stripe** | Payment gateway |
| **Tailwind CSS** | UI Styling |
| **Vite** | Fast frontend build tool |

---

## 🙌 Contributing

Contributions are welcome! Follow these steps:

```bash
# 1. Fork the repository
# 2. Create your branch
git checkout -b feature/my-feature

# 3. Commit your changes
git commit -m "Add new feature"

# 4. Push to your branch
git push origin feature/my-feature

# 5. Submit a pull request 🚀
```

---

> 💡 Developed by [Prateek Kumar Srivatsav](https://github.com/Prateek-lab9) with ❤️
