import express from 'express';
import {checkAdmin} from '../middleware/check';
import { login, signup, userProfile,deleteuserById,getAllusers,updateProfile } from '../controllers/authentication.controller';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user-profile', userProfile);
router.delete('/:id', checkAdmin, deleteuserById);
router.get('/',checkAdmin,getAllusers);
router.put("/:id",updateProfile);
export default router;