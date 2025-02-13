import express from "express";
import { getScholarships, addScholarship, deleteScholarship } from "../controllers/scholarshipController.js";

const router = express.Router();

router.get("/scholarships", getScholarships);
router.post("/scholarships", addScholarship);
router.delete("/scholarships/:id", deleteScholarship);

export default router;
