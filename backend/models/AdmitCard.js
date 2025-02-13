import mongoose from "mongoose";

const AdmitCardSchema = new mongoose.Schema({
  exam: { type: String, required: true },
  websiteLink: { type: String, required: true },
});

const AdmitCard = mongoose.model("AdmitCard", AdmitCardSchema);
export default AdmitCard;
