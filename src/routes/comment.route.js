import express from 'express';
import { deleteComment, saveComment, getAllComments } from '../controllers/comment.controller';
import { checkUser } from "../middleware/check";
const router = express.Router();

router.post("/:id", saveComment);
router.get("/:id", getAllComments);
router.delete("/:id", deleteComment);

export default router;