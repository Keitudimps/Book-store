const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const books = require('../data/books.json');
const fs = require('fs');
const path = require('path');

// Helper function to save books data
const saveBooksData = () => {
  const booksPath = path.join(__dirname, '../data/books.json');
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
};

// Task 8: Add/Modify a book review (authenticated users only)
router.put('/review/:isbn', authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;
  const username = req.user.username;

  if (!review) {
    return res.status(400).json({ message: 'Review text is required' });
  }

  // Find the book
  const bookList = Object.values(books);
  const bookKey = Object.keys(books).find(key => books[key].isbn === isbn);
  
  if (!bookKey) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Add or modify review
  if (!books[bookKey].reviews) {
    books[bookKey].reviews = {};
  }
  
  books[bookKey].reviews[username] = review;
  saveBooksData();

  res.json({ 
    message: 'Review added/modified successfully',
    book: books[bookKey]
  });
});

// Task 9: Delete book review added by that particular user
router.delete('/review/:isbn', authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  // Find the book
  const bookList = Object.values(books);
  const bookKey = Object.keys(books).find(key => books[key].isbn === isbn);
  
  if (!bookKey) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Check if user has a review for this book
  if (!books[bookKey].reviews || !books[bookKey].reviews[username]) {
    return res.status(404).json({ message: 'No review found from this user for this book' });
  }

  // Delete the review
  delete books[bookKey].reviews[username];
  saveBooksData();

  res.json({ 
    message: 'Review deleted successfully',
    book: books[bookKey]
  });
});

module.exports = router;
