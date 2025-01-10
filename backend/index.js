import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import { isAuthenticated, isLibrarian, isStudent } from './middlewares/isAuthenticated.js';


// import libraryRoute from './routes/library.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration


const allowedOrigins = ['http://localhost:5173','https://www.vedann.com'];



const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Explicitly define allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Explicitly define allowed headers
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
// app.use("/api/v1/library", libraryRoute);
app.post('/api/v1/user/reset-password/:token', async (req, res) => {
    console.log("Token:", req.params.token);
    console.log("Request Body:", req.body);

    // Validate token and password here...
});
// Example: Route for adding a library (only for librarians)
app.post('/library', isAuthenticated, isLibrarian);

// Example: Route for students to view libraries
app.get('/libraries', isAuthenticated, isStudent);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        success: false,
    });
});
export default allowedOrigins;
const PORT = process.env.PORT || 8000;

// Connect to database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Database connection error:", err);
});
