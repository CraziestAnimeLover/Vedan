import express from 'express';
import {
  getGymExercises,
  createGymExercise,
  updateGymExercise,
  deleteGymExercise
} from '../controllers/gymarmController.js'; // Make sure the controller file matches

const router = express.Router();

// Routes for gym exercises
router.get('/', getGymExercises);
router.post('/', createGymExercise);
router.patch('/:id', updateGymExercise); // Use PATCH for partial updates
router.delete('/:id', deleteGymExercise);
router.put('/:id', updateGymExercise); // Change PATCH to PUT


export default router;
