import express from "express";
import multer from "multer";
import {
  createCorrective,
  getAllCorrectives,
  getCorrectiveById,
  updateCorrective,
  deleteCorrective
} from "../controllers/gymcorrectiveController.js";

const router = express.Router();

// File upload settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("file"), createCorrective);
router.get("/", getAllCorrectives);
router.get("/:id", getCorrectiveById);
router.put("/:id", upload.single("file"), updateCorrective);
router.delete("/:id", deleteCorrective);

export default router;
