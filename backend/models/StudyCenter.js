import mongoose from "mongoose";

const StudyCenterSchema = new mongoose.Schema({
  examType: { type: String, required: true },
  coaching: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String, required: true }
});

export default mongoose.model("StudyCenter", StudyCenterSchema);
