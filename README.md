# Recipe Management Application

## 🚀 Live Demo
[**Visit the Live App**](https://recipe-management-woad.vercel.app/) *(If the link is not working, follow the instructions below to run it locally.)*

---

## 📌 About the Project
The **Recipe Management Application** is a full-stack **MERN** project that allows users to:
- View, add, edit, and delete recipes.
- Sort recipes into categories.
- Drag and drop recipes for better organization.
- Toggle between **light mode & dark mode**.
- Get a **random recipe** suggestion using the "Surprise Me" button.

---

## 📂 Folder Structure
```
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # React pages (Home, Recipe Details)
│   │   ├── styles/        # CSS Module styles
│   │   ├── api.js         # API calls to backend
│   │   ├── App.jsx        # Main React component
│   │   ├── main.jsx       # React entry point
│   ├── public/            # Static assets
│   ├── index.html         # Main HTML file
│   ├── vite.config.js     # Vite configuration
├── server/                # Backend (Node.js + Express + MongoDB)
│   ├── models/            # Mongoose models
│   ├── routes/            # Express API routes
│   ├── middleware/        # Custom middleware
│   ├── server.js          # Express server setup
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
├── .gitignore             # Git ignore file
├── README.md              # Documentation
```

---

## 🛠️ Installation & Running Locally

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/recipe-management.git
cd recipe-management
```

### **2️⃣ Set Up the Backend (Server)**
```sh
cd server
npm install            # Install backend dependencies
cp .env.example .env   # Create and configure environment variables
npm run dev            # Start backend on http://localhost:5000
```

### **3️⃣ Set Up the Frontend (Client)**
```sh
cd ../client
npm install            # Install frontend dependencies
npm run dev            # Start frontend on http://localhost:5173
```

---

## 🔄 If the Live Deployment Fails
### **Option 1: Check Netlify Deployment**
If the **live demo is not working**, the deployment may be down. Try running the project locally (instructions above).

### **Option 2: Deploy the Project Manually**
#### 🚀 **To Deploy on Netlify**:
```sh
npm run build
netlify deploy --prod
```

#### 🚀 **To Deploy on Vercel**:
```sh
npm run build
vercel --prod
```

---

## 🤝 Contributing
1. **Fork** the repository.
2. **Create a new branch** (`git checkout -b feature-branch`).
3. **Commit your changes** (`git commit -m "Added new feature"`).
4. **Push to the branch** (`git push origin feature-branch`).
5. **Create a pull request**.

---

## 📜 License
This project is **open-source** under the [MIT License](LICENSE).

