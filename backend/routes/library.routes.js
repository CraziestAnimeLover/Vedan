import { Router } from 'express';
import { addLibrary, getLibraries } from '../controllers/library.controller.js';

const router = Router();

// POST endpoint to add a new library
router.post('/', addLibrary);

// GET endpoint to fetch all libraries
router.get('/', getLibraries);

// Other routes for updating, deleting, etc.

export default router;
