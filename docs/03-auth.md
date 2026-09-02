# 03. Auth — 로그인 · 회원가입

**상태:** ✅ Backend · Frontend 완료  
**선행:** [01-database](./01-database.md), [02-backend-api](./02-backend-api.md)  
**후행:** [04-posts](./04-posts.md), [06-frontend](./06-frontend.md)

---

## 과제 요구사항

### 로그인

- [x] 이메일 + 비밀번호 로그인
- [x] JWT 기반 인증
- [x] 로그in 성공 시 토큰 발급
- [x] 인증 필요 API 보호
- [x] 아이디/비밀번호 저장 (선택, localStorage)

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

- [x] `useAuthStore` (Zustand + persist)
- [x] `/login`, `/signup` 폼 submit 연동
- [x] Axios interceptor — Bearer 토큰
- [x] 401 → 로그아웃 + `/login` redirect
- [x] Header: 로그인/로그아웃 상태
- [x] 인증 필요 페이지 가드 (`/posts/write`, `/mypage` 등)
- [x] 로그인 — 아이디/비밀번호 저장 (체크박스 + localStorage)

### 아이디/비밀번호 저장 (Frontend)

| 항목 | 내용 |
| --- | --- |
| UI | `/login` — 「아이디/비밀번호 저장」 체크박스 |
| 저장 시점 | 로그인 **성공** 후, 체크된 경우에만 저장 |
| 저장 위치 | `localStorage` (`booklog-login-credentials`) |
| 저장 값 | `email`, `password` (JSON) |
| 해제 | 체크 해제 후 로그인 → 저장값 삭제 |
| 초기 로드 | 저장값 있으면 입력란 자동 채움 + 체크박스 ON |
| 구현 파일 | `LoginForm.tsx`, `utils/loginCredentials.ts`, `constants/storage.ts` |

> **Note:** 학습/데모용 편의 기능입니다. 실서비스에서는 비밀번호 평문 저장 대신 이메일만 저장하거나 브라우저 자동완성에 맡기는 것이 일반적입니다.

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
| 아이디/비밀번호 저장? | 체크 시 localStorage — 로그인 성공 후 저장, 다음 방문 시 자동 입력 |
| 토큰 전달? | Axios `Authorization: Bearer` |
| 토큰 만료? | 401 interceptor → logout |
| 이메일 인증? | UUID token + verify API + SMTP |
| 인증 페이지 제어? | Client middleware / layout guard |
