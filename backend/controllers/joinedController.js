// controllers/joinedController.js
import JoinedMember from '../models/JoinedMember.js';

// Handle form data submission
export const createJoinedMember = async (req, res) => {
    try {
      console.log(req.body);  // Log the incoming body to inspect the data
      
      const { picName, vedanId, name, seatNo, time, joiningDate, fees, bookLoans } = req.body;
  
      // Check if required fields are present
      if (!picName || !vedanId || !name || !seatNo || !time || !joiningDate || !fees || !bookLoans) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newJoinedMember = new JoinedMember({
        picName,
        vedanId,
        name,
        seatNo,
        time,
        joiningDate,
        fees,
        bookLoans
      });
  
      await newJoinedMember.save();
      return res.status(201).json({ message: 'Joined member data saved successfully', data: newJoinedMember });
    } catch (error) {
      console.error('Error saving member data:', error);  // Log error for debugging
      return res.status(500).json({ message: 'Error saving member data', error });
    }
  };
  

// Get all joined members (for viewing or admin use)
export const getJoinedMembers = async (req, res) => {
  try {
    const members = await JoinedMember.find();
    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching joined members', error });
  }
};
