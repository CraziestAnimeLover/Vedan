import express from "express";
import { getAdmitCards, addAdmitCard, deleteAdmitCard } from "../controllers/admitCardController.js";

const router = express.Router();

router.get("/", getAdmitCards);  // Fetch all admit cards
router.post("/", addAdmitCard);  // Add a new admit card
router.delete("/:id", deleteAdmitCard);  // Delete an admit card by ID

export default router;
