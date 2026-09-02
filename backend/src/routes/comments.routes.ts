import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { updateCommentSchema } from '../schemas';
import * as commentsService from '../services/comments.service';
import { sendSuccess } from '../utils/response';

export const commentsRouter = Router();

commentsRouter.patch(
  '/:id',
  authenticate,
  validateBody(updateCommentSchema),
  async (req, res, next) => {
    try {
      const comment = await commentsService.updateComment(
        Number(req.params.id),
        req.user!.userId,
        req.body.content,
      );
      sendSuccess(res, comment, '댓글이 수정되었습니다.');
    } catch (error) {
      next(error);
    }
  },
);

commentsRouter.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await commentsService.deleteComment(Number(req.params.id), req.user!.userId);
    sendSuccess(res, null, '댓글이 삭제되었습니다.');
  } catch (error) {
    next(error);
  }
});
