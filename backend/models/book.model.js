import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  year: { type: Number },
  isbn: { type: String, required: true, unique: true },
  format: { type: String },
  language: { type: String },
  price: { type: Number },
  quantity: { type: Number, default: 1 },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
