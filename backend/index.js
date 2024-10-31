import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://vedan-frontend.onrender.comhttps://vedan-frontend.onrender.comhttps://vedan-frontend.onrender.com', // replace with your frontend url
    credentials: true,
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
    res.status(500).json({
        message: "Something went wrong!",
        success: false,
    });
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
