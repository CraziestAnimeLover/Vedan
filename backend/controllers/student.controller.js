// student.controller.js
import Student from '../models/student.model.js'; // Assuming you have a Student model

export const getStudent = async (req, res) => {
  try {
    const { memberId } = req.params;  // Fetch memberId from the URL parameter
    const student = await Student.findOne({ memberId });  // Use memberId to query database

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student); // Return student data
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Error fetching student' });
  }
};
