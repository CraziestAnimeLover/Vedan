import express from "express";
import {
  getEquipmentBills,
  getEquipmentBillById,
  createEquipmentBill,
  updateEquipmentBill,
  deleteEquipmentBill,
  bulkCreateEquipmentBills,
} from "../controllers/aharequipmentBillController.js";

const router = express.Router();

router.get("/", getEquipmentBills);
router.get("/:id", getEquipmentBillById);
router.post("/", createEquipmentBill);
router.post("/bulk", bulkCreateEquipmentBills); 
router.put("/:id", updateEquipmentBill);
router.delete("/:id", deleteEquipmentBill);

export default router;
