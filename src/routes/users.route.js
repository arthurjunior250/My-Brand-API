import express from 'express';
import { deleteInquiryById, getAllInquiries, deleteComment, saveInquiry, newsLetterEmail, getAllSubscribers, deleteNewsById, getblogById, getAllBlogs, saveComment, getAllComments } from '../controllers/users.controller';
import { check } from "../helpers/check";
const router = express.Router();

router.get('/blog', getAllBlogs);
router.get('/blog/:id', getblogById);
router.post('/', saveInquiry);
router.post('/newsletter', newsLetterEmail);

router.post("/comment/:id", saveComment);
router.get("/comment/:id", getAllComments);
router.delete("/comment/:id", deleteComment);

export default router;