import GymNotice from "../models/Gymnotice.js";  // Ensure this matches the correct filename

export const createGymNotice = async (req, res) => {
  try {
    const { notice, startDate, endDate, visibleTo } = req.body;

    const newGymNotice = new GymNotice({ notice, startDate, endDate, visibleTo });
    await newGymNotice.save();
    res.status(201).json(newGymNotice);
  } catch (error) {
    res.status(500).json({ message: "Error creating GymNotice", error: error.message });
  }
};

// Get all GymNotices
export const getGymNotices = async (req, res) => {
  try {
    const gymNotices = await GymNotice.find();
    res.status(200).json(gymNotices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching GymNotices", error: error.message });
  }
};

// Update a GymNotice
export const updateGymNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { notice, startDate, endDate, visibleTo } = req.body;
    
    const updatedGymNotice = await GymNotice.findByIdAndUpdate(
      id, 
      { notice, startDate, endDate, visibleTo }, 
      { new: true }
    );

    if (!updatedGymNotice) {
      return res.status(404).json({ message: "GymNotice not found" });
    }
    
    res.status(200).json(updatedGymNotice);
  } catch (error) {
    res.status(500).json({ message: "Error updating GymNotice", error: error.message });
  }
};

// Delete a GymNotice
export const deleteGymNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGymNotice = await GymNotice.findByIdAndDelete(id);

    if (!deletedGymNotice) {
      return res.status(404).json({ message: "GymNotice not found" });
    }
    
    res.status(200).json({ message: "GymNotice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting GymNotice", error: error.message });
  }
};
