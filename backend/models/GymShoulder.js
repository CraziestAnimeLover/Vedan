import mongoose from 'mongoose';

const gymshoulderexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymshoulderExercise = mongoose.model('shoulderExercise', gymshoulderexerciseSchema ,"gymshoulderexercise");
export default GymshoulderExercise;