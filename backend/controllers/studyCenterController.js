import StudyCenter from "../models/StudyCenter.js";

// Get all study centers
export const getStudyCenters = async (req, res) => {
  try {
    const studyCenters = await StudyCenter.find();
    res.json(studyCenters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching study centers", error });
  }
};

// Add a new study center
export const addStudyCenter = async (req, res) => {
  try {
    const { examType, coaching, location, website } = req.body;
    const newStudyCenter = new StudyCenter({ examType, coaching, location, website });
    await newStudyCenter.save();
    res.status(201).json(newStudyCenter);
  } catch (error) {
    res.status(500).json({ message: "Error adding study center", error });
  }
};

// Delete a study center
export const deleteStudyCenter = async (req, res) => {
  try {
    const { id } = req.params;
    await StudyCenter.findByIdAndDelete(id);
    res.json({ message: "Study center deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting study center", error });
  }
};
