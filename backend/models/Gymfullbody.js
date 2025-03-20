import mongoose from 'mongoose';

const gymfullbodyexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymFullBodyExercise = mongoose.model('FullBodyExercise', gymfullbodyexerciseSchema ,"gymfullbodyexercise");
export default GymFullBodyExercise;