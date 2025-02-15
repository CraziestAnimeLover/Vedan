import express from 'express';
import { addLoan ,getAllLoans} from '../controllers/loan.controller.js';

const router = express.Router();

router.post('/', addLoan); // Route to add a new loan
router.get('/', getAllLoans);

export default router;
