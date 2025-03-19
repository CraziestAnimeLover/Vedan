import express from "express";
import {
  createDietPlan,
  getAllDietPlans,
  getDietPlanById,
  updateDietPlan,
  deleteDietPlan
} from "../controllers/dietPlanController.js";

const router = express.Router();

router.post("/", createDietPlan);
router.get("/", getAllDietPlans);
router.get("/:id", getDietPlanById);
router.put("/:id", updateDietPlan);
router.delete("/:id", deleteDietPlan);

export default router;
