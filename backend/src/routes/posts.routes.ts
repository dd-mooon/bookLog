import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  createCommentSchema,
  createPostSchema,
  updatePostSchema,
} from '../schemas';
import * as commentsService from '../services/comments.service';
import * as postsService from '../services/posts.service';
import { sendSuccess } from '../utils/response';

export const postsRouter = Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const limit = Math.min(50, Math.max(1, Number(req.query.limit ?? 10)));
    const data = await postsService.listPosts(page, limit);
    sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
});

postsRouter.post(
  '/',
  authenticate,
  validateBody(createPostSchema),
  async (req, res, next) => {
    try {
      const post = await postsService.createPost(req.user!.userId, req.body);
      sendSuccess(res, post, '게시글이 등록되었습니다.', 201);
    } catch (error) {
      next(error);
    }
  },
);

postsRouter.get('/me/list', authenticate, async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const limit = Math.min(50, Math.max(1, Number(req.query.limit ?? 10)));
    const data = await postsService.listPostsByUser(
      req.user!.userId,
      page,
      limit,
    );
    sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
});

postsRouter.get('/:id/comments', async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const comments = await commentsService.listComments(postId);
    sendSuccess(res, comments);
  } catch (error) {
    next(error);
  }
});

postsRouter.post(
  '/:id/comments',
  authenticate,
  validateBody(createCommentSchema),
  async (req, res, next) => {
    try {
      const postId = Number(req.params.id);
      const comment = await commentsService.createComment(
        postId,
        req.user!.userId,
        req.body.content,
      );
      sendSuccess(res, comment, '댓글이 등록되었습니다.', 201);
    } catch (error) {
      next(error);
    }
  },
);

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const post = await postsService.getPostById(Number(req.params.id));
    sendSuccess(res, post);
  } catch (error) {
    next(error);
  }
});

postsRouter.patch(
  '/:id',
  authenticate,
  validateBody(updatePostSchema),
  async (req, res, next) => {
    try {
      const post = await postsService.updatePost(
        Number(req.params.id),
        req.user!.userId,
        req.body,
      );
      sendSuccess(res, post, '게시글이 수정되었습니다.');
    } catch (error) {
      next(error);
    }
  },
);

postsRouter.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await postsService.deletePost(Number(req.params.id), req.user!.userId);
    sendSuccess(res, null, '게시글이 삭제되었습니다.');
  } catch (error) {
    next(error);
  }
});
