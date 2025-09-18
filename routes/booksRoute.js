import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

/**
 * @route   POST /books
 * @desc    Create a new book (with validation)
 */
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    // Validation
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, author, and publish year",
      });
    }

    const newBook = new Book({
      title,
      author,
      publishYear,
    });

    await newBook.save();
    res.status(201).json({
      success: true,
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /books
 * @desc    Get all books
 */
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /books/:id
 * @desc    Get a single book by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /books/:id
 * @desc    Update a book by ID
 */
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    // Validation
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, author, and publish year",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishYear },
      { new: true } // return updated document
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   DELETE /books/:id
 * @desc    Delete a book by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
