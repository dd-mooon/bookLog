# 03. Auth — 로그인 · 회원가입

**상태:** ✅ Backend 완료 (Frontend 미연동)  
**선행:** [01-database](./01-database.md), [02-backend-api](./02-backend-api.md)  
**후행:** [04-posts](./04-posts.md), [06-frontend](./06-frontend.md)

---

## 과제 요구사항

### 로그인

- [ ] 이메일 + 비밀번호 로그인
- [ ] JWT 기반 인증
- [ ] 로그in 성공 시 토큰 발급
- [ ] 인증 필요 API 보호

### 회원가입

- [ ] 이메일 중복 검사
- [ ] 이메일 인증
- [ ] bcrypt 비밀번호 암호화
- [ ] 기본 사용자 정보 저장

---

## API 명세

### POST `/api/auth/signup`

**Request**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "독서러"
}
```

**Response** `201`

```json
{
  "data": { "id": 1, "email": "user@example.com", "nickname": "독서러" },
  "message": "가입 완료. 이메일을 확인해 주세요."
}
```

**Errors:** 409 (이메일 중복), 400 (validation)

---

### POST `/api/auth/login`

**Request**

```json
{ "email": "user@example.com", "password": "password123" }
```

**Response** `200`

```json
{
  "data": {
    "token": "eyJhbG...",
    "user": { "id": 1, "email": "...", "nickname": "..." }
  }
}
```

**Errors:** 401 (인증 실패), 403 (이메일 미인증)

---

### GET `/api/auth/verify/:token`

- verification_token 검증 → `is_verified = true`

---

### GET `/api/auth/me`

- Header: `Authorization: Bearer <token>`
- 현재 로그인 사용자 정보 반환

---

## Backend 작업

- [ ] bcrypt 해싱 (rounds 10+)
- [ ] JWT sign / verify (`jsonwebtoken`)
- [ ] signup: 중복 체크 + token 생성 + 메일 발송
- [ ] login: 비밀번호 compare + JWT 발급
- [ ] verify: 토큰 일치 시 is_verified 업데이트
- [ ] auth middleware

## Frontend 작업

→ 상세: [06-frontend.md](./06-frontend.md)

- [ ] `useAuthStore` (Zustand + persist)
- [ ] `/login`, `/signup` 폼 submit 연동
- [ ] Axios interceptor — Bearer 토큰
- [ ] 401 → 로그아웃 + `/login` redirect
- [ ] Header: 로그인/로그아웃 상태
- [ ] 인증 필요 페이지 가드 (`/posts/write`, `/mypage` 등)

---

## 이메일 인증 전략

| 단계 | 구현 |
| --- | --- |
| 1 | 가입 시 `verification_token` (uuid) DB 저장 |
| 2 | `{FRONTEND_URL}/verify?token=xxx` 링크 메일 발송 |
| 3 | Frontend verify 페이지 → API 호출 |
| 4 | `is_verified = true` 후 로그인 허용 |

**SMTP:** Gmail App Password / SendGrid / Ethereal(테스트)

---

## 평가 질문 대비

| 질문 | 답변 포인트 |
| --- | --- |
| 로그in 상태 어디에? | Zustand + localStorage persist |
| 새로고침 시 유지? | persist rehydrate + `/auth/me` 검증 |
| 토큰 전달? | Axios `Authorization: Bearer` |
| 토큰 만료? | 401 interceptor → logout |
| 이메일 인증? | UUID token + verify API + SMTP |
| 인증 페이지 제어? | Client middleware / layout guard |
