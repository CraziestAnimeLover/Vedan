// controllers/reminderController.js

import Reminder from '../models/Reminder.js';

// Get all reminders
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reminders', error: err.message });
  }
};

// Add a new reminder
export const addReminder = async (req, res) => {
    const { serialNo, ringTime, remark } = req.body;
    try {
      const newReminder = new Reminder({ serialNo, ringTime, remark });
      await newReminder.save();
      res.status(201).json(newReminder);
    } catch (err) {
      res.status(500).json({ message: 'Error adding reminder', error: err.message });
    }
  };
  

// Delete a reminder by ID
export const deleteReminder = async (req, res) => {
  const { id } = req.params;
  try {
    const reminder = await Reminder.findByIdAndDelete(id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting reminder', error: err.message });
  }
};
