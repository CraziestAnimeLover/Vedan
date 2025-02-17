// models/JoinedMember.js
import mongoose from 'mongoose';

const BookLoanSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  bookName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  available: { type: Boolean, default: false }
});

const JoinedMemberSchema = new mongoose.Schema({
  picName: { type: String }, // Store URL for image
  vedanId: { type: String, required: true },
  name: { type: String, required: true },
  seatNo: { type: String, required: true },
  time: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  fees: { type: Number, required: true },
  bookLoans: [BookLoanSchema] // Array of BookLoan objects
}, { timestamps: true });

const JoinedMember = mongoose.model('JoinedMember', JoinedMemberSchema);

export default JoinedMember;
