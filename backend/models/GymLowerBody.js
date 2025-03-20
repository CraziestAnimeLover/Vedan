import mongoose from 'mongoose';

const gymlowerbodyexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymLowerBodyExercise = mongoose.model('LowerBodyExercise', gymlowerbodyexerciseSchema ,"gymlowerbodyexercise");
export default GymLowerBodyExercise;