import mongoose from 'mongoose';

const founderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const organizationSchema = new mongoose.Schema(
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
    founders: [founderSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Organization = mongoose.model('Organization', organizationSchema , 'aharmultipleorganise');

export default Organization;
