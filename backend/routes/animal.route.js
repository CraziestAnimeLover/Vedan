import express from "express";
import {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.controller.js";
import { singleUpload } from "../middlewares/mutler.js"; // Ensure correct path

const router = express.Router();

router.post("/", singleUpload, createAnimal); // ✅ Apply multer middleware
router.get("/", getAnimals);
router.get("/:id", getAnimalById);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;
