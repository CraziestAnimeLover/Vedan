// controllers/searchController.js
import SearchQuery from '../models/SearchQuery.js';

// Handle search query submission
export const createSearchQuery = async (req, res) => {
  try {
    const { libraryZone, pincode, timeSlot, tentativeDate, fees } = req.body;

    const newSearchQuery = new SearchQuery({
      libraryZone,
      pincode,
      timeSlot,
      tentativeDate,
      fees,
    });

    await newSearchQuery.save();
    return res.status(201).json({ message: 'Search query saved successfully', data: newSearchQuery });
  } catch (error) {
    return res.status(500).json({ message: 'Error saving search query', error });
  }
};

// Optionally, add other methods for retrieving or filtering search queries
export const getSearchQueries = async (req, res) => {
  try {
    const queries = await SearchQuery.find();
    return res.status(200).json(queries);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching search queries', error });
  }
};
