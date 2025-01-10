// models/user.model.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['student', 'librarian'],
        required: true,
    },
    // other fields...
});

const User = mongoose.model('User', UserSchema);
export default User;
