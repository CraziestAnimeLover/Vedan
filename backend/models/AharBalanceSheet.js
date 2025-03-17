import pkg from "mongoose";
const { Schema, model, models } = pkg; // ✅ Fix for ES module

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

// ✅ Prevent OverwriteModelError
const BalanceSheet = models.BalanceSheet || model("BalanceSheet", balanceSheetSchema, "aharbalancesheet");

export default BalanceSheet;
