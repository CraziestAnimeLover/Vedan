import express from "express";
import { getStudyCenters, addStudyCenter, deleteStudyCenter } from "../controllers/studyCenterController.js";

const router = express.Router();

router.get("/", getStudyCenters);
router.post("/", addStudyCenter);
router.delete("/:id", deleteStudyCenter);

export default router;
