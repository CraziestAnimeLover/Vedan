// controllers/library.controller.js
import Library from '../models/library.model.js'; 
import { validationResult } from 'express-validator'; 

// Add a new library
export const addLibrary = async (req, res) => {
    const { pincode, timeSlot, dateJoining, fee } = req.body;

    // Validate inputs using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create new library document in the database
        const newLibrary = new Library({
            pincode,
            timeSlot,
            dateJoining,
            fee,
        });

        // Save the new library document to the database
        await newLibrary.save();

        return res.status(201).json({
            success: true,
            message: 'Library added successfully!',
            library: newLibrary,
        });
    } catch (error) {
        console.error('Error adding library:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while adding the library.',
        });
    }
};

// Get list of all libraries
export const getLibraries = async (req, res) => {
    try {
        const libraries = await Library.find(); 
        return res.status(200).json({
            success: true,
            libraries,
        });
    } catch (error) {
        console.error('Error fetching libraries:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching libraries.',
        });
    }
};

// Get a specific library by ID
export const getLibraryById = async (req, res) => {
    const { id } = req.params; 

    try {
        const library = await Library.findById(id); 

        if (!library) {
            return res.status(404).json({
                success: false,
                message: 'Library not found.',
            });
        }

        return res.status(200).json({
            success: true,
            library,
        });
    } catch (error) {
        console.error('Error fetching library:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching the library.',
        });
    }
};

// Update a library's details
export const updateLibrary = async (req, res) => {
    const { id } = req.params; 
    const { pincode, timeSlot, dateJoining, fee } = req.body;

    try {
        const updatedLibrary = await Library.findByIdAndUpdate(
            id,
            { pincode, timeSlot, dateJoining, fee },
            { new: true }
        );

        if (!updatedLibrary) {
            return res.status(404).json({
                success: false,
                message: 'Library not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Library updated successfully!',
            library: updatedLibrary,
        });
    } catch (error) {
        console.error('Error updating library:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating the library.',
        });
    }
};

// Delete a library
export const deleteLibrary = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedLibrary = await Library.findByIdAndDelete(id);

        if (!deletedLibrary) {
            return res.status(404).json({
                success: false,
                message: 'Library not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Library deleted successfully!',
        });
    } catch (error) {
        console.error('Error deleting library:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting the library.',
        });
    }
};

export const addLibrary = async (req, res) => {
    const { pincode, timeSlot, dateJoining, fee } = req.body;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newLibrary = new Library({
            pincode,
            timeSlot,
            dateJoining,
            fee,
        });

        await newLibrary.save();

        return res.status(201).json({
            success: true,
            message: 'Library added successfully!',
            library: newLibrary,
        });
    } catch (error) {
        console.error('Error adding library:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while adding the library.',
        });
    }
};

// Get list of all libraries
export const getLibraries = async (req, res) => {
    try {
        const libraries = await Library.find(); // Fetch all libraries from DB
        return res.status(200).json({
            success: true,
            libraries,
        });
    } catch (error) {
        console.error('Error fetching libraries:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching libraries.',
        });
    }
};

// Search for libraries based on a term
export const searchLibrary = async (req, res) => {
    const { searchTerm } = req.body;  // Expecting search term in the request body

    try {
        const libraries = await Library.find({
            $or: [
                { pincode: { $regex: searchTerm, $options: 'i' } },
                { fee: { $regex: searchTerm, $options: 'i' } },
                // Add other fields to search based on your model structure
            ],
        });

        return res.status(200).json({
            success: true,
            libraries,
        });
    } catch (error) {
        console.error('Error searching for library:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while searching for the library.',
        });
    }
};

