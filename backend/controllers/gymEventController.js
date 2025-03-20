import GymEvent from "../models/gymEventModel.js";
import fs from "fs";
import path from "path";

// Create a new gym event
export const createGymEvent = async (req, res) => {
    try {
      console.log("📥 Received request body:", req.body);
      console.log("📂 Received files:", req.files);
  
      const { srNo, eventName, goal, musclePrimary, muscleSecondary, place, duration } = req.body;
  
      const descriptionFile = req.files?.description ? req.files.description[0].path : null;
      const picFile = req.files?.pic ? req.files.pic[0].path : null;
  
      if (!eventName || !goal || !place || !duration) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const newEvent = new GymEvent({
        srNo,
        eventName,
        goal,
        musclePrimary,
        muscleSecondary,
        place,
        duration,
        description: descriptionFile,
        pic: picFile,
      });
  
      await newEvent.save();
      res.status(201).json({ message: "✅ Gym event created successfully", data: newEvent });
    } catch (error) {
      console.error("❌ Error creating event:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  

// Get all gym events
export const getAllGymEvents = async (req, res) => {
  try {
    const events = await GymEvent.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single gym event by ID
export const getGymEventById = async (req, res) => {
  try {
    const event = await GymEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Gym event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a gym event
export const updateGymEvent = async (req, res) => {
  try {
    const { srNo, eventName, goal, musclePrimary, muscleSecondary, place, duration } = req.body;
    const existingEvent = await GymEvent.findById(req.params.id);
    if (!existingEvent) {
      return res.status(404).json({ message: "Gym event not found" });
    }

    // Handle file updates
    if (req.files?.description) {
      if (existingEvent.description) fs.unlinkSync(existingEvent.description);
      existingEvent.description = req.files.description[0].path;
    }

    if (req.files?.pic) {
      if (existingEvent.pic) fs.unlinkSync(existingEvent.pic);
      existingEvent.pic = req.files.pic[0].path;
    }

    existingEvent.srNo = srNo;
    existingEvent.eventName = eventName;
    existingEvent.goal = goal;
    existingEvent.musclePrimary = musclePrimary;
    existingEvent.muscleSecondary = muscleSecondary;
    existingEvent.place = place;
    existingEvent.duration = duration;

    await existingEvent.save();
    res.status(200).json({ message: "Gym event updated successfully", data: existingEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a gym event
export const deleteGymEvent = async (req, res) => {
  try {
    const event = await GymEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Gym event not found" });
    }

    // Remove associated files
    if (event.description) fs.unlinkSync(event.description);
    if (event.pic) fs.unlinkSync(event.pic);

    await event.deleteOne();
    res.status(200).json({ message: "Gym event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
