import express from "express";
import { 
    getBalanceSheets, 
    getBalanceSheetById, 
    createBalanceSheet, 
    updateBalanceSheet, 
    deleteBalanceSheet,
    getLatestBalanceSheet
} from "../controllers/balanceSheetController.js";

const router = express.Router();

router.get("/", getBalanceSheets);
router.get("/:id", getBalanceSheetById);
router.get("/latest", getLatestBalanceSheet);
router.post("/", createBalanceSheet);
router.put("/", updateBalanceSheet);
router.delete("/:id", deleteBalanceSheet);

export default router;
