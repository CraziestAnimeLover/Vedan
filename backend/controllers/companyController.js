import Company from "../models/Company.js";
import { singleUpload } from "../middlewares/mutler.js"; // ✅ Removed extra semicolon


export const createCompany = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // ✅ Debug userId

    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const newCompany = new Company(req.body);
    await newCompany.save();

    res.status(201).json({ message: "Company created successfully!" });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: error.message });
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
