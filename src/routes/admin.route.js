import express from 'express';
import { deleteBlogById, saveBlog, updateBlog, getAllInquiries, getInquiryById, deleteInquiryById, deleteNewsById, getAllSubscribers } from '../controllers/admin.controller';
import { checkAdmin } from "../helpers/check";
const router = express.Router();

router.post('/', checkAdmin, saveBlog);
router.put('/:id', checkAdmin, updateBlog);
router.delete('/:id', checkAdmin, deleteBlogById);
router.get('/query', checkAdmin, getAllInquiries);
router.get('/query/:id', checkAdmin, getInquiryById);
router.delete('/query/:id', checkAdmin, deleteInquiryById);
router.delete('/newsletter/:id', checkAdmin, deleteNewsById);
router.get('/newsletter/id', checkAdmin, getAllSubscribers);

export default router;