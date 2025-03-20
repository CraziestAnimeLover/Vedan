import mongoose from 'mongoose';

const gymbuttexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymButtExercise = mongoose.model('ButtExercise', gymbuttexerciseSchema ,"gymbuttexercise");
export default GymButtExercise;