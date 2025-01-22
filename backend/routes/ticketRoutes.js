import express from 'express';
import { getAllTickets, createTicket, resolveTicket, deleteTicket } from '../controllers/ticketController.js';

const router = express.Router();

router.get('/tickets', getAllTickets);
router.post('/tickets', createTicket);
router.patch('/tickets/:id/resolve', resolveTicket);
router.delete('/tickets/:id', deleteTicket);

export default router;
