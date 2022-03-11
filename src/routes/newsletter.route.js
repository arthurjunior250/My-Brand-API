import express from 'express';
import { newsLetterEmail, deleteNewsById, getAllSubscribers } from '../controllers/newsletter.controller';
import { checkAdmin } from "../middleware/check";
const router = express.Router();

router.post('/', newsLetterEmail);
router.delete('/:id', checkAdmin, deleteNewsById);
router.get('/', checkAdmin, getAllSubscribers);
export default router;