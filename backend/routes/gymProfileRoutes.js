import { Router } from "express";
const router = Router();
import { getAllGymProfiles, getGymProfileById, createGymProfile, updateGymProfile, deleteGymProfile } from "../controllers/gymProfileController.js";

// 🔗 Define routes
router.get("/", getAllGymProfiles);
router.get("/:id", getGymProfileById);
router.post("/", createGymProfile);
router.put("/:id", updateGymProfile);
router.delete("/:id", deleteGymProfile);

export default router;
