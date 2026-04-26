const express = require('express');
const app = express();

app.use(express.json());

// -----------------------------
// Storage
// -----------------------------
let logs = [];
let alerts = [];

// -----------------------------
// Config
// -----------------------------
const WINDOW_SIZE = 10;
const ERROR_THRESHOLD = 5;

// -----------------------------
// Root Route
// -----------------------------
app.get('/', (req, res) => {
    res.send("Log Analytics Server Running");
});

// -----------------------------
// Add Log
// -----------------------------
app.post('/log', (req, res) => {
    const { service, level, message } = req.body;

    // Validation
    if (!service || !level || !message) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const log = {
        service,
        level,
        message,
        timestamp: new Date()
    };

    logs.push(log);

    checkForAlert();

    res.json({ message: "Log stored successfully" });
});

// -----------------------------
// Get Logs
// -----------------------------
app.get('/logs', (req, res) => {
    res.json(logs);
});

// -----------------------------
// Get Alerts
// -----------------------------
app.get('/alerts', (req, res) => {
    res.json(alerts);
});

// -----------------------------
// Alert Logic (FINAL FIX)
// -----------------------------
function checkForAlert() {
    const recentLogs = logs.slice(-WINDOW_SIZE);

    let errorCount = 0;

    for (let log of recentLogs) {
        if (log.level === "ERROR") {
            errorCount++;
        }
    }

    const lastAlert = alerts[alerts.length - 1];

    // Trigger ONLY when crossing threshold
    if (
        errorCount >= ERROR_THRESHOLD &&
        (!lastAlert || lastAlert.errorCount < ERROR_THRESHOLD)
    ) {
        alerts.push({
            message: "High error rate detected",
            errorCount,
            timestamp: new Date()
        });
    }
}

// -----------------------------
// Server Start
// -----------------------------
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});