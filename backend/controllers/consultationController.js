// controllers/consultationController.js
import Consultation from '../models/Consultation.js';  // Use ES modules import

// Create a new consultation query
export const createConsultation = async (req, res) => {
  try {
    const { area, fees, type } = req.body;

    const newConsultation = new Consultation({
      area,
      fees,
      type
    });

    await newConsultation.save();

    return res.status(201).json({ message: 'Consultation query created successfully', data: newConsultation });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating consultation query', error });
  }
};

// Get all consultations
export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find();
    return res.status(200).json(consultations);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching consultations', error });
  }
};
