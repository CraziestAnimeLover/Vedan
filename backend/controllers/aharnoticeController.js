// controllers/noticeController.js
import Notice from "../models/Aharnotice.js";

// Create a new notice
export const createNotice = async (req, res) => {
  try {
    const { notice, startDate, endDate, visibleTo } = req.body;
    const newNotice = new Notice({ notice, startDate, endDate, visibleTo });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: "Error creating notice", error: error.message });
  }
};

// Get all notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices", error: error.message });
  }
};

// Update a notice
export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { notice, startDate, endDate, visibleTo } = req.body;
    const updatedNotice = await Notice.findByIdAndUpdate(id, { notice, startDate, endDate, visibleTo }, { new: true });
    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json(updatedNotice);
  } catch (error) {
    res.status(500).json({ message: "Error updating notice", error: error.message });
  }
};

// Delete a notice
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notice", error: error.message });
  }
};
