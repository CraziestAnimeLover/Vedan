import express from "express";
import { createBatch, getBatches, deleteBatch } from "../controllers/gymbatchController.js";

const router = express.Router();

// ✅ These should be available at "/api/gym/batches"
router.post("/", createBatch);
router.get("/", getBatches);
router.delete("/:id", deleteBatch);

export default router;
