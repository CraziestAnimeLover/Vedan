import Booking from '../models/booking.model.js'; // Adjust the path according to your file structure

// Function to book a seat
export const bookSeat = async (req, res) => {
    const { seatNumber, tableNo, memberId, planDetails, startDate, expiryDate, paymentMethod, paidAmount, dueAmount, nextBillDate } = req.body;
  
    try {
        const booking = await Booking.create({ 
            seatNumber,
            tableNo,
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
    } catch (error) {
        console.error("Error booking seat:", error);
        res.status(500).json({ message: "Failed to book seat", error });
    }
};
  
// Function to get all seat bookings
export const getSeatBookings = async (req, res) => {
    try {
        const bookings = await Booking.find(); // Fetch all bookings
        res.status(200).json(bookings);  // Send response as JSON
    } catch (error) {
        console.error("Error fetching seat bookings:", error);
        res.status(500).json({ message: "Failed to fetch seat bookings", error });
    }
};

// Function to get details of a specific seat booking by ID
export const getSeatBookingDetails = async (req, res) => {
    const { bookingId } = req.params; // Get the booking ID from request parameters

    try {
        const booking = await Booking.findById(bookingId); // Fetch the specific booking by ID
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking); // Send response as JSON
    } catch (error) {
        console.error("Error fetching seat booking details:", error);
        res.status(500).json({ message: "Failed to fetch booking details", error });
    }
};
