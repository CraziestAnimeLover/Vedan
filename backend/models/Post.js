import mongoose from 'mongoose';

import { Schema, model } from 'mongoose';
const postSchema = new mongoose.Schema({
    category: { type: String, required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  });
  
  export default model('Post', postSchema);