// student.controller.js
import Student from '../models/student.model.js';  // Adjust the path as needed based on your project structure

export const getStudent = async (req, res) => {
    const { memberId } = req.params;
  
    // Simulate fetching student data from DB
    const student = await Student.findOne({ memberId });
  
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
  
    return res.status(200).json(student);
  };
  