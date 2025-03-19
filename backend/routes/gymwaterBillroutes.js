import express from "express";
import { getEntries, addEntry, deleteEntry, updateEntry } from "../controllers/gymwaterController.js";

const router = express.Router();

router.get("/entries", getEntries);
router.post("/entries", addEntry);
router.delete("/entries/:id", deleteEntry);
router.put("/entries/:id", updateEntry); // ✅ Correctly added update route

export default router;
