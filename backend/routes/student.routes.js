// student.routes.js
import express from 'express';
import { getStudent } from '../controllers/student.controller.js'; // Controller for student fetching

const router = express.Router();

// GET student by memberId
router.get('/:memberId', getStudent);

export default router;
