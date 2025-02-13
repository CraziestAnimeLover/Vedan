import Exam from '../models/Exam.js';  // Path to the Exam model
import Subject from '../models/Subject.js'; // Path to the Subject model
import Post from '../models/Post.js';  // Path to the Post model

// Controller to fetch all exams
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find();  // Fetch all exams from the database
    res.json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ message: 'Error fetching exams', error });
  }
};

// Controller to fetch subjects for a specific exam
export const getSubjectsByExam = async (req, res) => {
  const { examId } = req.params;  // Get examId from request parameters
  try {
    const subjects = await Subject.find({ examId });  // Fetch subjects for the specified examId
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};

// Controller to fetch posts for a specific exam
export const getPostsByExam = async (req, res) => {
  const { examId } = req.params;  // Get examId from request parameters
  try {
    const posts = await Post.find({ examId });  // Fetch posts for the specified examId
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

export const createExam = async (req, res) => {
  try {
    const { name, notificationDate, lastDate, examSite,university } = req.body;
    const newExam = new Exam({ name, notificationDate, lastDate, examSite, university });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(500).json({ error: "Failed to add exam" });
  }
};