import mongoose from "mongoose";

const GymUserSchema = new mongoose.Schema({
  selectedPlan: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permissions: { type: [String], default: [] },
});

const GymUser = mongoose.model("GymUser", GymUserSchema);
export default GymUser;
