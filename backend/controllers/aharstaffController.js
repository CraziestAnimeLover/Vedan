import Staff from "../models/AharStaff.js";

// Create a new staff member
export const createStaff = async (req, res) => {
    try {
      console.log("Received File:", req.file); // Debugging line
      console.log("Received Body:", req.body);
  
      const { name, address, dob, gender, mobile, joindate, email, experience, description } = req.body;
      const image = req.file ? req.file.filename : null;

  
      const newStaff = {
        name,
        address,
        dob,
        gender,
        mobile,
        joindate,
        email,
        experience,
        description,
        image,
      };
  
      res.status(201).json(newStaff);
    } catch (error) {
      console.error("Error adding staff:", error);
      res.status(500).json({ message: "Error adding staff", error });
    }
  };
  
  

// Get all staff members
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single staff member by ID
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update staff member
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete staff member
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
