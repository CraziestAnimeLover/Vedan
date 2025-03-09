import mongoose from "mongoose";
import Attendance from "../models/aharsmpurnattendanceModel.js";

// Get all attendance records
export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Error fetching attendance data" });
  }
};

// Get single attendance record by ID
export const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid attendance ID format" });
    }

    const record = await Attendance.findById(id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error("Error fetching record:", error);
    res.status(500).json({ error: "Error fetching record" });
  }
};

// Add a new attendance record
export const addAttendance = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // 🔍 Log incoming request data
    
    const { id, name, timeIn, timeOut, studentName, year, month, attendanceData, totalDays, performedTotalP, remark } = req.body;

    // Validate if all fields exist
    if (!id || !name || !timeIn || !timeOut || !studentName || !year || !month || !attendanceData || totalDays === undefined || performedTotalP === undefined || !remark) {
      return res.status(400).json({
        error: "All fields are required",
        missingFields: { id, name, timeIn, timeOut, studentName, year, month, attendanceData, totalDays, performedTotalP, remark }
      });
    }

    const newRecord = new Attendance(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error("Validation Error Details:", error);
    res.status(400).json({ error: "Validation error", details: error.errors || error.message });
  }
};


  

// Update an attendance record
export const updateAttendance = async (req, res) => {
    console.log("Received request to update attendance with ID:", req.params.id); // Log incoming request
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid attendance ID format" });
      }
  
      const updatedRecord = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedRecord) {
        return res.status(404).json({ error: "Record not found" });
      }
  
      res.json(updatedRecord);
    } catch (error) {
      console.error("Error updating attendance:", error);
      res.status(500).json({ error: "Error updating attendance record" });
    }
  };
  
  
  
  
  
  

// Delete an attendance record
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId before deletion
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid attendance ID format" });
    }

    const deletedRecord = await Attendance.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ error: "Error deleting record" });
  }
};
