import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchName: {
      type: String,
      required: true,
      trim: true,
    },
    batchLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    batchOpenTime: {
      type: String,
      required: true,
    },
    batchCloseTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema , "gymbatch");

export default Batch;
