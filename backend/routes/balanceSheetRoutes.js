import { Router } from "express";
const router = Router();
import { getBalanceSheets, getBalanceSheetById, createBalanceSheet, updateBalanceSheet, deleteBalanceSheet,getLatestBalanceSheet } from "../controllers/balanceSheetController.js";

router.get("/", getBalanceSheets);
router.get("/:id", getBalanceSheetById);
router.post("/", createBalanceSheet);
router.put("/:id", updateBalanceSheet);
router.delete("/:id", deleteBalanceSheet);
router.post("/update", updateBalanceSheet);
// ✅ Fetch latest balance sheet
router.get("/latest", getLatestBalanceSheet)

export default router;
