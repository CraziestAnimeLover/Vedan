// routes/searchRoutes.js
import { Router } from 'express';
import { createSearchQuery, getSearchQueries } from '../controllers/searchController.js';

const router = Router();

// Endpoint to create a new search query
router.post('/search', createSearchQuery);

// Endpoint to get all search queries (optional)
router.get('/search', getSearchQueries);

export default router;
