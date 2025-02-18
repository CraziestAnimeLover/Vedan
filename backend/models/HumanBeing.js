import mongoose from "mongoose";

const humanSchema = new mongoose.Schema({
  lostLocation: { type: String, required: true },
  lostDate: { type: Date, required: true },
  lostTime: { type: String, required: true },
  
  // Biometric Details
  skinColor: { type: String, required: true },
  hairColor: { type: String, required: true },
  eyeColor: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },

  // Social Details
  name: { type: String, required: true },
  image: { type: String }, // URL to uploaded image
  address: { type: String, required: true },
  profession: { type: String, required: true },


  // Guardian Details
  guardianName: { type: String, required: true },
  guardianPhone: { type: String, required: true },
  guardianAddress: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("HumanBeing", humanSchema);