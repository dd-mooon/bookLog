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

## Backend 실행

```bash
docker compose up -d postgres

cd backend
cp .env.example .env
npm install
npm run db:setup
npm run dev
```

- API: http://localhost:4000
- Swagger: http://localhost:4000/api-docs

## 시드 계정 (테스트용)

`npm run db:setup` 실행 후 아래 계정으로 로그인할 수 있습니다.

| email | password |
| --- | --- |
| demo@booklog.com | password123 |

> Backend 상세: [backend/README.md](./backend/README.md)

> Backend · Docker 전체 구성은 [docs/07-docker.md](./docs/07-docker.md) 참고

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
