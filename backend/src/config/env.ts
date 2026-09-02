function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: requireEnv('DATABASE_URL'),
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpiresIn: optionalEnv('JWT_EXPIRES_IN', '7d'),
  frontendUrl: optionalEnv('FRONTEND_URL', 'http://localhost:3000'),
  smtpHost: optionalEnv('SMTP_HOST'),
  smtpPort: Number(optionalEnv('SMTP_PORT', '587')),
  smtpUser: optionalEnv('SMTP_USER'),
  smtpPass: optionalEnv('SMTP_PASS'),
  smtpFrom: optionalEnv('SMTP_FROM', 'noreply@booklog.com'),
};
