// models/Consultation.js
import { Schema, model } from 'mongoose';

const ConsultationSchema = new Schema({
  area: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['allopathic', 'homeopathic', 'ayurvedic'],
    required: true
  }
}, { timestamps: true });

export default model('Consultation', ConsultationSchema);
