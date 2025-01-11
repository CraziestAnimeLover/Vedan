import express from 'express';
import { getAllBooks, addBook } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', getAllBooks);  // Route for getting all books
router.post('/', addBook);     // Route for adding a new book

export default router;  // Export the router correctly
