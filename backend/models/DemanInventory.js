import { Schema, model } from "mongoose";

const inventorySchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: String, required: true },
  items: [
    {
      category: { type: String, required: true },
      company: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      remark: { type: String },
    },
  ],
});

export default model("Inventory", inventorySchema , "demandinventory");
