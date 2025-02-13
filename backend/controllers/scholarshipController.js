import Scholarship from "../models/Scholarship.js";

// Get all scholarships
export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scholarships", error });
  }
};

// Add a new scholarship
export const addScholarship = async (req, res) => {
  try {
    const { name, field, link } = req.body;
    const newScholarship = new Scholarship({ name, field, link });
    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (error) {
    res.status(500).json({ message: "Error adding scholarship", error });
  }
};

// Delete a scholarship
export const deleteScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    await Scholarship.findByIdAndDelete(id);
    res.json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting scholarship", error });
  }
};
