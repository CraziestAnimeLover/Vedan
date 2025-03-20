import GymExercise from '../models/GymChest.js';

export const getGymExercises = async (req, res) => {
  try {
    const GymExercises = await GymExercise.find();
    res.json(GymExercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGymExercise = async (req, res) => {
  try {
    const newGymExercise = new GymExercise(req.body);
    await newGymExercise.save();
    res.status(201).json(newGymExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGymExercise = async (req, res) => {
  try {
    const updatedGymExercise = await GymExercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGymExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGymExercise = async (req, res) => {
  try {
    await GymExercise.findByIdAndDelete(req.params.id);
    res.json({ message: 'GymExercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};