# 01. Database

**상태:** ✅ 완료  
**선행:** 없음  
**후행:** [02-backend-api](./02-backend-api.md), [03-auth](./03-auth.md)

---

## 과제 요구사항

- [ ] MySQL / PostgreSQL / MongoDB 중 선택 → **PostgreSQL**
- [ ] 사용자 테이블
- [ ] 게시글 테이블
- [ ] 댓글 테이블
- [ ] 테이블 간 관계 설정

---

## ERD (설계안)

```text
users
  ├── id (PK)
  ├── email (UNIQUE)
  ├── password_hash
  ├── nickname
  ├── is_verified
  ├── verification_token
  ├── created_at
  └── updated_at

posts
  ├── id (PK)
  ├── user_id (FK → users.id)
  ├── title
  ├── content
  ├── book_title (nullable)
  ├── created_at
  └── updated_at

comments
  ├── id (PK)
  ├── post_id (FK → posts.id)
  ├── user_id (FK → users.id)
  ├── content
  ├── created_at
  └── updated_at
```

### 관계

| 관계 | 타입 | 설명 |
| --- | --- | --- |
| User → Post | 1:N | 한 사용자가 여러 게시글 작성 |
| Post → Comment | 1:N | 한 게시글에 여러 댓글 |
| User → Comment | 1:N | 한 사용자가 여러 댓글 작성 |

---

## 작업 체크리스트

### 스키마

- [x] `users` 테이블 생성
- [x] `posts` 테이블 생성
- [x] `comments` 테이블 생성
- [x] FK + ON DELETE 정책 결정 (CASCADE vs RESTRICT)
- [x] 인덱스: `posts.user_id`, `comments.post_id`, `users.email`

### 마이그레이션

- [x] `backend/src/db/schema.sql` 작성
- [x] `backend/src/db/migrate.ts` 또는 초기화 스크립트
- [x] 시드 데이터 (선택): 테스트 유저 1명, 글 2개

### Docker

- [x] `docker-compose.yml`에 postgres 서비스 추가
- [x] volume으로 데이터 영속화
- [x] `.env`에 `DATABASE_URL` 정의

---

## SQL 초안

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  book_title VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
```

---

## 평가 질문 대비

> **테이블 간 관계를 어떤 기준으로 설계하셨나요?**

- 게시글·댓글은 **작성자(user)** 와 N:1
- 게시글 삭제 시 댓글 CASCADE
- 이메일 UNIQUE로 중복 가입 방지
