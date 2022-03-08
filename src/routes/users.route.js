import express from 'express';
import { deleteInquiryById, getAllInquiries, getById, saveInquiry, newsLetterEmail, getAllSubscribers, deleteNewsById, getblogById, getAllBlogs } from '../controllers/users.controller';
import { check } from "../helpers/check";
const router = express.Router();
router.get('/blog', getAllBlogs);
router.get('/blog/:id', getblogById);
router.post('/', saveInquiry);
router.post('/newsletter', newsLetterEmail);

export default router;