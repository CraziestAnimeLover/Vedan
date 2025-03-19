import DietPlan from "../models/DietPlan.js";

// Create a new diet plan
export const createDietPlan = async (req, res) => {
    try {
      const { planName, janta, dietData } = req.body;
  
      if (!planName || !janta || !dietData) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newPlan = new DietPlan({ planName, janta, dietData });
      await newPlan.save();
  
      res.status(201).json(newPlan);
    } catch (error) {
      console.error("🔥 Error creating diet plan:", error);  // <-- Logs detailed error
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

// Get all diet plans
export const getAllDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching diet plans", error });
  }
};

// Get a single diet plan
export const getDietPlanById = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Diet plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching diet plan", error });
  }
};

// Update a diet plan
export const updateDietPlan = async (req, res) => {
  try {
    const { planName, janta, dietData } = req.body;
    const updatedPlan = await DietPlan.findByIdAndUpdate(
      req.params.id,
      { planName, janta, dietData },
      { new: true }
    );
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: "Error updating diet plan", error });
  }
};

// Delete a diet plan
export const deleteDietPlan = async (req, res) => {
  try {
    await DietPlan.findByIdAndDelete(req.params.id);
    res.json({ message: "Diet plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting diet plan", error });
  }
};
