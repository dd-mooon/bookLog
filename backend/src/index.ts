import 'dotenv/config';

import { createApp } from './app';
import { env } from './config/env';

const app = createApp();

app.listen(env.port, () => {
  console.log(`🚀 Book Log API: http://localhost:${env.port}`);
  console.log(`📚 Swagger: http://localhost:${env.port}/api-docs`);
});
