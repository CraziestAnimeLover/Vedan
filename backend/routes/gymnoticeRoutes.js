import express from "express";
import { createGymNotice, getGymNotices, updateGymNotice, deleteGymNotice } from "../controllers/gymnoticeController.js";

const router = express.Router();

// Define routes
router.post("/", createGymNotice);  
router.get("/", getGymNotices);     
router.put("/:id", updateGymNotice);
router.delete("/:id", deleteGymNotice);

export default router;
