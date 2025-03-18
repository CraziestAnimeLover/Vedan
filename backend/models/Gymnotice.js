import mongoose from "mongoose";

const gymnoticeSchema = new mongoose.Schema(
  {
    notice: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    visibleTo: {
      type: String,
      enum: ["User", "Member", "Staff"],
      required: true,
    },
  },
  { timestamps: true }
);

const GymNotice = mongoose.model("GymNotice", gymnoticeSchema);

export default GymNotice;
