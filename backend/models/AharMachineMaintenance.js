import { Schema, model } from "mongoose";

const MachineMaintenanceSchema = new Schema({
  itemName: { type: String, required: true },
  inspectionBy: { type: String, required: true },
  selectedYear: { type: String, required: true },
  selectedMonth: { type: String, required: true },
  rows: [
    {
      id: Number,
      name: String,
      days: Object, // Stores the status for each day
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

export default model("MachineMaintenance", MachineMaintenanceSchema,"aharmachinemantanice");
