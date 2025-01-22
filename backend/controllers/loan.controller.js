import Loan from '../models/loan.model.js';

export const addLoan = async (req, res) => {
  try {
    const { loanId, bookName, bookId, borrowerName, loanDate, dueDate, returnBook } = req.body;

    const newLoan = new Loan({
      loanId,
      bookName,
      bookId,
      borrowerName,
      loanDate,
      dueDate,
      returnBook,
    });

    await newLoan.save();
    res.status(201).json({ loan: newLoan });
  } catch (error) {
    res.status(500).json({ message: "Error adding loan", error });
  }
};
