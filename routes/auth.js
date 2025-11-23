const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { users } = require('../data/users');
const { SECRET_KEY } = require('../middleware/auth');

// Task 6: Register New user
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Create new user
  const newUser = {
    username,
    password, // In production, hash this password
    reviews: {}
  };

  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Task 7: Login as a Registered user
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Find user
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  // Save session
  req.session.authorization = {
    accessToken: token,
    username: user.username
  };

  res.json({ 
    message: 'Login successful',
    token: token
  });
});

module.exports = router;
