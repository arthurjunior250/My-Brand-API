import express from 'express';
import { deleteBlogById, saveBlog, updateBlog, getAllInquiries, getInquiryById, deleteInquiryById, deleteNewsById, getAllSubscribers } from '../controllers/admin.controller';
import { check } from "../helpers/check";
const router = express.Router();

router.post('/', check, saveBlog);
router.put('/:id', check, updateBlog);
router.delete('/:id', check, deleteBlogById);
router.get('/query', check, getAllInquiries);
router.get('/query/:id', check, getInquiryById);
router.delete('/query/:id', check, deleteInquiryById);
router.delete('/newsletter/:id', check, deleteNewsById);
router.get('/newsletter/id', check, getAllSubscribers);

export default router;