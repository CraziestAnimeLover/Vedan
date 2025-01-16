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
