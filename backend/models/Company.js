import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  description: { type: String, required: true },
  founders: { type: [String], required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    address: { type: String, required: true },
  },
  imageUrl: { type: String },
}, { timestamps: true });

// ✅ Check if model already exists before defining it again
const Company = mongoose.models.Company || mongoose.model("Company", CompanySchema);

export default Company;
