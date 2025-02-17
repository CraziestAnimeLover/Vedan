// models/SearchQuery.js
import mongoose from 'mongoose';

const SearchQuerySchema = new mongoose.Schema({
  libraryZone: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  tentativeDate: {
    type: Date,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const SearchQuery = mongoose.model('SearchQuery', SearchQuerySchema);

export default SearchQuery;
