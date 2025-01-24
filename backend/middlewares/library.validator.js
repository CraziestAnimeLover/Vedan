import { body } from 'express-validator';

// Validation middleware for library data
export const validateLibrary = [
    body('pincode').isString().withMessage('Pincode must be a string').notEmpty().withMessage('Pincode is required'),
    body('timeSlot').isIn(['Morning', 'Afternoon', 'Evening', 'Night']).withMessage('Invalid time slot').notEmpty().withMessage('Time slot is required'),
    body('dateJoining').isISO8601().withMessage('Invalid date format').notEmpty().withMessage('Joining date is required'),
    body('fee').isNumeric().withMessage('Fee must be a number').notEmpty().withMessage('Fee is required'),
    body('memberId').isMongoId().withMessage('Invalid member ID').optional(),
    body('seatNumber').isNumeric().withMessage('Seat number must be a number').optional(),
    body('planDetails').isString().optional(),
    body('status').isIn(['Available', 'Occupied']).optional(),
];
