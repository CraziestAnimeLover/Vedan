// seat.routes.js
import express from 'express';
import { bookSeat } from '../controllers/seat.controller.js'; // Controller for booking a seat

const router = express.Router();

// POST to book a seat
router.post('/', bookSeat);

export default router;
