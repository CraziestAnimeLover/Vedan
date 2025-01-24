import { Router } from 'express';
import { addLibrary, getLibraries, updateLibrary, deleteLibrary } from '../controllers/library.controller.js';
import { validateLibrary } from '../middlewares/library.validator.js';  // Import your validation middleware
import { isAdmin } from '../middlewares/auth.middleware.js'; // Optional: authentication middleware

const router = Router();

// POST endpoint to add a new library
router.post('/', isAdmin, validateLibrary, addLibrary); // Only admins can add libraries

// GET endpoint to fetch all libraries
router.get('/', getLibraries);

// PUT endpoint to update an existing library
router.put('/:id', isAdmin, validateLibrary, updateLibrary); // Optional: protect with isAdmin

// DELETE endpoint to delete a library
router.delete('/:id', isAdmin, deleteLibrary); // Only admins can delete libraries

export default router;
