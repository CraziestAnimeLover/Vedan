import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  keyPoint: { type: String, required: true },
  number: { type: Number, required: true, min: 1 },
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
