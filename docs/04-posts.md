# 04. 게시판 (Posts)

**상태:** ✅ Backend 완료 (Frontend UI만)  
**선행:** [03-auth](./03-auth.md)  
**후행:** [05-comments](./05-comments.md), [06-frontend](./06-frontend.md)

---

## 과제 요구사항

- [ ] 로그인 사용자만 작성
- [ ] 본인 글만 수정/삭제
- [ ] 작성 · 목록 · 상세 · 수정 · 삭제
- [ ] **페이징** (서버 + UI)

---

## 기존 Frontend 페이지

| 경로 | 파일 | 상태 |
| --- | --- | --- |
| `/posts` | `src/app/posts/page.tsx` | EmptyState만 |
| `/posts/[id]` | `src/app/posts/[id]/page.tsx` | 더미 |
| `/posts/write` | `src/app/posts/write/page.tsx` | 폼 UI |
| `/posts/edit/[id]` | `src/app/posts/edit/[id]/page.tsx` | 폼 UI |

---

## API 명세

### GET `/api/posts?page=1&limit=10`

**Response**

```json
{
  "data": {
    "items": [
      {
        "id": 1,
        "title": "제목",
        "content": "내용",
        "bookTitle": "책 제목",
        "authorName": "닉네임",
        "userId": 1,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "totalPages": 5
    }
  }
}
```

### GET `/api/posts/:id`

- 게시글 + 작성자 정보

### POST `/api/posts` 🔒

```json
{ "title": "...", "content": "...", "bookTitle": "..." }
```

### PATCH `/api/posts/:id` 🔒 (본인)

### DELETE `/api/posts/:id` 🔒 (본인)

---

## Backend 작업

- [ ] posts CRUD service / controller
- [ ] 목록: `LIMIT/OFFSET` 또는 `page/limit` 쿼리
- [ ] total count 쿼리 (페이징 메타)
- [ ] 작성: JWT userId → `user_id`
- [ ] 수정/삭제: `user_id === req.user.id` 검증
- [ ] Swagger 문서

## Frontend 작업

- [ ] `postService` (`src/services/api/posts.ts`)
- [ ] `/posts` — 목록 + Pagination 컴ponent
- [ ] `/posts/[id]` — 상세 + 댓글 영역 placeholder
- [ ] `/posts/write` — POST 연동 + redirect
- [ ] `/posts/edit/[id]` — GET + PATCH
- [ ] 삭제 버튼 + confirm
- [ ] 비로그인 → `/login` redirect

---

## 페이징 UI

- [ ] `Pagination` 컴포넌트 (`src/components/ui/Pagination.tsx`)
- [ ] URL query: `/posts?page=2`
- [ ] 이전/다음 + 페이지 번호

---

## 작업 체크리스트

- [ ] Backend posts API 5개
- [ ] 페이징 쿼리
- [ ] Frontend postService
- [ ] 목록 페이지 연동
- [ ] 상세 · 작성 · 수정 · 삭제 연동
- [ ] 권한 없을 때 403 처리
