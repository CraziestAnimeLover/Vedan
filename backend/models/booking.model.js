import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true },
    tableNo: { type: String,  },  // Added tableNo field
    memberId: { type: String, },
    planDetails: { type: String },
    startDate: { type: Date },
    expiryDate: { type: Date },
    paymentMethod: { type: String },
    paidAmount: { type: Number },
    dueAmount: { type: Number },
    nextBillDate: { type: Date },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
