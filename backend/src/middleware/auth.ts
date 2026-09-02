import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/errors';
import { verifyToken } from '../utils/jwt';

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('인증이 필요합니다.', 401));
  }

  try {
    const token = header.slice(7);
    req.user = verifyToken(token);
    return next();
  } catch {
    return next(new AppError('유효하지 않거나 만료된 토큰입니다.', 401));
  }
}
