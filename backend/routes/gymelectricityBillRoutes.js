import express from "express";
import {
  getGymElectricityBills,
  getGymElectricityBillById,
  createGymElectricityBill,
  updateGymElectricityBill,
  deleteGymElectricityBill,
  bulkCreateGymElectricityBill, // ✅ Ensure this function exists
} from "../controllers/gymelectricityBillController.js";

const router = express.Router();

router.get("/", getGymElectricityBills);
router.get("/:id", getGymElectricityBillById);
router.post("/", createGymElectricityBill);
router.post("/bulk", bulkCreateGymElectricityBill); // ✅ Ensure this route exists
router.put("/:id", updateGymElectricityBill);
router.delete("/:id", deleteGymElectricityBill);

export default router;
