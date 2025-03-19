import mongoose from "mongoose";

const DietPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  janta: { type: String, required: true },
  dietData: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("DietPlan", DietPlanSchema);
