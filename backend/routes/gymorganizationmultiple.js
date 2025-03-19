import express from 'express';
import {
  createGymOrganization,
  getAllGymOrganizations,
  getGymOrganizationById,
  updateGymOrganization,
  deleteGymOrganization,
} from '../controllers/gymorganizationmultipleController.js';

const router = express.Router();

// Route to create a new GymOrganization
router.post('/organizations', createGymOrganization);

// Route to get all organizations
router.get('/organizations', getAllGymOrganizations);

// Route to get a single organization by ID
router.get('/organizations/:id', getGymOrganizationById);

// Route to update an organization by ID
router.put('/organizations/:id', updateGymOrganization);

// Route to delete an organization by ID
router.delete('/organizations/:id', deleteGymOrganization);

export default router;
