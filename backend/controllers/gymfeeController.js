import Fee from "../models/GymFee.js";
import mongoose from "mongoose";

export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.json(Array.isArray(fees) ? fees : []); // Ensure response is an array
  } catch (error) {
    console.error("Error fetching fees:", error);
    res.status(500).json({ error: "Failed to fetch fees" });
  }
};


export const addFee = async (req, res) => {
  console.log("Received POST Data:", req.body); // Log request body

  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json(fee);
  } catch (error) {
    console.error("Error adding fee:", error);
    res.status(400).json({ message: error.message });
  }
};


export const updateFee = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id); // Log the ID to check format

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid fee ID" });
  }

  try {
    const updatedFee = await Fee.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFee) {
      return res.status(404).json({ message: "Fee record not found" });
    }

    res.status(200).json(updatedFee);
  } catch (error) {
    console.error("Error updating fee:", error);
    res.status(500).json({ message: "Server error while updating fee" });
  }
};


export const deleteFee = async (req, res) => {
  const { id } = req.params;

  // ✅ Check if ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid fee ID" });
  }

  try {
    const deletedFee = await Fee.findByIdAndDelete(id);

    if (!deletedFee) {
      return res.status(404).json({ message: "Fee record not found" });
    }

    res.json({ message: "Fee entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting fee:", error);
    res.status(500).json({ message: error.message });
  }
};
