import express from 'express';
import { deleteBlogById, getAllBlogs, getById, saveBlog, updateBlog } from '../controllers/blog.controller';

const router = express.Router();

router.post('/', saveBlog);
router.get('/', getAllBlogs);
router.get('/:id', getById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlogById);

export default router;