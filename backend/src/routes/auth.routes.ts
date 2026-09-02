import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { loginSchema, signupSchema } from '../schemas';
import * as authService from '../services/auth.service';
import { sendSuccess } from '../utils/response';

export const authRouter = Router();

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, nickname]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               nickname: { type: string }
 *     responses:
 *       201:
 *         description: Created
 */
authRouter.post('/signup', validateBody(signupSchema), async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    sendSuccess(res, user, '가입 완료. 이메일을 확인해 주세요.', 201);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: 로그인
 */
authRouter.post('/login', validateBody(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    sendSuccess(res, result, '로그인 성공');
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/auth/verify/{token}:
 *   get:
 *     tags: [Auth]
 *     summary: 이메일 인증
 */
authRouter.get('/verify/:token', async (req, res, next) => {
  try {
    const user = await authService.verifyEmail(req.params.token);
    sendSuccess(res, user, '이메일 인증이 완료되었습니다.');
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: 내 정보
 *     security:
 *       - bearerAuth: []
 */
authRouter.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user!.userId);
    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
});
