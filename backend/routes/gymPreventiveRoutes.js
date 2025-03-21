import express from "express";
import {
  createPreventive,
  getPreventives,
  getPreventiveById,
  updatePreventive,
  deletePreventive,
} from "../controllers/gymPreventiveController.js";

const router = express.Router();

router.post("/", createPreventive); // Create
router.get("/", getPreventives); // Read All
router.get("/:id", getPreventiveById); // Read One
router.put("/:id", updatePreventive); // Update
router.delete("/:id", deletePreventive); // Delete

export default router;
