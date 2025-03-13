import express from "express";
import { addRating, getRatings, updateRating, deleteRating } from "../controllers/aharratingController.js";

const router = express.Router();

router.post("/", addRating);
router.get("/", getRatings);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);

export default router;
