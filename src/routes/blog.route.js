import express from 'express';
import { deleteBlogById, saveBlog, updateBlog, getAllBlogs, getblogById } from '../controllers/blog.controller';
import { checkAdmin } from "../middleware/check";
const router = express.Router();
//image
import multer from "multer";
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("invalid image file!", false);
    }
};
const uploads = multer({ storage, fileFilter });

router.post('/', checkAdmin, uploads.single("image"), saveBlog);
router.put('/:id', checkAdmin, updateBlog);
router.delete('/:id', checkAdmin, deleteBlogById);
router.get('/', getAllBlogs);
router.get('/:id', getblogById);

export default router;