import mongoose from 'mongoose';

import { Schema, model } from 'mongoose';

const examSchema = new Schema({
  name: { type: String, required: true },
  notificationDate: { type: Date, required: true },
  lastDate: { type: Date, required: true },
  examSite: { type: String, required: true },
  university: { type: String, required: true },
});

export default model('Exam', examSchema);