import Corrective from "../models/GymCorrective.js";
import fs from "fs";

// Create a new corrective action
export const createCorrective = async (req, res) => {
    try {
        console.log("✅ Received Request Body:", req.body);
        console.log("✅ Received File:", req.file);

        if (!req.body) {
            return res.status(400).json({ message: "❌ Request body is empty" });
        }

        const { reportDate, instrumentName, instrumentId, contactPerson, correctiveAction, status } = req.body;

// Convert reportDate to a valid Date object
const formattedDate = reportDate ? new Date(reportDate) : null;

if (!formattedDate || isNaN(formattedDate.getTime())) {
  return res.status(400).json({ message: "❌ Invalid reportDate format" });
}

const newCorrective = new Corrective({
  reportDate: formattedDate,
  instrumentName,
  instrumentId,
  contactPerson,
  correctiveAction,
  status,
  fileUrl: req.file ? `/uploads/${req.file.filename}` : null
});

        await newCorrective.save();
        console.log("✅ New corrective action saved:", newCorrective);

        res.status(201).json(newCorrective);
    } catch (error) {
        console.error("❌ Error creating corrective action:", error);
        res.status(500).json({ message: "Error creating corrective action", error: error.message });
    }
};


  
  

// Get all corrective actions
export const getAllCorrectives = async (req, res) => {
  try {
    const correctives = await Corrective.find();
    res.status(200).json(correctives);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// Get a single corrective action by ID
export const getCorrectiveById = async (req, res) => {
  try {
    const corrective = await Corrective.findById(req.params.id);
    if (!corrective) return res.status(404).json({ message: "Not found" });

    res.status(200).json(corrective);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// Update corrective action
export const updateCorrective = async (req, res) => {
  try {
    const { reportDate, instrumentName, instrumentId, contactPerson, correctiveAction, status } = req.body;
    let fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const corrective = await Corrective.findById(req.params.id);
    if (!corrective) return res.status(404).json({ message: "Not found" });

    if (req.file && corrective.fileUrl) {
      fs.unlinkSync(`./public${corrective.fileUrl}`); // Delete old file
    }

    corrective.reportDate = reportDate;
    corrective.instrumentName = instrumentName;
    corrective.instrumentId = instrumentId;
    corrective.contactPerson = contactPerson;
    corrective.correctiveAction = correctiveAction;
    corrective.status = status;
    if (fileUrl) corrective.fileUrl = fileUrl;

    await corrective.save();
    res.status(200).json(corrective);
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
};

// Delete corrective action
export const deleteCorrective = async (req, res) => {
  try {
    const corrective = await Corrective.findByIdAndDelete(req.params.id);
    if (!corrective) return res.status(404).json({ message: "Not found" });

    if (corrective.fileUrl) {
      fs.unlinkSync(`./public${corrective.fileUrl}`);
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
};
