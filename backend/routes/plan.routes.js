import express from 'express';
import MembershipPlan from '../models/MembershipPlanSchema.model.js'; // Correct path to the model

const router = express.Router();

// Endpoint to add a new plan
router.post('/', async (req, res) => {
  try {
    const { name, fee, free, affordable, standard, premium, details } = req.body;
    
    // Create a new plan using the MembershipPlan model
    const newPlan = new MembershipPlan({
      name,
      fee,
      free,
      affordable,
      standard,
      premium,
      details
    });

    // Save the new plan to the database
    await newPlan.save();
    res.status(201).json(newPlan); // Return the newly added plan
  } catch (error) {
    console.error('Error adding plan:', error);
    res.status(500).json({ message: 'Something went wrong!', success: false });
  }
});

// Endpoint to get all plans
router.get('/', async (req, res) => {
  try {
    const plans = await MembershipPlan.find(); // Fetch all plans from the database
    res.status(200).json(plans); // Return the plans
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Something went wrong!', success: false });
  }
});

export default router;
