import express from 'express';
import { addLoan } from '../controllers/loan.controller.js';

const router = express.Router();

router.post('/', addLoan); // Route to add a new loan

export default router;
