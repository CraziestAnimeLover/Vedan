import express from 'express';
import {
    getGymExercises,
    createGymExercise,
    updateGymExercise,
    deleteGymExercise,
} from '../controllers/gymshoulderController.js'; // Updated controller file reference

const router = express.Router();

// Get all gym shoulder exercises
router.get('/', getGymExercises);

// Create a new gym shoulder exercise
router.post('/', createGymExercise);

// Update a gym shoulder exercise by ID
router.put('/:id', updateGymExercise);
router.patch('/:id', updateGymExercise);

// Delete a gym shoulder exercise by ID
router.delete('/:id', deleteGymExercise);

export default router;
