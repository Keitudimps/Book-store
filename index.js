const express = require('express');
const session = require('express-session');
const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth');
const authenticatedRoutes = require('./routes/authenticated');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Session configuration
app.use(session({
  secret: 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/books', generalRoutes);
app.use('/auth', authRoutes);
app.use('/customer', authenticatedRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Book Store API' });
});

app.listen(PORT, () => {
  console.log(`Book Store server is running on port ${PORT}`);
});

module.exports = app;
