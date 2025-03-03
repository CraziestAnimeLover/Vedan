import { Router } from "express";
import { singleUpload } from "../middlewares/mutler.js"; // ✅ Ensure correct path
import { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany, uploadCertificate } from "../controllers/companyController.js";

const router = Router();

// ✅ Apply `singleUpload` middleware to parse image files in `createCompany`
router.post("/", singleUpload, createCompany);

router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);
router.post("/:id/upload", singleUpload, uploadCertificate);

export default router;
