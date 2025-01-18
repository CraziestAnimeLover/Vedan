// models/MembershipPlan.js
import mongoose from 'mongoose';

const MembershipPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fee: { type: Number, required: true },
  free: { type: Number, required: true },
  affordable: { type: Number, required: true },
  standard: { type: Number, required: true },
  premium: { type: Number, required: true },
  details: { type: [String], required: true },
});

const MembershipPlan = mongoose.model('MembershipPlan', MembershipPlanSchema);

export default MembershipPlan;
