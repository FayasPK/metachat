// server/routes/chat.js

const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/register.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/login.html"));
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/chat.html"));
});

module.exports = router;
