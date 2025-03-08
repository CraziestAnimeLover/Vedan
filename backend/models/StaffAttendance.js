import mongoose from "mongoose";

const staffAttendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  timeIn: { type: String, default: "" },
  timeOut: { type: String, default: "" },
  sign: { type: String, default: "✖" },
  remark: { type: String, default: "Absent" },
});

const StaffAttendance = mongoose.model("StaffAttendance", staffAttendanceSchema,"staffattendance");

export default StaffAttendance;
