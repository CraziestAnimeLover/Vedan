// routes/consultationRoutes.js
import { Router } from 'express';
import { createConsultation, getConsultations } from '../controllers/consultationController.js';  // ES modules import

const router = Router();

// Create a new consultation query
router.post('/consultations', createConsultation);

// Get all consultations
router.get('/consultations', getConsultations);

export default router; // Export router using ES modules export
