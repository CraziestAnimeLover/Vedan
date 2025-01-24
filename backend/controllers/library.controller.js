import Library from '../models/library.model.js';
import { validationResult } from 'express-validator';

// Add a new library
export const addLibrary = async (req, res) => {
    const {
        pincode,
        timeSlot,
        dateJoining,
        fee,
        memberId,
        seatNumber,
        planDetails,
        status = 'Available', // Default status to 'Available'
    } = req.body;

    // Validate inputs using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create a new Library entry with all required fields
        const newLibrary = new Library({
            pincode,
            timeSlot,
            dateJoining,
            fee,
            memberId,  // Linking the student to this library
            seatNumber, // Seat allocated to the student
            planDetails, // Subscription plan details
            status, // Seat availability status
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

// Other CRUD operations (Update, Delete, etc.) can be similarly implemented.
// Update a library
export const updateLibrary = async (req, res) => {
    const { id } = req.params;
    const { pincode, timeSlot, dateJoining, fee } = req.body;

    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedLibrary = await Library.findByIdAndUpdate(id, {
            pincode,
            timeSlot,
            dateJoining,
            fee,
        }, { new: true });

        if (!updatedLibrary) {
            return res.status(404).json({ message: 'Library not found.' });
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
            return res.status(404).json({ message: 'Library not found.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Library deleted successfully.',
        });
    } catch (error) {
        console.error('Error deleting library:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting the library.',
        });
    }
};
