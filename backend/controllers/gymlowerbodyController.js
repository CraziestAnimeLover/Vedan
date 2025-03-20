import GymFullBodyExercise from '../models/GymLowerBody.js'; // Ensure correct model file

export const getGymExercises = async (req, res) => {
    try {
        const gymExercises = await GymFullBodyExercise.find();
        res.json(gymExercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createGymExercise = async (req, res) => {
    try {
        const newGymExercise = new GymFullBodyExercise(req.body);
        await newGymExercise.save();
        res.status(201).json(newGymExercise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateGymExercise = async (req, res) => {
    try {
        const updatedGymExercise = await GymFullBodyExercise.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedGymExercise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteGymExercise = async (req, res) => {
    try {
        await GymFullBodyExercise.findByIdAndDelete(req.params.id);
        res.json({ message: 'Gym exercise deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
