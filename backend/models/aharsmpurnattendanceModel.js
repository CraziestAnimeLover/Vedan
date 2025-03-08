import mongoose from "mongoose"; 

const { Schema, model, models } = mongoose; // ✅ Extract properties from `mongoose`
const attendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: String, required: true },
  attendanceData: { type: [String], required: true },
  totalDays: { type: Number, required: true },
  performedTotalP: { type: Number, required: true },
  remark: { type: String, required: true },
});
 // Adds createdAt and updatedAt fields
  

// ✅ Prevent model overwrite error
const Attendance = models?.Attendance || model("Attendance", aharsmpurnattendanceSchema, "aharsmpurnattendances");

export default Attendance;
