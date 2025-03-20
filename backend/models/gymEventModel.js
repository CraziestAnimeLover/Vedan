import mongoose from "mongoose";

const gymEventSchema = new mongoose.Schema(
  {
    srNo: { type: Number, required: true },
    eventName: { type: String, required: true },
    goal: { type: String, required: true },
    musclePrimary: { type: String, required: true },
    muscleSecondary: { type: String },
    place: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String }, // PDF file URL
    pic: { type: String }, // Image file URL
  },
  { timestamps: true }
);

const GymEvent = mongoose.model("GymEvent", gymEventSchema);

export default GymEvent;
