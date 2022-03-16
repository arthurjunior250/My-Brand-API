import express from 'express';
import { deleteComment, saveComment, getAllComments } from '../controllers/comment.controller';
import { checkUser, checkAdmin } from "../middleware/check";
const router = express.Router();

router.post("/:id/comment", checkUser, saveComment);
// router.get("/:blogId/comment/:commentId", getAllComments);
// router.delete("/:id", checkAdmin, deleteComment);

export default router;