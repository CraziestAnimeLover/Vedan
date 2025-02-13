import AdmitCard from "../models/AdmitCard.js";

// Get all admit cards
export const getAdmitCards = async (req, res) => {
  try {
    const admitCards = await AdmitCard.find();
    res.json(admitCards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admit cards", error });
  }
};

// Add a new admit card
export const addAdmitCard = async (req, res) => {
  try {
    const { exam, websiteLink } = req.body;
    const newAdmitCard = new AdmitCard({ exam, websiteLink });
    await newAdmitCard.save();
    res.status(201).json(newAdmitCard);
  } catch (error) {
    res.status(500).json({ message: "Error adding admit card", error });
  }
};

// Delete an admit card
export const deleteAdmitCard = async (req, res) => {
  try {
    const { id } = req.params;
    await AdmitCard.findByIdAndDelete(id);
    res.json({ message: "Admit Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admit card", error });
  }
};
