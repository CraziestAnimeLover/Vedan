import mongoose from 'mongoose';

// Define the schema for fee data
const feeDataSchema = new mongoose.Schema({
    month: { type: String, required: true },
    data: {
        Enquiry: { type: String, required: true },
        Applied: { type: String, required: true },
        Learning: { type: String, required: true },
        FeesCovered: { type: String, required: true },
        LeftFees: { type: String, required: true },
        P_L: { type: Number, required: true, default: 0 },
    },
});

// Create and export the model using the schema
const FeeData = mongoose.model('FeeData', feeDataSchema);

export default FeeData;
