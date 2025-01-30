import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => /\S+@\S+\.\S+/.test(value),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^\d{10}$/.test(value), // Validates 10-digit phone numbers
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: { 
      type: String, 
      enum: ['user', 'admin', 'librarian', 'recruiter', 'student'], // Add 'student' role if needed
      default: 'user' 
    },
    profile: {
      profilePhoto: {
        type: String,
        default: 'default-profile.jpg',
      },
      mobile: {
        type: String,
        required: true,
        validate: {
          validator: (value) => /^\d{10}$/.test(value), // Validate 10-digit mobile number
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
      },
      social: {
        type: [String],
        default: [],
      },
      address: {
        type: String,
        default: '',
      },
      GST: {
        type: String,
        default: '',
      },
      PAN: {
        type: String,
        default: '',
      },
      OTHERID: {
        type: String,
        default: '',
      },
      Name: {
        type: String,
        default: '',
      },
      VedanId: {
        type: String,
        default: 'Not Assigned',
      },
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const bcrypt = await import('bcrypt');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Virtual field for full name in uppercase (example)
userSchema.virtual('uppercaseFullname').get(function () {
  return this.fullname.toUpperCase();
});

export const User = mongoose.model('User', userSchema);

