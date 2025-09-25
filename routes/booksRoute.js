// routes/booksRoute.js
import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

/**
 * ✅ Create (POST) - Add a new book
 */
router.post("/", async (req, res) => {
  try {
    const { title, author, publicationYear, genre } = req.body;

    // Validation
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "Title and Author are required",
      });
    }

    if (publicationYear && isNaN(publicationYear)) {
      return res.status(400).json({
        success: false,
        message: "Publication year must be a number",
      });
    }

    const newBook = new Book({ title, author, publicationYear, genre });
    await newBook.save();

    res.status(201).json({
      success: true,
      message: "✅ Book added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error adding book",
      error: error.message,
    });
  }
});

/**
 * ✅ Read (GET all) - Get all books
 */
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching books", error: error.message });
  }
});

/**
 * ✅ Read (GET by ID) - Get a single book
 */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching book", error: error.message });
  }
});

/**
 * ✅ Update (PUT) - Update an existing book (Day 14)
 */
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publicationYear, genre } = req.body;

    // Find book by ID
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    // Validation
    if (publicationYear && isNaN(publicationYear)) {
      return res.status(400).json({
        success: false,
        message: "Publication year must be a number",
      });
    }

    // Update fields (only if provided)
    book.title = title || book.title;
    book.author = author || book.author;
    book.publicationYear = publicationYear || book.publicationYear;
    book.genre = genre || book.genre;

    const updatedBook = await book.save();

    res.status(200).json({
      success: true,
      message: "✅ Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Error updating book", error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "✅ Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Error deleting book", error: error.message });
  }
});

export default router;

