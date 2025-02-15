import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  series: { type: String },  // Added series
  year: { type: Number },
  isbn: { type: String, required: true, unique: true },
  publisherDate: { type: Date },  // Added publisherDate
  publisher: { type: String },  // Added publisher
  format: { type: String, default: "Paper Book" },  // Default to "Paper Book"
  language: { type: String, default: "English" },  // Default to "English"
  price: { type: Number },
  copies: { type: Number },  // Added copies
  pages: { type: Number },  // Added pages
  quantity: { type: Number, default: 1 },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
