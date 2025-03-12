import express from 'express';
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from '../controllers/aharorganizationController.js';

const router = express.Router();

// Route to create a new organization
router.post('/organizations', createOrganization);

// Route to get all organizations
router.get('/organizations', getAllOrganizations);

// Route to get a single organization by ID
router.get('/organizations/:id', getOrganizationById);

// Route to update an organization by ID
router.put('/organizations/:id', updateOrganization);

// Route to delete an organization by ID
router.delete('/organizations/:id', deleteOrganization);

export default router;
