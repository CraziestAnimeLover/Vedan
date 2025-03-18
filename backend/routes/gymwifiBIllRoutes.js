import express from "express";
import {
  createGymWifiBill,
  getAllGymWifiBills,
  getGymWifiBillById,
  updateGymWifiBill,
  deleteGymWifiBill,
  bulkInsertGymWifiBills
} from "../controllers/gymwifiController.js";

const router = express.Router();

router.post("/", createGymWifiBill);
router.get("/", getAllGymWifiBills);
router.get("/:id", getGymWifiBillById);
router.put("/:id", updateGymWifiBill);
router.delete("/:id", deleteGymWifiBill);
router.post("/bulk", bulkInsertGymWifiBills);

export default router;
