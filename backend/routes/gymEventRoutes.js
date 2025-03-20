import express from "express";
import multer from "multer";
import { createGymEvent, getAllGymEvents, getGymEventById, updateGymEvent, deleteGymEvent } from "../controllers/gymEventController.js";

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ""); // Ensure the "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
    "/",
    upload.fields([{ name: "description", maxCount: 1 }, { name: "pic", maxCount: 1 }]),
    (req, res, next) => {
      console.log("🛠 Multer received files:", req.files);
      console.log("📦 Multer received body:", req.body);
      next();
    },
    createGymEvent
  );
  
  
  
  

router.get("/", getAllGymEvents);
router.get("/:id", getGymEventById);
router.put("/:id", upload.fields([{ name: "description" }, { name: "pic" }]), updateGymEvent);
router.delete("/:id", deleteGymEvent);

export default router;
