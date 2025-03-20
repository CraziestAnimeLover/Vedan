import mongoose from 'mongoose';

const gymupperbodyexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymUpperBodyExercise = mongoose.model('UpperBodyExercise', gymupperbodyexerciseSchema ,"gymupperbodyexercise");
export default GymUpperBodyExercise;