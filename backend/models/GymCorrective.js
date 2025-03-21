import mongoose from "mongoose";

const CorrectiveSchema = new mongoose.Schema({
  reportDate: { type: Date, required: true },
  instrumentName: { type: String, required: true },
  instrumentId: { type: String, required: true },
  contactPerson: { type: String, required: true },
  correctiveAction: { type: String, required: true },
  status: { type: String, required: true },
  fileUrl: { type: String } // Optional
});

export default mongoose.model("Corrective", CorrectiveSchema ,"gymcorrective");
