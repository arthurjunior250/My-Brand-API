import express from 'express';
import { deleteInquiryById, getAllInquiries, getById, saveInquiry, updateInquiry } from '../controllers/inquiry.controller';

const router = express.Router();

router.post('/', saveInquiry);
router.get('/', getAllInquiries);
router.get('/:id', getById);
router.put('/:id', updateInquiry);
router.delete('/:id', deleteInquiryById);

export default router;