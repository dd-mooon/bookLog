# Backend — Book Log API

Express + PostgreSQL REST API

## 실행

```bash
# 1. DB (프로젝트 루트)
docker compose up -d postgres

# 2. Backend
cd backend
cp .env.example .env
npm install
npm run db:setup
npm run dev
```

- API: http://localhost:4000
- Swagger: http://localhost:4000/api-docs
- Health: http://localhost:4000/health

## API 엔드포인트

| Method | Path | Auth |
| --- | --- | --- |
| POST | `/api/auth/signup` | - |
| POST | `/api/auth/login` | - |
| GET | `/api/auth/verify/:token` | - |
| GET | `/api/auth/me` | ✅ |
| GET | `/api/posts?page&limit` | - |
| GET | `/api/posts/me/list` | ✅ |
| GET | `/api/posts/:id` | - |
| POST | `/api/posts` | ✅ |
| PATCH | `/api/posts/:id` | ✅ 본인 |
| DELETE | `/api/posts/:id` | ✅ 본인 |
| GET | `/api/posts/:id/comments` | - |
| POST | `/api/posts/:id/comments` | ✅ |
| PATCH | `/api/comments/:id` | ✅ 본인 |
| DELETE | `/api/comments/:id` | ✅ 본인 |

## 시드 계정

| email | password |
| --- | --- |
| demo@booklog.com | password123 |

## Scripts

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (watch) |
| `npm run start` | 프로덕션 실행 |
| `npm run db:setup` | migrate + seed |
