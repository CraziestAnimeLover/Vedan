import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId; // Set userId from token to req

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired",
                success: false,
            });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        return res.status(500).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
