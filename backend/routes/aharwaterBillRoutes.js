import express from "express";
import { getEntries, addEntry, deleteEntry, updateEntry } from "../controllers/aharwaterbillController.js";

const router = express.Router();

router.get("/entries", getEntries);
router.post("/entries", addEntry);
router.delete("/entries/:id", deleteEntry);
router.put("/entries/:id", updateEntry); // ✅ Added this line

export default router;
