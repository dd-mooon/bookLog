# Backend — Database

PostgreSQL 스키마 및 마이그레이션 스크립트입니다.

## 로컬 실행

### 1. PostgreSQL 실행 (Docker)

```bash
# 프로젝트 루트
docker compose up -d postgres
```

### 2. 환경 변수

```bash
cd backend
cp .env.example .env
```

### 3. 의존성 설치 · 마이그레이션 · 시드

```bash
npm install
npm run db:setup
```

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run db:migrate` | schema.sql 실행 |
| `npm run db:seed` | 데모 데이터 삽입 |
| `npm run db:setup` | migrate + seed |

## 시드 계정

| email | password |
| --- | --- |
| demo@booklog.com | password123 |

## 테이블

- `users` — 회원 (email UNIQUE, bcrypt hash)
- `posts` — 게시글 (user_id FK, CASCADE)
- `comments` — 댓글 (post_id, user_id FK, CASCADE)

상세 ERD: [docs/01-database.md](../docs/01-database.md)
