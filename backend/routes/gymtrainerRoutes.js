import express from "express";
import { createTrainer, getAllTrainers, deleteTrainer } from "../controllers/gymtrainerController.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.post("/", singleUpload, createTrainer); // Use correct middleware
router.get("/", getAllTrainers);
router.delete("/:id", deleteTrainer);

export default router; // 🚨 Move this to the end
