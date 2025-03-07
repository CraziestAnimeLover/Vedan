import Enquiry from "../models/GyMEnquiry.js";


// Create a new enquiry
export async function createEnquiry(req, res) {
    try {
      console.log("📥 Incoming Request Body:", req.body); // Debug log
  
      // Validate if required fields exist
      if (!req.body.name || !req.body.mobile) {
        return res.status(400).json({ message: "Name and mobile are required" });
      }
  
      // Create enquiry instance
      const enquiry = new Enquiry(req.body);
      await enquiry.save();
  
      console.log("✅ Enquiry saved:", enquiry); // Debug log
  
      res.status(201).json({ message: "Enquiry created successfully", enquiry });
    } catch (error) {
      console.error("❌ Error creating enquiry:", error.message);
      
      res.status(500).json({
        message: "Error creating enquiry",
        error: error.message || error,
      });
    }
  }
  

// Get all enquiries
export async function getAllEnquiries(req, res) {
  try {
    const enquiries = await find();
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries", error });
  }
}

// Get a single enquiry by ID
export async function getEnquiryById(req, res) {
  try {
    const enquiry = await findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiry", error });
  }
}

// Update an enquiry
export async function updateEnquiry(req, res) {
  try {
    const updatedEnquiry = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEnquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.status(200).json({ message: "Enquiry updated successfully", updatedEnquiry });
  } catch (error) {
    res.status(500).json({ message: "Error updating enquiry", error });
  }
}

// Delete an enquiry
export async function deleteEnquiry(req, res) {
  try {
    const deletedEnquiry = await findByIdAndDelete(req.params.id);
    if (!deletedEnquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enquiry", error });
  }
}
