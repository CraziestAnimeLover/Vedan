import express from "express";
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from "../controllers/gyminventoryController.js";
import multer from "multer";

const router = express.Router();

// Multer setup for PDF file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Define routes
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", upload.single("description"), createItem);
router.put("/:id", upload.single("description"), updateItem);
router.delete("/:id", deleteItem);

export default router;
