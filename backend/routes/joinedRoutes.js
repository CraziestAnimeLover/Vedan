// routes/joinedRoutes.js
import { Router } from 'express';
import { createJoinedMember, getJoinedMembers } from '../controllers/joinedController.js';

const router = Router();

// Route to handle creating a new joined member
router.post('/joined', createJoinedMember);

// Route to fetch all joined members (optional)
router.get('/joined', getJoinedMembers);

export default router;
