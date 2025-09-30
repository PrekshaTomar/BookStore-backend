# 📚 Book Management API Documentation

## Base URL
http://localhost:5555

---

### 🔹 GET `/books`
- **Description**: Get all books
- **Response**: Array of books
```json
[
  {
    "_id": "123",
    "title": "Atomic Habits",
    "author": "James Clear",
    "publishedYear": 2018
  }
]
### POST `/books`
-**Description**: Add a new Book
[{
  "title": "Book Title",
  "author": "Author Name",
  "publishedYear": 2024
}
]
[{
  "title": "Updated Title",
  "author": "Updated Author",
  "publishedYear": 2025
}
]
[{
  "message": "✅ Book deleted successfully",
  "book": {
    "_id": "abc123",
    "title": "Book Title",
    "author": "Author Name",
    "publishedYear": 2024
  }
}
]
[{
  "_id": "abc123",
  "title": "Atomic Habits",
  "author": "James Clear",
  "publishedYear": 2018
}
]
    
  




