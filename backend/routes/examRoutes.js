import express from 'express';
import { getExams, getSubjectsByExam, getPostsByExam, createExam } from '../controllers/examController.js'; // Import controller functions

const router = express.Router();

// Route to fetch all exams
router.get('/exams', getExams);

// Route to fetch subjects for a specific exam
router.get('/subjects/:examId', getSubjectsByExam);

// Route to fetch posts for a specific exam
router.get('/posts/:examId', getPostsByExam);
router.post("/createExam", createExam);

export default router;
