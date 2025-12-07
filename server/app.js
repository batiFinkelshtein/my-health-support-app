const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  // origin: 'http://localhost:3000', 
  // credentials: true
}));

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const reminderRoutes = require('./routes/reminderRoutes');
app.use('/api/reminders', reminderRoutes);
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
module.exports = app;
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

app.use('/api/questions', questionRoutes);
app.use('/api/questions/:questionId/answers', answerRoutes);

