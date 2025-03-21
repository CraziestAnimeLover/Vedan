import mongoose from "mongoose";

const LiveSchema = new mongoose.Schema({
  srNo: { type: Number, required: true },
  concept: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  image: { type: String, default: null }, // Image URL
  file: { type: String, default: null },  // PDF URL
});

const Live = mongoose.model("Live", LiveSchema);

export default Live;
