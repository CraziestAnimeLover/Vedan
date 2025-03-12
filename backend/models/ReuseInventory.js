import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const InventorySchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    pic: { type: String }, // Store file path or URL
    category: { type: String, required: true, trim: true },
    expireDate: { type: Date },
    price: { type: Number, required: true, min: 0 },
    manufacturing: { type: String, trim: true },
    quantityNumber: { type: Number, default: 0, min: 0 },
    quantityKgL: { type: Number, default: 0, min: 0 },
    offer: { type: Number, default: 0, min: 0, max: 100 }, // Offer in percentage
    description: { type: String }, // Store file path or URL
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ✅ Virtual field for total calculation (computed dynamically)
InventorySchema.virtual('total').get(function () {
  return this.price * (this.quantityNumber + this.quantityKgL);
});

const Inventory = models.Inventory || model('Inventory', InventorySchema, "reuse");

export default Inventory;
