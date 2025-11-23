const express = require('express');
const router = express.Router();
const books = require('../data/books.json');

// Task 1: Get the book list available in the shop
router.get('/', (req, res) => {
  res.json(books);
});

// Task 2: Get the books based on ISBN
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const bookList = Object.values(books);
  const book = bookList.find(b => b.isbn === isbn);
  
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Task 3: Get all books by Author
router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const bookList = Object.values(books);
  const booksByAuthor = bookList.filter(b => 
    b.author.toLowerCase().includes(author.toLowerCase())
  );
  
  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    res.status(404).json({ message: 'No books found by this author' });
  }
});

// Task 4: Get all books based on Title
router.get('/title/:title', (req, res) => {
  const title = req.params.title;
  const bookList = Object.values(books);
  const booksByTitle = bookList.filter(b => 
    b.title.toLowerCase().includes(title.toLowerCase())
  );
  
  if (booksByTitle.length > 0) {
    res.json(booksByTitle);
  } else {
    res.status(404).json({ message: 'No books found with this title' });
  }
});

// Task 5: Get book Review
router.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const bookList = Object.values(books);
  const book = bookList.find(b => b.isbn === isbn);
  
  if (book) {
    res.json({ isbn: book.isbn, title: book.title, reviews: book.reviews });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;
