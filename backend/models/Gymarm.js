import mongoose from 'mongoose';

const gymarmexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymArmExercise = mongoose.model('ArmExercise', gymarmexerciseSchema ,"gymarmexercise");
export default GymArmExercise;