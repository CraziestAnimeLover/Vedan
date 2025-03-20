import mongoose from 'mongoose';

const gymvtaperexerciseSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  set: { type: Boolean, default: false },
  rep: { type: Boolean, default: false },
  focusArea: String,
  equipment: String,
});

const GymVTaperExercise = mongoose.model('VTaperExercise', gymvtaperexerciseSchema ,"gymvtaperexercise");
export default GymVTaperExercise;