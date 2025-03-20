import mongoose from 'mongoose';

const gymbackexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymBackExercise = mongoose.model('BackExercise', gymbackexerciseSchema ,"gymbackexercise");
export default GymBackExercise;