import express from 'express';
import { getAttendance, getAttendanceById, addAttendance,  updateAttendance, deleteAttendance } from '../controllers/aharsmpurnattendanceController.js';

const router = express.Router();

// Define the routes
router.get('/aharattendance', getAttendance); // Get all attendance records
router.get('/aharattendance/:id', getAttendanceById); // Get a single attendance by ID
router.post('/aharattendance', addAttendance); // Add new attendance record
router.put('/aharattendance/:id', updateAttendance); // Update attendance record by ID

router.delete('/aharattendance/:id', deleteAttendance); // Delete an attendance record

export default router;
