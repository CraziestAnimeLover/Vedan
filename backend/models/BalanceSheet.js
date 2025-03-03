import { Schema, model } from "mongoose";

const balanceSheetSchema = new Schema({
  assets: [
    {
      type: { type: String, required: true },
      rupees: { type: Number, required: true },
    },
  ],
  liabilities: [
    {
      type: { type: String, required: true },
      rupees: { type: Number, required: true },
    },
  ],
  equity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("BalanceSheet", balanceSheetSchema);
