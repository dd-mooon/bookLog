import nodemailer from 'nodemailer';

import { env } from '../config/env';

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${env.frontendUrl}/verify?token=${token}`;

  if (!env.smtpHost) {
    console.log('📧 [DEV] Email verification link:', verifyUrl);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpPort === 465,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });

  await transporter.sendMail({
    from: env.smtpFrom,
    to: email,
    subject: '[Book Log] 이메일 인증',
    html: `
      <p>Book Log 가입을 환영합니다.</p>
      <p>아래 링크를 클릭해 이메일 인증을 완료해 주세요.</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
    `,
  });
}
