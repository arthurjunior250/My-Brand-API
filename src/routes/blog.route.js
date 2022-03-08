import express from 'express';
import { deleteBlogById, getAllBlogs, getById, saveBlog, updateBlog } from '../controllers/blog.controller';
import { check } from "../helpers/check";
const router = express.Router();

router.post('/', check, saveBlog);
router.get('/', getAllBlogs);
router.get('/:id', getById);
router.put('/:id', check, updateBlog);
router.delete('/:id', check, deleteBlogById);

export default router;