import Book from '../models/book.model.js';

// Controller function to fetch all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ books });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};

// Controller function to add a new book
export const addBook = async (req, res) => {
    try {
        const { title, author, isbn, genre, year, format, language, price, quantity } = req.body;
        const newBook = new Book({
            title,
            author,
            isbn,
            genre,
            year,
            format,
            language,
            price,
            quantity
        });
        await newBook.save();
        res.status(201).json({ book: newBook });
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error });
    }
};
