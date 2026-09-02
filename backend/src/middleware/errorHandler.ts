import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../utils/errors';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  if (error instanceof ZodError) {
    const message = error.errors.map((item) => item.message).join(', ');
    return res.status(400).json({ message, statusCode: 400 });
  }

  console.error(error);
  return res.status(500).json({
    message: '서버 오류가 발생했습니다.',
    statusCode: 500,
  });
}
