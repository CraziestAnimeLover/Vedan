import Company from "../models/Company.js";
import { singleUpload } from "../middlewares/mutler.js"; // ✅ Removed extra semicolon

export const createCompany = async (req, res) => {
    console.log("📥 Incoming Request Body:", req.body);
    console.log("📷 Incoming File:", req.file);
  
    try {
      const { name, industry, description } = req.body;
      
      // ✅ Fix potential JSON parsing errors
      let founders = [];
      let contact = {};
  
      try {
        founders = req.body.founders ? JSON.parse(req.body.founders) : [];
        contact = req.body.contact ? JSON.parse(req.body.contact) : {};
      } catch (error) {
        console.error("🚨 JSON Parsing Error:", error.message);
        return res.status(400).json({ error: "Invalid JSON format in founders or contact" });
      }
  
      // ✅ Validation: Ensure all required fields are present
      if (!name || !industry || !description || !founders.length || !contact.phone) {
        console.error("🚨 Validation Failed:", { name, industry, description, founders, contact });
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // ✅ Handle file upload (Check if an image is uploaded)
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
      // ✅ Save to database
      const newCompany = new Company({
        name,
        industry,
        description,
        founders,
        contact,
        imageUrl,
      });
  
      await newCompany.save();
      res.status(201).json({ message: "Company created successfully", company: newCompany });
    } catch (error) {
      console.error("🚨 Internal Server Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  
  
  
  
  

export async function getCompanies(req, res) {
  try {
    const companies = await Company.find(); // ✅ Added "Company"
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCompanyById(req, res) {
  try {
    const company = await Company.findById(req.params.id); // ✅ Added "Company"
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCompany(req, res) {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true }); // ✅ Added "Company"
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteCompany(req, res) {
  try {
    await Company.findByIdAndDelete(req.params.id); // ✅ Added "Company"
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ✅ Fixed upload handling
export async function uploadCertificate(req, res) {
  try {
    singleUpload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ fileUrl });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
