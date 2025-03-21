import express from "express";
import { getAccounts, createAccount, updateAccount, deleteAccount } from "../controllers/gymAccountController.js";

const router = express.Router();

router.get("/:type", getAccounts);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;
