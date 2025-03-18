import express from "express";
import {
  getGymEquipmentBill,
  getGymEquipmentBillById,
  createGymEquipmentBill,
  updateGymEquipmentBill,
  deleteGymEquipmentBill,
  bulkCreateGymEquipmentBill,
} from "../controllers/gymequipmentBillController.js";

const router = express.Router();

router.get("/", getGymEquipmentBill);
router.get("/:id", getGymEquipmentBillById);
router.post("/", createGymEquipmentBill);
router.post("/bulk", bulkCreateGymEquipmentBill); 
router.put("/:id", updateGymEquipmentBill);
router.delete("/:id", deleteGymEquipmentBill);

export default router;
