import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  timeIn: { type: String, required: true },
  timeOut: { type: String, required: true },
  studentName: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: String, required: true },
  attendanceData: { type: Array, required: true },
  totalDays: { type: Number, required: true },
  performedTotalP: { type: Number, required: true },
  remark: { type: String, required: true },
});

// ✅ Check if the model already exists before defining it
const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
