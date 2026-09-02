# 05. 댓글 (Comments)

**상태:** ⬜ 미착수  
**선행:** [04-posts](./04-posts.md)  
**후행:** [06-frontend](./06-frontend.md)

---

## 과제 요구사항

- [ ] 로그인 사용자만 작성
- [ ] 본인 댓글만 수정/삭제
- [ ] 작성 · 조회 · 삭제 (수정도 구현 권장)

---

## API 명세

### GET `/api/posts/:postId/comments`

```json
{
  "data": [
    {
      "id": 1,
      "content": "좋은 글이네요",
      "userId": 2,
      "authorName": "reader",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### POST `/api/posts/:postId/comments` 🔒

```json
{ "content": "댓글 내용" }
```

### PATCH `/api/comments/:id` 🔒 (본인)

### DELETE `/api/comments/:id` 🔒 (본인)

---

## Backend 작업

- [ ] comments CRUD
- [ ] post 존재 여부 검증
- [ ] 작성자 본인 검증 (수정/삭제)
- [ ] JOIN users → authorName
- [ ] Swagger

## Frontend 작업

- [ ] `commentService`
- [ ] `CommentList` 컴ponent
- [ ] `CommentForm` (로그인 시만)
- [ ] `CommentItem` — 본인일 때 수정/삭제
- [ ] `/posts/[id]` 페이지에 통합

---

## UI 위치

```text
/posts/[id]
  ├── 게시글 본문
  ├── 수정/삭제 (본인)
  └── 댓글 섹션
        ├── CommentForm
        └── CommentList
```

---

## 작업 체크리스트

- [ ] Backend comments API 4개
- [ ] Frontend commentService
- [ ] CommentList / CommentForm 컴ponent
- [ ] 게시글 상세에 댓글 통합
- [ ] 비로그인 시 작성 폼 숨김 + 안내
