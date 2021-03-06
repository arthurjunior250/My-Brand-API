import express from 'express';
import { deleteInquiryById, getAllInquiries, saveInquiry, getInquiryById } from '../controllers/inquiry.controller';
import { checkAdmin } from "../middleware/check";
const router = express.Router();

router.post('/', saveInquiry);
router.get('/', checkAdmin, getAllInquiries);
router.get('/:id', checkAdmin, getInquiryById);
router.delete('/:id', checkAdmin, deleteInquiryById);

export default router;