import express from "express";
import multer from "multer";
import {
  getLiveData,
  addLiveData,
  updateLiveData, // <--- Add this
  deleteLiveData,
} from "../controllers/liveController.js";

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "public/uploads/" });

// Routes
router.get("/", getLiveData);
router.post("/", upload.fields([{ name: "image" }, { name: "file" }]), addLiveData);
router.put("/:id", upload.fields([{ name: "image" }, { name: "file" }]), updateLiveData); // <--- Fix this
router.delete("/:id", deleteLiveData);

export default router;
