// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. Token missing.",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // store user details in request object
        
        next(); 
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ message: "Authentication failed.", success: false });
    }
};

const isLibrarian = (req, res, next) => {
    if (req.user.role !== 'librarian') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Librarians only.',
        });
    }
    next();
};

const isStudent = (req, res, next) => {
    if (req.user.role !== 'student') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Students only.',
        });
    }
    next();
};

export { isAuthenticated, isLibrarian, isStudent };
