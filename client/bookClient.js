const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books – Using async callback function
function getAllBooksCallback(callback) {
  axios.get(`${BASE_URL}/books`)
    .then(response => {
      callback(null, response.data);
    })
    .catch(error => {
      callback(error, null);
    });
}

// Wrapper to demonstrate async callback
async function getAllBooksAsync() {
  return new Promise((resolve, reject) => {
    getAllBooksCallback((error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// Task 11: Search by ISBN – Using Promises
function searchByISBN(isbn) {
  return axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(`Error fetching book by ISBN: ${error.message}`);
    });
}

// Task 12: Search by Author
async function searchByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching books by author: ${error.message}`);
  }
}

// Task 13: Search by Title
async function searchByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${title}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching books by title: ${error.message}`);
  }
}

// Demo function to test all methods
async function runDemo() {
  console.log('='.repeat(60));
  console.log('BOOK STORE CLIENT - DEMO');
  console.log('='.repeat(60));

  try {
    // Task 10: Get all books using async callback
    console.log('\n[Task 10] Getting all books using async callback...');
    const allBooks = await getAllBooksAsync();
    console.log(`Found ${Object.keys(allBooks).length} books in the store`);
    console.log('Sample book:', Object.values(allBooks)[0]);

    // Task 11: Search by ISBN using Promises
    console.log('\n[Task 11] Searching by ISBN (9780142437230) using Promises...');
    const bookByISBN = await searchByISBN('9780142437230');
    console.log('Book found:', bookByISBN.title, 'by', bookByISBN.author);

    // Task 12: Search by Author
    console.log('\n[Task 12] Searching by Author (George Orwell)...');
    const booksByAuthor = await searchByAuthor('George Orwell');
    console.log(`Found ${booksByAuthor.length} book(s) by this author`);
    booksByAuthor.forEach(book => {
      console.log(`  - ${book.title} (ISBN: ${book.isbn})`);
    });

    // Task 13: Search by Title
    console.log('\n[Task 13] Searching by Title (Harry Potter)...');
    const booksByTitle = await searchByTitle('Harry Potter');
    console.log(`Found ${booksByTitle.length} book(s) with this title`);
    booksByTitle.forEach(book => {
      console.log(`  - ${book.title} by ${book.author}`);
    });

    console.log('\n' + '='.repeat(60));
    console.log('DEMO COMPLETED SUCCESSFULLY');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\nError during demo:', error.message);
    console.log('\nMake sure the server is running on port 5000');
    console.log('Run: npm start');
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  runDemo();
}

// Export functions for use in other modules
module.exports = {
  getAllBooksAsync,
  searchByISBN,
  searchByAuthor,
  searchByTitle
};
