import mongoose from "mongoose";

const gymAccountSchema = new mongoose.Schema({
  type: { type: String, enum: ["Revenue", "Profit", "NetWorth"], required: true },
  time: { type: String, required: true },
  value: { type: Number, required: true },
});

const GymAccount = mongoose.model("GymAccount", gymAccountSchema);

export default GymAccount;
