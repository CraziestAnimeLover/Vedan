import express from "express";
import { getFees, addFee, updateFee, deleteFee } from "../controllers/gymfeeController.js";

const router = express.Router();

router.get("/", getFees);
router.post("/", addFee);
router.put("/:id", updateFee);
router.delete("/:id", deleteFee);

export default router;
