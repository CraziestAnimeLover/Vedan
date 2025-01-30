import jwt from 'jsonwebtoken';

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            console.warn('Token missing for user authentication');
            return res.status(401).json({
                message: "User not authenticated. Token missing.",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // store user details in request object

        console.log('User authenticated:', req.user.email); // Log authenticated user info
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ message: "Authentication failed.", success: false });
    }
};

// Role-based middleware for Librarian
const isLibrarian = (req, res, next) => {
    if (req.user?.role !== 'librarian') {
        console.warn('Access denied: User does not have librarian privileges');
        return res.status(403).json({
            success: false,
            message: 'Access denied. Librarians only.',
        });
    }
    console.log('Librarian access granted');
    next();
};

// Role-based middleware for Student
const isStudent = (req, res, next) => {
    if (req.user?.role !== 'student') {
        console.warn('Access denied: User does not have student privileges');
        return res.status(403).json({
            success: false,
            message: 'Access denied. Students only.',
        });
    }
    console.log('Student access granted');
    next();
};

// Role-based middleware for Admin (New Role)
const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        console.warn('Access denied: User does not have admin privileges');
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admins only.',
        });
    }
    console.log('Admin access granted');
    next();
};

export { isAuthenticated, isLibrarian, isStudent, isAdmin };
