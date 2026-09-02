import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth.routes';
import { commentsRouter } from './routes/comments.routes';
import { postsRouter } from './routes/posts.routes';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.frontendUrl,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req, res) => {
    res.json(swaggerSpec);
  });

  app.use('/api/auth', authRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/comments', commentsRouter);

  app.use(errorHandler);

  return app;
}
