// seat.controller.js
import Booking from '../models/booking.model.js'; // Adjust the path according to your file structure


export const bookSeat = async (req, res) => {
    const { seatNumber, tableNo, memberId, planDetails, startDate, expiryDate, paymentMethod, paidAmount, dueAmount, nextBillDate } = req.body;
  
    // Simulate seat booking
    const booking = await Booking.create({ 
        seatNumber,
        tableNo,  // Include tableNo in the seat data
        memberId,
        planDetails,
        startDate,
        expiryDate,
        paymentMethod,
        paidAmount,
        dueAmount,
        nextBillDate, 
    });
  
    return res.status(201).json({ success: true, message: 'Seat booked successfully', booking });
  };
  