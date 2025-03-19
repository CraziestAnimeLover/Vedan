import Trainer from "../models/GymTrainer.js";
import fs from "fs";
import path from "path";

// Create Trainer
export const createTrainer = async (req, res) => {
  try {
    const { name, address, dob, gender, mobile, joindate, email, experience, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newTrainer = new Trainer({ name, address, dob, gender, mobile, joindate, email, experience, description, image });
    await newTrainer.save();

    res.status(201).json({ message: "Trainer added successfully", trainer: newTrainer });
  } catch (error) {
    res.status(500).json({ message: "Error adding trainer", error });
  }
};

// Get all trainers
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving trainers", error });
  }
};

// Delete Trainer
export const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findById(id);
    
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    if (trainer.image) {
      fs.unlinkSync(path.join(process.cwd(), trainer.image));
    }

    await Trainer.findByIdAndDelete(id);
    res.json({ message: "Trainer removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trainer", error });
  }
};
