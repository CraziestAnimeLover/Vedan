
import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  range: { type: String, required: true },
  fees: { type: Number, required: true },
  savedAmount: { type: Number, required: true }, // Renamed from 'save'
  remarks: { type: String },
});

const Package = mongoose.model("Package", packageSchema , "gympackage");
export default Package;
