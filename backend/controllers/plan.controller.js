// plan.controller.js

const plans = [];

export const addPlan = (req, res) => {
  const { name, fee, details } = req.body;
  if (!name || !fee || !details) {
    return res.status(400).json({ message: 'Name, fee, and details are required' });
  }

  const newPlan = { name, fee, details };
  plans.push(newPlan);

  res.status(201).json({ message: 'Plan added successfully', plan: newPlan });
};

export const getPlans = (req, res) => {
  res.status(200).json(plans);
};
