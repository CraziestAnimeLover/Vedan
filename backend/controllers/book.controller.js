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
        const { title, author, isbn, genre, year, format, language, price, quantity, copies, pages } = req.body;
        const newBook = new Book({
            title,
            author,
            isbn,
            genre,
            year,
            format,
            language,
            price,
            quantity,
            copies,  // Add copies field
            pages,
        });
        await newBook.save();
        res.status(201).json({ book: newBook });
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error });
    }
};

// Controller function to fetch a book by ID
export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ book });
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error });
    }
};
