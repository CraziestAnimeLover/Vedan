import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  loanId: { type: String, required: true },
  bookName: { type: String, required: true },
  bookId: { type: String, required: true },
  borrowerName: { type: String, required: true },
  loanDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  returnBook: { type: Boolean, default: false },
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan; // Default export
