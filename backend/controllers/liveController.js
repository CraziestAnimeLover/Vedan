import Live from "../models/liveModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ➤ Get All Entries
export const getLiveData = async (req, res) => {
  try {
    const data = await Live.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ Add a New Entry
export const addLiveData = async (req, res) => {
  try {
    const { srNo, concept, date, time } = req.body;
    const image = req.files?.image ? `/uploads/${req.files.image[0].filename}` : null;
    const file = req.files?.file ? `/uploads/${req.files.file[0].filename}` : null;

    const newEntry = new Live({ srNo, concept, date, time, image, file });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ Delete Entry
export const deleteLiveData = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Live.findById(id);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Delete files if they exist
    if (entry.image) fs.unlinkSync(path.join(__dirname, `../public${entry.image}`));
    if (entry.file) fs.unlinkSync(path.join(__dirname, `../public${entry.file}`));

    await Live.findByIdAndDelete(id);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLiveData = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Received update request for ID:", id);
  
      if (!id) {
        return res.status(400).json({ message: "Invalid ID" });
      }
  
      const entry = await Live.findById(id);
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
  
      // Handle file updates
      let image = entry.image;
      let file = entry.file;
  
      if (req.files?.image) {
        if (entry.image) fs.unlinkSync(path.join(__dirname, `../public${entry.image}`)); // Remove old image
        image = `/uploads/${req.files.image[0].filename}`;
      }
  
      if (req.files?.file) {
        if (entry.file) fs.unlinkSync(path.join(__dirname, `../public${entry.file}`)); // Remove old file
        file = `/uploads/${req.files.file[0].filename}`;
      }
  
      // Update database entry
      const updatedEntry = await Live.findByIdAndUpdate(
        id,
        { srNo: req.body.srNo, concept: req.body.concept, date: req.body.date, time: req.body.time, image, file },
        { new: true } // Return updated document
      );
  
      console.log("Updated entry:", updatedEntry);
      res.status(200).json(updatedEntry);
    } catch (error) {
      console.error("Error in updateLiveData:", error);
      res.status(500).json({ message: error.message });
    }
  };
  