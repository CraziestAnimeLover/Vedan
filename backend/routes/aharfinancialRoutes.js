import express from "express";
import {
  getFinancialData,
  addFinancialData,
  updateFinancialData,
  deleteFinancialData,
} from "../controllers/aharfinancialController.js";

const router = express.Router();

router.get("/", getFinancialData);
router.post("/", addFinancialData);

router.delete("/:id", deleteFinancialData);
router.put("/:id", updateFinancialData);



export default router;
