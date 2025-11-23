# Book Store API Project

A complete REST API for a book store with user authentication, book management, and review functionality.

## 📋 Project Overview

This project implements all 14 required tasks:

### General Users (Tasks 1-5)
- ✅ Task 1: Get the book list available in the shop
- ✅ Task 2: Get books based on ISBN
- ✅ Task 3: Get all books by Author
- ✅ Task 4: Get all books based on Title
- ✅ Task 5: Get book reviews

### Authentication (Tasks 6-7)
- ✅ Task 6: Register new user
- ✅ Task 7: Login as a registered user

### Registered Users (Tasks 8-9)
- ✅ Task 8: Add/Modify a book review
- ✅ Task 9: Delete book review

### Node.js Client with Axios (Tasks 10-13)
- ✅ Task 10: Get all books using async callback function
- ✅ Task 11: Search by ISBN using Promises
- ✅ Task 12: Search by Author using async/await
- ✅ Task 13: Search by Title using async/await

## 🚀 Installation

1. **Clone or download this project**

2. **Install dependencies:**
```bash
npm install
```

## 🏃 Running the Project

### Start the Server
```bash
npm start
```
The server will run on `http://localhost:5000`

For development with auto-restart:
```bash
npm run dev
```

### Run the Client Demo
In a separate terminal (while server is running):
```bash
npm run client
```

## 📚 API Endpoints

### General Routes (No Authentication Required)

#### Task 1: Get All Books
```
GET /books
```

#### Task 2: Get Book by ISBN
```
GET /books/isbn/:isbn
Example: GET /books/isbn/9780142437230
```

#### Task 3: Get Books by Author
```
GET /books/author/:author
Example: GET /books/author/George%20Orwell
```

#### Task 4: Get Books by Title
```
GET /books/title/:title
Example: GET /books/title/Harry%20Potter
```

#### Task 5: Get Book Reviews
```
GET /books/review/:isbn
Example: GET /books/review/9780142437230
```

### Authentication Routes

#### Task 6: Register New User
```
POST /auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

#### Task 7: Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

Response: { "message": "Login successful", "token": "JWT_TOKEN_HERE" }
```

### Authenticated Routes (Require JWT Token)

#### Task 8: Add/Modify Review
```
PUT /customer/review/:isbn
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "review": "This is an excellent book!"
}
```

#### Task 9: Delete Review
```
DELETE /customer/review/:isbn
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🧪 Testing with cURL or Postman

### Example: Register and Login
```bash
# Register
curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d "{\"username\":\"john\",\"password\":\"pass123\"}"

# Login
curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d "{\"username\":\"john\",\"password\":\"pass123\"}"
```

### Example: Add Review (with token)
```bash
curl -X PUT http://localhost:5000/customer/review/9780142437230 -H "Authorization: Bearer YOUR_TOKEN_HERE" -H "Content-Type: application/json" -d "{\"review\":\"Amazing book!\"}"
```

## 📁 Project Structure

```
Book store/
├── client/
│   └── bookClient.js       # Tasks 10-13: Axios client with async/await and Promises
├── data/
│   ├── books.json          # Book database
│   └── users.js            # User storage
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── routes/
│   ├── general.js          # Tasks 1-5: Public routes
│   ├── auth.js             # Tasks 6-7: Registration and login
│   └── authenticated.js    # Tasks 8-9: Protected routes
├── index.js                # Main server file
├── package.json
└── README.md
```

## 🔑 Key Features

- **Express.js** - Web framework
- **JWT Authentication** - Secure user authentication
- **Session Management** - Express sessions
- **Axios** - HTTP client for Node.js client
- **Async/Await & Promises** - Modern JavaScript async patterns
- **RESTful API** - Clean API design

## 📝 Sample Books in Database

The database includes 10 books:
1. Pride and Prejudice - Jane Austen
2. To Kill a Mockingbird - Harper Lee
3. 1984 - George Orwell
4. The Great Gatsby - F. Scott Fitzgerald
5. The Catcher in the Rye - J.D. Salinger
6. Harry Potter and the Deathly Hallows - J.K. Rowling
7. The Hunger Games - Suzanne Collins
8. The Fault in Our Stars - John Green
9. The Hobbit - J.R.R. Tolkien
10. The Alchemist - Paulo Coelho

## 🔐 Security Notes

⚠️ **Important for Production:**
- Change the JWT secret key in `middleware/auth.js`
- Change the session secret in `index.js`
- Implement password hashing (bcrypt)
- Use HTTPS
- Add rate limiting
- Use environment variables for secrets


