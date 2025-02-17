// models/Reminder.js
import { Schema, model } from 'mongoose';

const reminderSchema = new Schema({
  serialNo: { type: Number, required: true },
  ringTime: { type: String, required: true },
  remark: { type: String, required: true },
});

const Reminder = model('Reminder', reminderSchema);

export default Reminder;
