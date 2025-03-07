import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: { type: String },
  equipment: { type: String },
});

const GymExercise = mongoose.model("GymExercise", exerciseSchema,"gymbackexercise");
export default GymExercise;
