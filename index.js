require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bookRoutes = require('./routes/bookRoutes');

// Initialize Express app
const app = express();

// View Engine Setup
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', bookRoutes);

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page not found',
    title: '404 - BookMind'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).render('error', {
    message: err.message || 'Internal server error',
    title: 'Error - BookMind'
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 BookMind server running on port ${PORT}`);
  console.log(`📚 Dashboard: http://localhost:${PORT}`);
  console.log(`📊 Analytics: http://localhost:${PORT}/analytics`);
});