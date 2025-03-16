import { Router } from "express";
const router = Router();
import { 
  createWifiBill, 
  getAllWifiBills, 
  getWifiBillById, 
  updateWifiBill, 
  deleteWifiBill, 
  bulkInsertWifiBills // Import the bulk insert function
} from "../controllers/aharwifiBillController.js";

router.post("/", createWifiBill);
router.get("/", getAllWifiBills);
router.get("/:id", getWifiBillById);
router.put("/:id", updateWifiBill);
router.delete("/:id", deleteWifiBill);

// **🔹 Add Bulk Insert Route**
router.post("/bulk", bulkInsertWifiBills);

export default router;
