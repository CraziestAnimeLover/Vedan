import mongoose from 'mongoose';

import { Schema, model } from 'mongoose';
const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  });
  
 export default model('Subject', subjectSchema);
  