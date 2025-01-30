import { Router } from 'express';
const router = Router();
import eventController from '../controllers/eventController.js';


// Get all events
router.get('/', eventController.getEvents);

// Get a single event by ID
router.get('/:id', eventController.getEventById);

// Add a new event
router.post('/', eventController.addEvent);

// Update an event by ID
router.put('/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/:id', eventController.deleteEvent);

export default router;
