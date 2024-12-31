import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
    try {
        // Extract token from cookies (or headers if preferred)
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. Token missing.",
                success: false,
            });
        }

        // Verify the token using the secret key stored in environment variables
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId; // Set userId from token to request object

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication error:', error.message);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired. Please login again.",
                success: false,
            });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token.",
                success: false,
            });
        }

        // Handle unexpected errors (e.g., server issues)
        return res.status(500).json({
            message: "Authentication failed. Please try again later.",
            success: false,
        });
    }
};

export default isAuthenticated;
