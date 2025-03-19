import mongoose from 'mongoose';

const gymfounderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const gymorganizationSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
    },
    opendate: {
      type: Date,
      required: true,
    },
    vedannId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    founders: [gymfounderSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const GymOrganization = mongoose.model('GymOrganization', gymorganizationSchema , 'gymmultipleorganise');

export default GymOrganization;
