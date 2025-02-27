import Resume from '../models/resume.model.js';

export async function createResume(req, res) {
    try {
      console.log("Incoming request body:", req.body); // Debugging: Check received data
      const resume = new Resume(req.body);
      await resume.save();
      res.status(201).json({ message: 'Resume saved successfully', resume });
    } catch (error) {
      console.error("Error while saving resume:", error); // Log the full error in the server
      res.status(500).json({ error: error.message });
    }
  }
  

export async function getResumes(req, res) {
  try {
    const resumes = await Resume.find(); // ✅ Fixed: Reference the Resume model
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getResumeById(req, res) {
  try {
    const resume = await Resume.findById(req.params.id); // ✅ Fixed: Reference the Resume model
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
