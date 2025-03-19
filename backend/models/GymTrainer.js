import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  mobile: { type: String, required: true },
  joindate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  experience: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Store image URL
});

const Trainer = mongoose.model("Trainer", trainerSchema ,"gymtrainers");

export default Trainer;
