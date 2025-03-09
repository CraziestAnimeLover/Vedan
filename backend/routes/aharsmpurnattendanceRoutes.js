import express from "express";
import {
  getAttendance,
  getAttendanceById,
  addAttendance,
  updateAttendance,
  deleteAttendance
} from "../controllers/aharsmpurnattendanceController.js"; // Import named exports

const router = express.Router();

router.get("/aharattendance", getAttendance);
router.get("/aharattendance/:id", getAttendanceById);
router.post("/aharattendance", addAttendance);
router.put("/aharattendance/:id", updateAttendance);
router.delete("/aharattendance/:id", deleteAttendance);

export default router;
