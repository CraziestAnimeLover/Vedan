import { Schema, model } from "mongoose";

const enquirySchema = new Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  followUpDate: { type: Date, required: true },
  followUpTime: { type: String, required: true },
  description: { type: String, required: true },
});

export default model("Enquiry", enquirySchema,"gymenquiriesdemo");
