import express from "express";
import { login,  logout,  register, updateProfile,forgotPassword ,resetPassword} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
// Forgot Password & Reset Password routes
// In your user.routes.js (or equivalent)

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);   // Reset password
// router.post("/forgot-password", (req, res, next) => {
//     console.log("Received forgot-password request");
//     next();
// }, forgotPassword);


export default router;
