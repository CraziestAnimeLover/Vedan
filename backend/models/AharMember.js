import mongoose from "mongoose";

const AharMemberSchema = new mongoose.Schema({
  memberId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  caseOf: { type: String },
  remarks: { type: String },
  document: { type: String, default: "today plan" },
  joinDate: { type: Date, required: true },
  profileImage: { type: String }, // Storing image URL
});

const AharMember = mongoose.model("AharMember", AharMemberSchema);
export default AharMember;
