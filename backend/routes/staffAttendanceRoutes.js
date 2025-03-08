import express from "express";
import {
  getAllAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/staffAttendanceController.js";

const router = express.Router();

router.get("/", getAllAttendance);
router.post("/", addAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
