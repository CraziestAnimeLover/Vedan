import { Schema, model } from "mongoose";

const MaterialSchema = new Schema({
  lostLocation: {
    type: String,
    required: true,
    trim: true,
  },
  lostDate: {
    type: Date,
    required: true,
  },
  lostTime: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  diameter: {
    type: Number,
    required: true,
  },
  materialType: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // Stores the file path or URL
    required: false,
  },
  brandName: {
    type: String,
    trim: true,
  },
  taxNumber: {
    type: String,
    trim: true,
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10,15}$/, "Phone number must be between 10-15 digits"],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model("Material", MaterialSchema);
