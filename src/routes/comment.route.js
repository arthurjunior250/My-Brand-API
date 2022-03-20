import express from 'express';
import { deleteComment, saveComment, getAllComments,getSingleComment } from '../controllers/comment.controller';
import { checkUser, checkAdmin } from "../middleware/check";
const router = express.Router();

router.post("/:id/comment", checkUser, saveComment);
router.get("/:id/comment", getAllComments);
router.delete("/comment/:id", checkUser, deleteComment);
router.get("/comment/:id", getSingleComment);

export default router;