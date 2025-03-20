import express from 'express';
import {
  getGymExercises,
  createGymExercise,
  updateGymExercise,
  deleteGymExercise
} from '../controllers/gymchestController.js';

const router = express.Router();

// Routes for gym exercises
router.get('/', getGymExercises);
router.post('/', createGymExercise);
router.patch('/:id', updateGymExercise); // Use PATCH for partial updates
router.delete('/:id', deleteGymExercise);

export default router;
