import express from "express";
import { createUser, getUsers, deleteUser, updateUser } from "../controllers/gymuserController.js";

const router = express.Router();

router.post("/", createUser); // ✅ Create a user
router.get("/", getUsers);    // ✅ Fetch all users
router.put("/:id", updateUser); // ✅ Update user (ADD THIS)
router.delete("/:id", deleteUser); // ✅ Delete a user

export default router;
