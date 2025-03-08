import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductMaintenanceSchema = new Schema({
  itemName: { type: String, required: true },
  inspectionBy: { type: String, required: true },
  selectedYear: { type: String, required: true },
  selectedMonth: { type: String, required: true },
  rows: [
    {
      id: Number,
      name: String,
      days: { type: Map, of: String }, // Changed from Object
    },
  ],
  notations: [
    {
      id: Number,
      date: String,
      info: String,
    },
  ],
});

// ✅ Prevent model overwrite
const MachineMaintenance =
  mongoose.models.MachineMaintenance || model("MachineMaintenance", ProductMaintenanceSchema, "aharproductmaintenance");

export default MachineMaintenance;
