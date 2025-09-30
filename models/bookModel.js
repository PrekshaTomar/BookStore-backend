// models/bookModel.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    minlength: [2, "Title must be at least 2 characters long"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
  genre: {
    type: String,
    enum: ["Fiction", "Non-Fiction", "Comics", "Science", "Others"], // controlled values
    default: "Others",
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;

