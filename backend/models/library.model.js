import mongoose from 'mongoose';

const LibrarySchema = new mongoose.Schema({
    pincode: {
        type: String,
        required: true,
    },
    timeSlot: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
        required: true,
    },
    dateJoining: {
        type: Date,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
});

const Library = mongoose.model('Library', LibrarySchema);
export default Library;
