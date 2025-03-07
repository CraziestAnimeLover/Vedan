import { Router } from "express";
const router = Router();
import { createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry } from "../controllers/gymenquiryController.js";

router.post("/", createEnquiry);
router.get("/", getAllEnquiries);
router.get("/:id", getEnquiryById);
router.put("/:id", updateEnquiry);
router.delete("/:id", deleteEnquiry);

export default router;
