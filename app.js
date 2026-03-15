require('dotenv').config(); // Load .env variables
const express = require('express');
const path = require('path');
const db = require('./db'); // MongoDB connection

const studentRoutes = require('./routes/studentRoute');
const teacherRoutes = require('./routes/teacherRoute');

const app = express();
const PORT = process.env.PORT || 4444;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} : ${req.method} ${req.originalUrl}`);
    next();
});

// Mount student and teacher routes
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

// Home page route (public)
app.get('/', (req, res) => {
    res.render('home'); // Renders views/home.ejs
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ✅`);
});