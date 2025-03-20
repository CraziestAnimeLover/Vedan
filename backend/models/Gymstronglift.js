import mongoose from 'mongoose';

const gymstrongliftexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymStronLiftExercise = mongoose.model('StronLiftExercise', gymstrongliftexerciseSchema ,"gymstrongliftexercise");
export default GymStronLiftExercise;