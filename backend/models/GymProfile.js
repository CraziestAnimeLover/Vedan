import { Schema, model } from "mongoose";

const taxSchema = new Schema({
  tax: { type: String, required: true },
  taxNo: { type: String, required: true },
});

const gymProfileSchema = new Schema({
  vedanId: { type: String, required: true },
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  mainAddress: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String }, // Store image URL
  branchId: { type: String, required: true },
  branchname: { type: String, required: true },
  gymId: { type: String, required: true },
  founder: { type: String, required: true },
  address: { type: String, required: true },
  taxes: [taxSchema],
});

const GymProfile = model("GymProfile", gymProfileSchema);
export default GymProfile;
