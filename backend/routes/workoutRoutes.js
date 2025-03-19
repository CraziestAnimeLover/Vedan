import { Router } from "express";
const router = Router();
import { getWorkoutPlans, createWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan } from "../controllers/workoutController.js";

router.get("/", getWorkoutPlans);
router.post("/", createWorkoutPlan);
router.put("/:id", updateWorkoutPlan);
router.delete("/:id", deleteWorkoutPlan);

export default router;
