import mongoose from 'mongoose';

const gymabsexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymAbsExercise = mongoose.model('AbsExercise', gymabsexerciseSchema ,"gymabsexercise");
export default GymAbsExercise;