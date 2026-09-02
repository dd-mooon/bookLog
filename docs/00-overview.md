# 00. 전체 개요

## 프로젝트

- **서비스명:** Book Log
- **목적:** 독서 기록 게시판 + 로그인 기반 CRUD
- **과제:** Frontend to FullStack — Build & Understand (2026 하반기)

## 현재까지 완료된 것

### Frontend (약 40%)

- [x] Next.js 15 + TypeScript + App Router + Tailwind
- [x] Zustand · Axios · ESLint · Prettier 세팅
- [x] 실무형 `src/` 폴더 구조
- [x] Header / Footer / MainLayout (반응형)
- [x] 페이지 UI 골격
  - `/`, `/login`, `/signup`
  - `/posts`, `/posts/[id]`, `/posts/write`, `/posts/edit/[id]`
  - `/mypage`
- [x] UI 컴포넌트: Button, Input, Textarea, EmptyState
- [x] GitHub: https://github.com/dd-mooon/bookLog

### 아직 없는 것

- [ ] Express 백엔드
- [ ] PostgreSQL + 테이블
- [ ] JWT 인증 · 이메일 인증
- [ ] 게시판/댓글 API · 페이징
- [ ] Swagger
- [ ] Docker
- [ ] 클라우드 배포 · GitHub Actions

---

## 기술 스택 (확정)

| 영역 | 선택 |
| --- | --- |
| Frontend | Next.js 15 (기존) |
| Backend | **Express.js** + TypeScript |
| DB | **PostgreSQL** |
| API | REST |
| 문서 | Swagger (swagger-ui-express) |
| 인증 | JWT + bcrypt |
| 상태관리 | Zustand |
| HTTP | Axios |
| 컨테이너 | Docker Compose |
| 배포 | 클라우드 + GitHub Actions |

---

## 폴더 구조 (목표)

```text
bookLog/
  docs/                 # 기능별 작업 가이드 (현재 문서)
  frontend/             # Next.js (기존 루트 → 이동 예정 또는 루트 유지)
  backend/              # Express API
  docker-compose.yml
  .github/workflows/    # CI/CD
```

> **Note:** 당장은 기존 Next.js를 **프로젝트 루트**에 두고 `backend/`만 추가하는 방식으로 진행합니다.

---

## 과제 필수 기능 매핑

| 과제 항목 | 담당 문서 |
| --- | --- |
| DB · 테이블 관계 | [01-database.md](./01-database.md) |
| REST API · Swagger | [02-backend-api.md](./02-backend-api.md) |
| 로그인 · JWT | [03-auth.md](./03-auth.md) |
| 회원가입 · 이메일 인증 | [03-auth.md](./03-auth.md) |
| 게시판 CRUD · 페이징 | [04-posts.md](./04-posts.md) |
| 댓글 | [05-comments.md](./05-comments.md) |
| Frontend 연동 | [06-frontend.md](./06-frontend.md) |
| Docker | [07-docker.md](./07-docker.md) |
| Cloud · GitHub Actions | [08-deploy.md](./08-deploy.md) |

---

## 예상 질문 대비 (평가용)

| 주제 | 준비할 답 |
| --- | --- |
| JWT | payload에 `userId`, `email` 등 — 만료·서명 방식 |
| DB 관계 | User 1:N Post, Post 1:N Comment |
| Zustand | auth 토큰·유저, 선택적 UI 상태 |
| Axios | interceptor로 Bearer 토큰, 401 시 로그아웃 |
| 로그in 유지 | localStorage + Zustand persist / 새로고침 시 hydrate |
| 아이디/비밀번호 저장 | 로그인 체크박스 → localStorage — [03-auth.md](./03-auth.md) |
| 이메일 인증 | 가입 시 token 발급 → 링크 클릭 → `isVerified` true |
