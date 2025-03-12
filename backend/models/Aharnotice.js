// models/Notice.js
import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
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

const Notice = mongoose.model("Notice", noticeSchema , "aharnotice");

export default Notice;
