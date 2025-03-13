import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  getAllAharShowroomItems,
  createShowroomItem,
  updateAharShowroomItem,
  deleteAharShowroomItem,
} from "../controllers/AharShowroomController.js";

const router = express.Router();

// ✅ Ensure Upload Directory Exists Once at Startup
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Define Multer Storage & File Validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});



  
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, GIF, and PDF are allowed."), false);
  }
};

const upload = multer({ storage }).fields([
    { name: "pic", maxCount: 1 },
    { name: "description", maxCount: 1 },
  ]);
  

// ✅ Routes with Proper File Upload Handling
router.get("/", getAllAharShowroomItems);

router.post("/", (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ error: "File upload failed" });
      }
      next();
    });
  }, createShowroomItem);
  

router.put("/:id", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    updateAharShowroomItem(req, res, next);
  });
});

router.delete("/:id", deleteAharShowroomItem);

export default router;