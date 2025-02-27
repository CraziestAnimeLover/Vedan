import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  portfolio: String,
  skills: [{ skill: String }],
  experience: [{ role: String, company: String, year: String }],
  education: [{ // ✅ Define `education` as an array of objects
    university: String,
    percentage: String,
    year: String,
    type: { type: String, enum: ['10th', '12th', 'Graduation', 'Other'] } // Optional: Enum validation
  }],
  certificate: String
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
