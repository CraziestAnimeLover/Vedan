import express from 'express';
import {
    getGymExercises,
    createGymExercise,
    updateGymExercise,
    deleteGymExercise
} from '../controllers/gymbuttController.js'; // Updated controller file reference

const router = express.Router();

// Routes for gym back exercises
router.get('/', getGymExercises);
router.post('/', createGymExercise);
router.patch('/:id', updateGymExercise);
router.put('/:id', updateGymExercise);
router.delete('/:id', deleteGymExercise);

export default router;
