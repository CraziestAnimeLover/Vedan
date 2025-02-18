import HumanBeing from '../models/HumanBeing.js';
import mongoose from 'mongoose';

// Create a new human being entry
export const createHumanBeing = async (req, res) => {
  console.log("✅ Received body:", req.body);
  console.log("✅ Received file:", req.file);
  console.log("✅ Received headers:", req.headers);

  // Check if required fields are missing
  if (!req.body.name || !req.body.lostLocation) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newHumanBeing = new HumanBeing({
      lostLocation: req.body.lostLocation,
      lostDate: req.body.lostDate,
      lostTime: req.body.lostTime,
      skinColor: req.body.skinColor,
      eyeColor: req.body.eyeColor,
      hairColor: req.body.hairColor,
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      gender: req.body.gender,
      profession: req.body.profession,
      name: req.body.name,
      address: req.body.address,
      guardianName: req.body.guardianName,
      guardianPhone: req.body.guardianPhone,
      guardianAddress: req.body.guardianAddress,
      image: imagePath,
    });

    await newHumanBeing.save();
    res.status(201).json({ message: "Human being created successfully", humanBeing: newHumanBeing });
  } catch (error) {
    console.error("❌ Error saving to database:", error);
    res.status(400).json({ error: error.message });
  }
};



// Get all human being records
export async function getAllHumanBeings(req, res) {
  try {
    const humanBeings = await HumanBeing.find();
    res.status(200).json({ success: true, humanBeings });
  } catch (error) {
    console.error("Error in getAllHumanBeings:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// Get a single human being record by ID


export const getHumanBeingById = async (req, res) => {
  const humanId = req.params.id;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(humanId)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    const humanBeing = await HumanBeing.findById(humanId);
    
    if (!humanBeing) {
      return res.status(404).json({ success: false, message: 'Human being not found' });
    }
    
    res.status(200).json({ success: true, humanBeing });
  } catch (error) {
    console.error("Error fetching human being:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




// Update a human being record by ID
export async function updateHumanBeing(req, res) {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const updatedData = { ...req.body };
    if (imagePath) updatedData.image = imagePath;

    const updatedHumanBeing = await HumanBeing.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedHumanBeing) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: "Human being details updated!", humanBeing: updatedHumanBeing });
  } catch (error) {
    console.error("Error in updateHumanBeing:", error.message);
    res.status(400).json({ error: error.message });
  }
}

// Delete a human being record by ID
export async function deleteHumanBeing(req, res) {
  try {
    const deletedHumanBeing = await HumanBeing.findByIdAndDelete(req.params.id);
    if (!deletedHumanBeing) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Human being entry deleted!' });
  } catch (error) {
    console.error("Error in deleteHumanBeing:", error.message);
    res.status(500).json({ error: error.message });
  }
}
