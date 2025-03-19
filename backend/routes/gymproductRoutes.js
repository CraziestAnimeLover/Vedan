import express from "express";
import multer from "multer";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/gymproductController.js";

const router = express.Router();

// Multer file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getProducts);
router.post("/", upload.fields([{ name: "image" }, { name: "description" }]), createProduct);
router.put("/:id", upload.fields([{ name: "image" }, { name: "description" }]), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
