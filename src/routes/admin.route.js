import express from 'express';
import { deleteBlogById, saveBlog, updateBlog, getAllInquiries, getInquiryById, deleteInquiryById, deleteNewsById, getAllSubscribers } from '../controllers/admin.controller';
import { checkAdmin } from "../helpers/check";
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
router.get('/query', checkAdmin, getAllInquiries);
router.get('/query/:id', checkAdmin, getInquiryById);
router.delete('/query/:id', checkAdmin, deleteInquiryById);
router.delete('/newsletter/:id', checkAdmin, deleteNewsById);
router.get('/newsletter/id', checkAdmin, getAllSubscribers);

export default router;