import express from "express";
import { createNotice, getNotices, updateNotice, deleteNotice } from "../controllers/aharnoticeController.js";

const router = express.Router();

// Prefix "/api" should be applied when using the router, not in the individual routes

router.post("/", createNotice);  // Route will be accessed via /api/notices
router.get("/", getNotices);     // Route will be accessed via /api/notices
router.put("/:id", updateNotice); // Route will be accessed via /api/notices/:id
router.delete("/:id", deleteNotice); // Route will be accessed via /api/notices/:id

export default router;
