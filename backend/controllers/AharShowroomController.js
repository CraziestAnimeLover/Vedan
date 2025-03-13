import AharShowroom from "../models/AharShowroom.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).fields([
  { name: "pic", maxCount: 1 },
  { name: "description", maxCount: 1 },
]);

// ✅ Create a new showroom item
export const createShowroomItem = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: "File upload failed", details: err.message });
    }

    try {
      console.log("Received body:", req.body);
      console.log("Received files:", req.files);

      // Check required fields
      if (!req.body.name || !req.body.category || !req.body.price || !req.body.quantity) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newItem = new AharShowroom({
        name: req.body.name,
        category: req.body.category,
        expireDate: req.body.expireDate || null,
        price: Number(req.body.price),
        manufacturing: req.body.manufacturing || null,
        quantity: Number(req.body.quantity),
        unit: req.body.unit || "pcs",
        total: Number(req.body.price) * Number(req.body.quantity),
        pic: req.files?.pic ? req.files.pic[0].path : null,
        description: req.body.description || null,
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      console.error("Error saving showroom item:", error);
      res.status(500).json({ message: "Failed to save showroom item", error: error.message });
    }
  });
};

// ✅ Fetch all showroom items
export const getAllAharShowroomItems = async (req, res) => {
  try {
    const items = await AharShowroom.find().populate("category");
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching showroom data", details: error.message });
  }
};

// ✅ Update showroom item
export const updateAharShowroomItem = async (req, res) => {
  const { id } = req.params;

  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "File upload error", details: err.message });

    try {
      const existingItem = await AharShowroom.findById(id);
      if (!existingItem) return res.status(404).json({ message: "Item not found" });

      const updatedData = {
        ...req.body,
        total: Number(req.body.price) * Number(req.body.quantity),
        pic: req.files?.pic ? req.files.pic[0].path : existingItem.pic,
        description: req.files?.description ? req.files.description[0].path : existingItem.description,
      };

      const updatedItem = await AharShowroom.findByIdAndUpdate(id, updatedData, { new: true });
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: "Error updating item", details: error.message });
    }
  });
};

// ✅ Delete showroom item
export const deleteAharShowroomItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await AharShowroom.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Remove associated files
    if (item.pic) fs.unlinkSync(item.pic);
    if (item.description) fs.unlinkSync(item.description);

    await AharShowroom.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item", details: error.message });
  }
};
