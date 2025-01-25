import express from 'express';
import { bookSeat, getSeatBookings, getSeatBookingDetails } from '../controllers/seat.controller.js';

const router = express.Router();

// POST request to book a seat
router.post('/book-seat', bookSeat);

// GET request to fetch all seat bookings or filter by memberId
router.get('/book-seat', getSeatBookings);

// GET request to fetch seat booking details by seat number
router.get('/book-seat-details/:seatNumber', getSeatBookingDetails);

export default router;
