import mongoose from "mongoose";

const aharwaterbillSchema = new mongoose.Schema({
  type: { type: String, enum: ["bottle", "bill"], required: true },
  date: { type: Date, required: function () { return this.type === "bottle"; } }, // Only for bottles
  billingDate: { type: Date, required: function () { return this.type === "bill"; } }, // Only for bills
  quantity: { type: Number },
  amount: { type: Number },
  fromTime: { type: String },
  toTime: { type: String },
  remarks: { type: String },
  currency: { type: String, default: "USD" }
});

export default mongoose.model("aharwaterbill", aharwaterbillSchema, "aharwaterbill");
