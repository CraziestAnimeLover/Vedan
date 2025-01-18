import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  timeIn: { type: String, required: true },
  timeOut: { type: String, required: true },
  sign: { type: String, default: 'Absent' },
});

export const Attendance = mongoose.model('Attendance', attendanceSchema);
