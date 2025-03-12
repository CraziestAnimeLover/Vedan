import { Router } from "express";
import { createInventory, getInventory, updateInventory, deleteInventory } from "../controllers/reuseinventoryController.js";
import { uploadFiles } from "../middlewares/mutler.js";  // Import the uploadFiles middleware

const router = Router();

// Route to handle inventory creation with file upload
router.post("/", uploadFiles, createInventory);  // Apply the uploadFiles middleware here

// CRUD routes for inventory
router.get("/", getInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

export default router;
