import express from 'express';
import { getReminders, addReminder, deleteReminder } from '../controllers/reminderController.js';

const router = express.Router();

router.get('/reminders', getReminders);
router.post('/reminders', addReminder);  // Ensure this is correct
router.delete('/reminders/:id', deleteReminder);

export default router;
