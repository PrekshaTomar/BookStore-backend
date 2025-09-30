// controllers/bookController.js
import Book from "../models/bookModel.js";

// GET all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

// GET book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
};

// POST (Create new book with validation)
export const addBook = async (req, res) => {
  try {
    const { title, author, publicationYear, genre } = req.body;

    const newBook = new Book({
      title,
      author,
      publicationYear,
      genre,
    });

    const savedBook = await newBook.save();
    res.status(201).json({
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT (Update book)
export const updateBook = async (req, res) => {
  try {
    const { title, author, publicationYear, genre } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = title || book.title;
    book.author = author || book.author;
    book.publicationYear = publicationYear || book.publicationYear;
    book.genre = genre || book.genre;

    const updatedBook = await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE book
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
