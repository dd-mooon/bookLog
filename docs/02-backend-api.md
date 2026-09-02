# 02. Backend · API · Swagger

**상태:** ⬜ 미착수  
**선행:** [01-database](./01-database.md)  
**후행:** [03-auth](./03-auth.md), [04-posts](./04-posts.md), [05-comments](./05-comments.md)

---

## 과제 요구사항

- [ ] Node.js (Express) 백엔드
- [ ] REST API
- [ ] Swagger API 문서
- [ ] 인증 처리 · DB 접근 · 비즈니스 로직

---

## 프로젝트 구조 (목표)

```text
backend/
  src/
    index.ts              # 앱 진입점
    app.ts                # Express 설정
    config/
      env.ts
      swagger.ts
    db/
      pool.ts
      schema.sql
    middleware/
      auth.ts             # JWT 검증
      errorHandler.ts
    routes/
      auth.routes.ts
      posts.routes.ts
      comments.routes.ts
    controllers/
    services/
    types/
  package.json
  tsconfig.json
  Dockerfile
```

---

## API 엔드포인트 요약

| Method | Path | Auth | 문서 |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | - | [03-auth](./03-auth.md) |
| POST | `/api/auth/login` | - | [03-auth](./03-auth.md) |
| GET | `/api/auth/verify/:token` | - | [03-auth](./03-auth.md) |
| GET | `/api/auth/me` | ✅ | [03-auth](./03-auth.md) |
| GET | `/api/posts` | - | [04-posts](./04-posts.md) |
| GET | `/api/posts/:id` | - | [04-posts](./04-posts.md) |
| POST | `/api/posts` | ✅ | [04-posts](./04-posts.md) |
| PATCH | `/api/posts/:id` | ✅ (본인) | [04-posts](./04-posts.md) |
| DELETE | `/api/posts/:id` | ✅ (본인) | [04-posts](./04-posts.md) |
| GET | `/api/posts/:id/comments` | - | [05-comments](./05-comments.md) |
| POST | `/api/posts/:id/comments` | ✅ | [05-comments](./05-comments.md) |
| PATCH | `/api/comments/:id` | ✅ (본인) | [05-comments](./05-comments.md) |
| DELETE | `/api/comments/:id` | ✅ (본인) | [05-comments](./05-comments.md) |

---

## 작업 체크리스트

### 프로젝트 초기화

- [ ] `backend/` 폴더 생성
- [ ] Express + TypeScript + ts-node-dev
- [ ] `pg` (node-postgres) 연결
- [ ] CORS (Frontend origin 허용)
- [ ] 공통 응답 형식 `{ data, message }`
- [ ] 전역 에러 핸들러

### Swagger

- [ ] `swagger-ui-express` + `swagger-jsdoc` 설치
- [ ] `/api-docs` 경로 제공
- [ ] 각 route에 JSDoc 주석
- [ ] Bearer JWT security scheme 정의

### 공통 미들웨어

- [ ] `authenticate` — Authorization Bearer 검증
- [ ] `optionalAuth` (선택)
- [ ] 요청 validation (zod 또는 express-validator)

---

## 환경 변수

```env
PORT=4000
DATABASE_URL=postgresql://user:pass@localhost:5432/booklog
JWT_SECRET=your-secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

---

## 공통 응답 형식

```json
// 성공
{ "data": {}, "message": "ok" }

// 에러
{ "message": "에러 메시지", "statusCode": 400 }
```

---

## 평가 질문 대비

> **JWT 토큰에는 어떤 정보를 포함하셨나요?**

- `sub` 또는 `userId`, `email` (민감 정보·비밀번호 제외)
- `iat`, `exp` — 만료 처리
