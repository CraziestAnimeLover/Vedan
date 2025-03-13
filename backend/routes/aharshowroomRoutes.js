import express from "express";
import { getAllAharShowroomSchema, createShowroomItem, updateAharShowroomSchema, deleteAharShowroomSchema } from "../controllers/AharShowroomController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// ✅ Define Multer Middleware Here
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).fields([{ name: "pic" }, { name: "description" }]);

router.get("/", getAllAharShowroomSchema);
router.post("/", upload, createShowroomItem); // ✅ Multer middleware used here
router.put("/:id", updateAharShowroomSchema);
router.delete("/:id", deleteAharShowroomSchema);

export default router;
