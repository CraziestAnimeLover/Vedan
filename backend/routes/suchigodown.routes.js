import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from "../controllers/suchigodown.controller.js";

import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // Add file upload middleware here


const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", upload.array('pic', 1), createItem);

router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
