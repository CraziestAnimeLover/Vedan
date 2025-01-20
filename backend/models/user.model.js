import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
        enum: ['student', 'recruiter', 'librarian'], // Added librarian as an optional role
    },
    profile: {
        profilePhoto: {
            type: String,
        },
    },
    vedannId: {
        type: String, // New field for Vedann ID
        default: 'Not Assigned',
    },
});

export const User = mongoose.model('User', userSchema);
