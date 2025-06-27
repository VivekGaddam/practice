const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/orgRoutes');

// Load environment variables BEFORE using them
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express(); // Moved above `app.use(...)`

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/org', orgRoutes); // Moved here after `app` is defined

// Test route
app.get('/', (req, res) => {
  res.send('✅ API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
