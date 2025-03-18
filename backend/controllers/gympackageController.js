import mongoose from "mongoose";
import Package from "../models/GympackageModel.js";

// 🟢 Get All Packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages", error });
  }
};

// 🟢 Create a New Package
export const createPackage = async (req, res) => {
    try {
      console.log("Received Data:", req.body); // Check if data is received correctly
  
      const newPackage = new Package(req.body);
      await newPackage.save();
  
      res.status(201).json(newPackage);
    } catch (error) {
      console.error("🔥 Error creating package:", error); // Log the full error
      res.status(500).json({ message: "Error creating package", error });
    }
  };
  
  

// 🟢 Update Package
export const updatePackage = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate if `id` is a proper MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid package ID" });
      }
  
      const updatedPackage = await GymPackage.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedPackage) {
        return res.status(404).json({ message: "Package not found" });
      }
  
      res.json(updatedPackage);
    } catch (error) {
      console.error("Error updating package:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
// 🟢 Delete Package
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) return res.status(404).json({ message: "Package not found" });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting package", error });
  }
};
