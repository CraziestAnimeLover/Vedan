import mongoose from 'mongoose';

const LibrarySchema = new mongoose.Schema({
  // Pincode: A required string field
  pincode: {
    type: String,
    required: true,
  },

  // Time Slot: A required field with an enum for predefined times
  timeSlot: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
    required: true,
  },

  // Date of Joining: A required date field for when the student joins
  dateJoining: {
    type: Date,
    required: true,
  },

  // Fee: A required field for the library fee
  fee: {
    type: Number,
    required: true,
  },

  // Added a student reference to connect the library schema with a user/student model (optional)
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection (assuming you have a user model)
    required: true,
  },

  // Seat Number: You can add this to track the seat number allocated to the student
  seatNumber: {
    type: Number,
    required: true,
  },

  // Plan Details: A description of the student's subscription plan (optional)
  planDetails: {
    type: String,
    required: true,
  },

  // Status: A status field to check if the seat is currently available or occupied
  status: {
    type: String,
    enum: ['Available', 'Occupied'],
    default: 'Available',
  },
});

// Create and export the model
const Library = mongoose.model('Library', LibrarySchema);

export default Library;
