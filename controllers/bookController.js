// controllers/bookController.js
import Book from "../models/bookModel.js";

// GET all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);

  }
};

// GET book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    next(error);

  }
};



 

// ✅ Add Book Controller with Validation
export const addBook = async (req, res, next) => {
  const { title, author, publishedYear } = req.body;

  // Basic validation
  if (!title || !author || !publishedYear) {
    return res.status(400).json({
      message: "Title, author, and publishedYear are required",
    });
  }

  try {
    const book = new Book({ title, author, publishedYear });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error); // pass error to centralized error handler
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
    next(error);

  }
};

// DELETE book
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    next(error);
    
  }
};
