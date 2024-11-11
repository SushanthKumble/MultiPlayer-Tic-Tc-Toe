# 🎮 Tic Tac Toe Online Game

Welcome to **Tic Tac Toe Online**! This application features a multiplayer Tic Tac Toe game with user authentication, allowing players to log in, register, and play online with others. The project is built using a modern tech stack, with React for the frontend and Node.js with Express for the backend, and MySQL as the database.

## 📖 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Tech Stack](#-tech-stack)
- [Usage](#-usage)
- [File Structure](#-file-structure)

---

## ✨ Features
- **Multiplayer Gameplay**: Play Tic Tac Toe with others in real-time.
- **User Authentication**: Secure login and registration using JSON Web Tokens (JWT).
- **Database Storage**: User credentials are stored in a MySQL database.
- **Real-Time Communication**: Powered by Socket.IO for instant game updates.

---

## 🚀 Installation
Follow these steps to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or later)
- [MySQL](https://www.mysql.com/) database (ensure it's running locally or on a server)

### Step 1: Clone the repository
```bash
git clone https://github.com/yourusername/MultiPlayer-Tic-Tc-Toe
cd MultiPlayer-Tic-Tc-Toe
```

### Step 2: Configure Database
Make sure to update any database configuration settings directly in your backend code (`TicTacToeSERVER/server.js` or relevant configuration files) to connect to your MySQL database.

### Step 3: Install dependencies
For both the backend and frontend:
```bash
# Backend
cd TicTacToeSERVER
npm install

# Frontend
cd ../TicTacToe
npm install
```

### Step 4: Run the application
Start the backend server and then the frontend client:
```bash
# Start backend server
cd TicTacToeSERVER
npm start

# Start frontend
cd ../TicTacToe
npm run dev
```

Access the app at `http://localhost:3000` (if using Vite's default port for frontend) and enjoy playing Tic Tac Toe online!

---

## 🛠️ Tech Stack
- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)

---

## 🎮 Usage
1. **Register**: New users can create an account on the registration page.
2. **Login**: Users can log in with their credentials.
3. **Play Online**: Users can search for an opponent and start a game.


---




Thank you for checking out **Tic Tac Toe Online**! Feel free to reach out with any questions, and happy gaming! 🎉

---

