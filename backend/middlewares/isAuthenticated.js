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

        // Log decoded data for debugging
        console.log("Decoded token:", decoded);

        req.user = decoded; // store user details in request object
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({
            message: "Authentication failed.",
            success: false,
        });
    }
};
