import express from 'express';
import { deleteInquiryById, getAllInquiries, getById, saveInquiry, updateInquiry } from '../controllers/inquiry.controller';
import { check } from "../helpers/check";
const router = express.Router();

router.post('/', saveInquiry);
router.get('/', check, getAllInquiries);
router.get('/:id', check, getById);
router.delete('/:id', check, deleteInquiryById);


export default router;