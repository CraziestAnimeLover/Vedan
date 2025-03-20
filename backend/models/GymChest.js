import mongoose from 'mongoose';

const gymexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymExercise = mongoose.model('Exercise', gymexerciseSchema ,"gymchestexercise");
export default GymExercise;