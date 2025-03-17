import express from "express";
import { getRentBills, createRentBill, updateRentBill, deleteRentBill } from "../controllers/rentBillController.js";

const router = express.Router();

router.get("/", getRentBills);
router.post("/", createRentBill);
router.put("/:id", updateRentBill);
router.delete("/:id", deleteRentBill);

export default router;
