# Book Log

독서 기록 게시판 — 2026 하반기 FullStack 과제 프로젝트

## Tech Stack

| Frontend | Backend | Infra |
| --- | --- | --- |
| Next.js 15 | Express.js | Docker |
| TypeScript | PostgreSQL | GitHub Actions |
| Tailwind CSS | JWT + bcrypt | Cloud (Oracle 등) |
| Zustand | Swagger | |
| Axios | | |

## Getting Started (Frontend only — 현재)

```bash
npm install
cp .env.example .env.local
npm run dev
```

[http://localhost:3000](http://localhost:3000)

> Backend · Docker 연동 후 전체 실행 방법은 [docs/07-docker.md](./docs/07-docker.md) 참고

## 기능별 작업 가이드

**작업은 아래 문서 순서대로 진행합니다.**

| 문서 | 내용 |
| --- | --- |
| [docs/README.md](./docs/README.md) | **인덱스 · 진행 현황** |
| [docs/00-overview.md](./docs/00-overview.md) | 전체 개요 |
| [docs/01-database.md](./docs/01-database.md) | DB 스키마 |
| [docs/02-backend-api.md](./docs/02-backend-api.md) | Express · Swagger |
| [docs/03-auth.md](./docs/03-auth.md) | 로그인 · 회원가입 |
| [docs/04-posts.md](./docs/04-posts.md) | 게시판 · 페이징 |
| [docs/05-comments.md](./docs/05-comments.md) | 댓글 |
| [docs/06-frontend.md](./docs/06-frontend.md) | Frontend API 연동 |
| [docs/07-docker.md](./docs/07-docker.md) | Docker Compose |
| [docs/08-deploy.md](./docs/08-deploy.md) | 배포 · CI/CD |

## Scripts

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | Frontend 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Repository

https://github.com/dd-mooon/bookLog
