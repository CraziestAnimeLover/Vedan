import Exercise from "../models/GymExercise.js";

// Create a new exercise
export async function createExercise(req, res) {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json({ message: "Exercise added successfully", exercise });
  } catch (error) {
    res.status(500).json({ message: "Error adding exercise", error });
  }
}

// Get all exercises
export async function getAllExercises(req, res) {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises", error });
  }
}

// Get exercise by ID
export async function getExerciseById(req, res) {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercise", error });
  }
}

// Update exercise
export async function updateExercise(req, res) {
    try {
      // Extract fields from request
      const { name, set, rep, focusArea, equipment } = req.body;
      const updatedFields = { name, set, rep, focusArea, equipment };
  
      // Check if a new file was uploaded
      if (req.file) {
        updatedFields.image = req.file.filename; // Store the image filename
      }
  
      // Update the exercise in MongoDB
      const exercise = await Exercise.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
  
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
  
      res.status(200).json({ message: "Exercise updated successfully", exercise });
    } catch (error) {
      console.error("Error updating exercise:", error);
      res.status(500).json({ message: "Error updating exercise", error });
    }
  }
  

// Delete exercise
export async function deleteExercise(req, res) {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exercise", error });
  }
}
