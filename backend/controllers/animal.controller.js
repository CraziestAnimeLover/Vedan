import Animal from "../models/Animal.js";



export const createAnimal = async (req, res) => {
    try {
      console.log("Received Body:", req.body);
      console.log("Received File:", req.file);
  
      // Validate required fields
      if (!req.body.name || !req.body.lostLocation) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Store the image file path instead of Base64
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save only path
  
      // Create a new Animal document
      const newAnimal = new Animal({
        lostLocation: req.body.lostLocation,
        lostDate: req.body.lostDate,
        lostTime: req.body.lostTime,
        kingdom: req.body.kingdom,
        phylum: req.body.phylum,
        class: req.body.class,
        order: req.body.order,
        family: req.body.family,
        bodyColor: req.body.bodyColor,
        eyeColor: req.body.eyeColor,
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        gender: req.body.gender,
        name: req.body.name,
        address: req.body.address,
        guardianName: req.body.guardianName,
        guardianPhone: req.body.guardianPhone,
        guardianAddress: req.body.guardianAddress,
        image: imagePath, // Save the path instead of Base64
      });
  
      // Save to MongoDB
      await newAnimal.save();
  
      return res.status(201).json({
        message: "Animal created successfully",
        animal: newAnimal,
      });
    } catch (error) {
      console.error("Error saving to database:", error);
      return res.status(500).json({ message: "Database error" });
    }
  };
  

  
  
  
  
// Get all lost animals
export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json({ success: true, animals });
  } catch (error) {
    console.error("Error in getAnimals:", error.message);
    res.status(500).json({ success: false, message: "Server error! Unable to fetch animals." });
  }
};

// Get a specific lost animal by ID
export const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ success: false, message: "Animal not found" });

    res.status(200).json({ success: true, animal });
  } catch (error) {
    console.error("Error in getAnimalById:", error.message);
    res.status(500).json({ success: false, message: "Server error! Unable to fetch animal." });
  }
};

// Update an animal entry
export const updateAnimal = async (req, res) => {
  try {
    const { name, species, color } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { name, species, color };
    if (imageUrl) updatedData.imageUrl = imageUrl;

    const animal = await Animal.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!animal) return res.status(404).json({ success: false, message: "Animal not found" });

    res.status(200).json({ success: true, message: "Animal details updated!", animal });
  } catch (error) {
    console.error("Error in updateAnimal:", error.message);
    res.status(500).json({ success: false, message: "Server error! Unable to update animal." });
  }
};

// Delete an animal entry
export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ success: false, message: "Animal not found" });

    res.status(200).json({ success: true, message: "Animal entry deleted!" });
  } catch (error) {
    console.error("Error in deleteAnimal:", error.message);
    res.status(500).json({ success: false, message: "Server error! Unable to delete animal." });
  }
};
