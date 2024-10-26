// server/routes/auth.js

const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (err) {
        if (err) {
            return res.status(400).json({ message: "Username already taken." });
        }
        res.status(201).json({ message: "User registered successfully!" });
    });
});

// Login user
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        res.status(200).json({ message: "Login successful!", userId: user.id });
    });
});

module.exports = router;
