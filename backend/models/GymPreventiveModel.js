import mongoose from "mongoose";

const preventiveSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  inspectionBy: { type: String, required: true },
  rows: [
    {
      name: { type: String, required: true },
      days: { type: Map, of: String }, // Store day-wise status dynamically
    },
  ],
  notations: [
    {
      date: { type: String, required: true },
      info: { type: String, required: true },
    },
  ],
});

const Preventive = mongoose.model("Preventive", preventiveSchema , "gymprevent");
export default Preventive;
