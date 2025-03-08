import { Router } from "express";
const router = Router();
import { createMaintenance, getAllMaintenance, getMaintenanceById, updateMaintenance, deleteMaintenance } from "../controllers/aharproductMaintenanceController.js";

router.post("/", createMaintenance);
router.get("/", getAllMaintenance);
router.get("/:id", getMaintenanceById);
router.put("/:id", updateMaintenance);
router.delete("/:id", deleteMaintenance);

export default router;
