import AharShowroom from "../models/AharShowroom.js";
import multer from "multer";
import path from "path";

// ✅ Multer Config for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const createShowroomItem = async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging
    console.log("Received files:", req.files); // Debugging

    const newItem = new AharShowroom({
      ...req.body,
      pic: req.files?.pic ? req.files.pic[0].path : null,
      description: req.files?.description ? req.files.description[0].path : null,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error saving showroom item:", error);
    res.status(500).json({ message: "Failed to save showroom item", error: error.message });
  }
};

// ✅ Fetch all showroom items
export const getAllAharShowroomSchema = async (req, res) => {
  try {
    const items = await AharShowroom.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching AharShowroom data" });
  }
};

// ✅ Update showroom item
export const updateAharShowroomSchema = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await AharShowroom.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
};

// ✅ Delete showroom item
export const deleteAharShowroomSchema = async (req, res) => {
  const { id } = req.params;
  try {
    await AharShowroom.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
};
