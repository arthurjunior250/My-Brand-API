import express from 'express';
import { deleteComment, saveComment, getAllComments } from '../controllers/comment.controller';
import { checkUser } from "../middleware/check";
const router = express.Router();

router.post("/:id", checkUser, saveComment);
router.get("/:id", getAllComments);
router.delete("/:id", checkUser, deleteComment);

export default router;