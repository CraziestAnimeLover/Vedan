import Event from '../models/eventModel.js'; // Import only the Event model

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();  // Use Event.find() to get all events
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);  // Use Event.findById()
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new event
export const addEvent = async (req, res) => {
  const { title, date, location, mapLink, description, image } = req.body;

  const newEvent = new Event({
    title,
    date,
    location,
    mapLink,
    description,
    image,
  });

  try {
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Use Event.findByIdAndUpdate()
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);  // Use Event.findByIdAndDelete()
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
};
