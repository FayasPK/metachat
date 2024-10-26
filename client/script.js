// client/script.js

const socket = io();

// Registration
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.message === "User registered successfully!") {
            window.location.href = "/chat/login"; // Redirect to login
        }
    });
}

// Login
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.message === "Login successful!") {
            localStorage.setItem("userId", data.userId); // Store user ID in local storage
            window.location.href = "/chat"; // Redirect to chat
        }
    });
}

// Chat functionality
socket.on("receiveMessage", (message) => {
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
});

function sendMessage() {
    const messageContent = document.getElementById("message-input").value;
    if (messageContent) {
        const username = localStorage.getItem("userId"); // Use user ID as username (for demo)
        socket.emit("sendMessage", `${username}: ${messageContent}`);
        document.getElementById("message-input").value = ""; // Clear input
    }
}
