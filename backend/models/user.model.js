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
        required: false,  // Make this optional
        enum: ['student', 'recruiter'], // You can still limit to certain roles if needed
    },
    profile: {
        profilePhoto: {
            type: String,
        },
        profileNumber: {
            type: String,  // You can change the type based on your requirements
        },
        handlerName: {
            type: String,
        },
    },
});

// Export User model
export const User = mongoose.model('User', userSchema);
