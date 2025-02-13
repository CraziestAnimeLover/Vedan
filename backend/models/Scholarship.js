import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  field: { type: String, required: true },
  link: { type: String, required: true }
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
export default Scholarship;
