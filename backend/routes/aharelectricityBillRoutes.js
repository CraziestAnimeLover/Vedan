import express from "express";
import {
  getElectricityBills,
  getElectricityBillById,
  createElectricityBill,
  updateElectricityBill,
  deleteElectricityBill,
  bulkCreateElectricityBills, // ✅ Ensure this function exists
} from "../controllers/aharelectricityBillController.js";

const router = express.Router();

router.get("/", getElectricityBills);
router.get("/:id", getElectricityBillById);
router.post("/", createElectricityBill);
router.post("/bulk", bulkCreateElectricityBills); // ✅ Ensure this route exists
router.put("/:id", updateElectricityBill);
router.delete("/:id", deleteElectricityBill);

export default router;
