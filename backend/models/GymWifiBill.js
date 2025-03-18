// models/WifiBill.js
import { Schema, model } from "mongoose";

const GymWifiBillSchema = new Schema({
  billingFrom: { type: Date, required: true },
  billingTo: { type: Date, required: true },
  wifiPackagePrice: { type: Number, required: true },
  currency: { type: String, enum: ["USD", "EUR", "GBP", "INR", "JPY"], required: true },
  validity: { type: String, required: true },
  remark: { type: String },
  billingDate: { type: Date, required: true }
}, { timestamps: true });

export default model("GymWifiBill", GymWifiBillSchema , "gymwifibill");