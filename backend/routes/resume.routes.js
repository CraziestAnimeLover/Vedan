import { Router } from 'express';
const router = Router();
import { createResume, getResumes, getResumeById } from '../controllers/resume.controller.js';

router.post('/resumes', createResume);
router.get('/resumes', getResumes);
router.get('/resumes/:id', getResumeById);

export default router;
