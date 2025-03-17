import mongoose from "mongoose";

const financialDataSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Revenue", "Profit", "Net Worth"],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const FinancialData = mongoose.model("FinancialData", financialDataSchema);

export default FinancialData;
