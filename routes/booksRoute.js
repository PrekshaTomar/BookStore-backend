// routes/booksRoute.js
import express from "express";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

/**
 * Routes with controller functions
 */
router.get("/", getBooks);          // GET all books
router.get("/:id", getBookById);    // GET single book by ID
router.post("/", addBook);          // POST new book
router.put("/:id", updateBook);     // PUT update book
router.delete("/:id", deleteBook);  // DELETE book

export default router;


