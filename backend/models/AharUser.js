import { Schema, model } from 'mongoose';

const AharUserSchema = new Schema({
  selectedPlan: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permissions: { type: [String], default: [] },
}, { timestamps: true });

export default model('AharUser', AharUserSchema);