import { Schema, model } from "mongoose";

const FeesSchema = new Schema({
  student: { type: String, required: true },
  feeFrom: { type: String, required: true },
  feeTo: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: String, required: true },
  remark: { type: String },
  currency: { type: String, default: "USD" }
});

export default model("Fees", FeesSchema  , "gymfee") ;
