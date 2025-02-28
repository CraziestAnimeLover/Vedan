import express from "express";
import { login, logout, register, updateProfile, forgotPassword, resetPassword, updateLibraryProfile,getAllUsers } from "../controllers/user.controller.js";
import { isAuthenticated, isLibrarian, isStudent } from '../middlewares/isAuthenticated.js';
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Register, login, logout
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.get("/", getAllUsers);
// Profile update routes (separate paths for different updates)
router.put('/api/v1/user/update-profile', isAuthenticated, singleUpload, updateProfile); // Regular profile update
router.put('/api/v1/user/update-profile', isAuthenticated, singleUpload, updateLibraryProfile); // Library profile update

// Forgot password and reset password routes
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

// Example route (Librarian / Student checks)
router.post('/library', isAuthenticated, isLibrarian);  // Example route for Librarian
router.get('/libraries', isAuthenticated, isStudent);   // Example route for Student

export default router;
