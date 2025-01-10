import express from "express";
import { login,  logout,  register, updateProfile,forgotPassword ,resetPassword} from "../controllers/user.controller.js";
import { isAuthenticated, isLibrarian, isStudent } from '../middlewares/isAuthenticated.js';

import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.put('/profile/update', isAuthenticated, updateProfile);
// Forgot Password & Reset Password routes
// In your user.routes.js (or equivalent)
router.post('/library', isAuthenticated, isLibrarian);  // Example route
router.get('/libraries', isAuthenticated, isStudent); // Another example route

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").post(resetPassword);
router.route("/reset-password/:token").post((req, res, next) => {
    console.log("Reset Password Route Hit:", req.params.token);
    next();
}, resetPassword);  // Reset password




export default router;
