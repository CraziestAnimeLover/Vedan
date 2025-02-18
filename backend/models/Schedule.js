import { Schema, model } from 'mongoose';

const timeSlotSchema = new Schema({
  start: String,
  end: String,
  activity: String
});

const daySchema = new Schema({
  day: String,
  slots: [timeSlotSchema]
});

const scheduleSchema = new Schema({
  name: String, // Name for the schedule (optional)
  days: [daySchema]
});

export default model('Schedule', scheduleSchema);
