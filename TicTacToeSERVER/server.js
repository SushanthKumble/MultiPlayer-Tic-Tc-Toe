const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: { 
        origin: "http://localhost:5173" // Update this to match your frontend origin
    } 
});

// Use CORS in Express and specify allowed origin
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sushanth",
    database: "tic_tac_toe"
});

// Routes for Register and Login
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
            if (err) return res.status(400).json({ error: "User already exists" });
            res.status(200).json({ message: "User registered successfully" });
        }
    );
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, results) => {
            if (err || results.length === 0) return res.status(400).json({ error: "User not found" });

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) return res.status(400).json({ error: "Invalid credentials" });

            const token = jwt.sign({ userId: user.id }, "secret_key");
            res.status(200).json({ message: "Login successful", token });
        }
    );
});

const allUsers = {};
const allRooms = [];

// Socket.io logic for real-time gameplay
io.on("connection", (socket) => {
    allUsers[socket.id] = {
        socket: socket,
        online: true,
    };

    socket.on("request_to_play", (data) => {
        const currentUser = allUsers[socket.id];
        currentUser.playerName = data.playerName;

        let opponentPlayer;

        for (const key in allUsers) {
            const user = allUsers[key];
            if (user.online && !user.playing && socket.id !== key) {
                opponentPlayer = user;
                break;
            }
        }

        if (opponentPlayer) {
            allRooms.push({
                player1: opponentPlayer,
                player2: currentUser,
            });

            currentUser.socket.emit("OpponentFound", {
                opponentName: opponentPlayer.playerName,
                playingAs: "circle",
            });

            opponentPlayer.socket.emit("OpponentFound", {
                opponentName: currentUser.playerName,
                playingAs: "cross",
            });

            currentUser.socket.on("playerMoveFromClient", (data) => {
                opponentPlayer.socket.emit("playerMoveFromServer", { ...data });
            });

            opponentPlayer.socket.on("playerMoveFromClient", (data) => {
                currentUser.socket.emit("playerMoveFromServer", { ...data });
            });
        } else {
            currentUser.socket.emit("OpponentNotFound");
        }
    });

    socket.on("disconnect", function () {
        const currentUser = allUsers[socket.id];
        currentUser.online = false;
        currentUser.playing = false;

        for (let index = 0; index < allRooms.length; index++) {
            const { player1, player2 } = allRooms[index];

            if (player1.socket.id === socket.id) {
                player2.socket.emit("opponentLeftMatch");
                break;
            }

            if (player2.socket.id === socket.id) {
                player1.socket.emit("opponentLeftMatch");
                break;
            }
        }
    });
});

httpServer.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
