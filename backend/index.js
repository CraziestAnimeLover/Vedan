import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import bookRoute from './routes/book.routes.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import { isAuthenticated, isLibrarian, isStudent } from './middlewares/isAuthenticated.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'https://www.vedann.com'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Routes
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "Welcome",
        success: true,
    });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/library/books", bookRoute); // Ensure this route is correctly used for books

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        success: false,
    });
});
app.post('/api/v1/library/books', async (req, res) => {
    try {
        const { title, author, genre, year, isbn, format, language, price, quantity } = req.body;
        
        // Validate data (optional)
        if (!title || !author || !isbn) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newBook = new Book({
            title, author, genre, year, isbn, format, language, price, quantity
        });
        
        await newBook.save();
        return res.status(201).json({ book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        return res.status(500).json({ message: 'Error adding book' });
    }
});

app.get("/api/v1/library/books", async (req, res) => {
    try {
      const { search } = req.query;
      let filter = {};
      if (search) {
        filter = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
            { genre: { $regex: search, $options: 'i' } }
          ]
        };
      }
  
      const books = await Book.find(filter);
      return res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: 'Error fetching books' });
    }
  });
  







const PORT = process.env.PORT || 8000;

// Connect to database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Database connection error:", err);
});
