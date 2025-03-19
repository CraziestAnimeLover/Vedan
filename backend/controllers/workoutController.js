import WorkoutPlan from "../models/Workout.js";

// Get all workout plans
export async function getWorkoutPlans(req, res) {
  try {
    const plans = await find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Create a new workout plan
export async function createWorkoutPlan(req, res) {
  try {
    const { workouts } = req.body;
    if (!workouts || workouts.length === 0) {
      return res.status(400).json({ error: "Workouts cannot be empty" });
    }
    const newPlan = new WorkoutPlan({ workouts });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Update a workout plan
export async function updateWorkoutPlan(req, res) {
  try {
    const { id } = req.params;
    const { workouts } = req.body;
    const updatedPlan = await findByIdAndUpdate(
      id,
      { workouts },
      { new: true }
    );
    if (!updatedPlan) return res.status(404).json({ error: "Plan not found" });
    res.json(updatedPlan);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Delete a workout plan
export async function deleteWorkoutPlan(req, res) {
  try {
    const { id } = req.params;
    const deletedPlan = await findByIdAndDelete(id);
    if (!deletedPlan) return res.status(404).json({ error: "Plan not found" });
    res.json({ message: "Workout plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
