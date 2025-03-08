import StaffAttendance from "../models/StaffAttendance.js";

// Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const records = await StaffAttendance.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new attendance record
export const addAttendance = async (req, res) => {
  try {
    const newRecord = new StaffAttendance(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an attendance record
export const updateAttendance = async (req, res) => {
  try {
    const updatedRecord = await StaffAttendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an attendance record
export const deleteAttendance = async (req, res) => {
  try {
    await StaffAttendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
