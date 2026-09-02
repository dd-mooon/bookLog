# 06. Frontend 연동

**상태:** ✅ 완료  
**선행:** [02-backend-api](./02-backend-api.md), [03-auth](./03-auth.md)  
**병행:** [04-posts](./04-posts.md), [05-comments](./05-comments.md)

---

## 현재 Frontend 자산

```text
src/
  app/           # 페이지 (UI 골격 ✅)
  components/    # Button, Input, Textarea, EmptyState
  layouts/       # Header, Footer, MainLayout
  services/api/  # client.ts, books.ts (→ posts/auth로 교체·추가)
  store/         # useBookStore (→ useAuthStore 추가)
  hooks/
  types/         # book.ts, post.ts
  constants/     # routes.ts, api.ts, storage.ts
  utils/         # loginCredentials.ts (로그인 정보 저장)
```

---

## 환경 변수

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

---

## 작업 체크리스트

### Axios (`src/services/api/client.ts`)

- [ ] `baseURL` → Backend `:4000/api`
- [ ] Request interceptor — `Authorization: Bearer`
- [ ] Response interceptor — 401 logout, 공통 에러 toast/alert
- [ ] `getErrorMessage()` 유틸

### Zustand Store

- [ ] `useAuthStore` — token, user, login, logout, hydrate
- [ ] `persist` middleware (localStorage)
- [ ] (선택) posts 목록 캐시

### Services

- [ ] `authService` — signup, login, me, verify
- [ ] `postService` — CRUD + list(page, limit)
- [ ] `commentService` — CRUD
- [ ] `books.ts` 제거 또는 미사용 정리

### 인증 가드

- [ ] `AuthGuard` client component
- [ ] 적용: `/posts/write`, `/posts/edit/[id]`, `/mypage`
- [ ] `/verify` 페이지 (이메일 인증)

### 로그인 — 아이디/비밀번호 저장

- [x] 「아이디/비밀번호 저장」 체크박스 (`LoginForm`)
- [x] 로그인 성공 시 `localStorage` 저장 / 체크 해제 시 삭제
- [x] 페이지 진입 시 저장값 자동 불러오기
- [x] `utils/loginCredentials.ts`, `constants/storage.ts`

### 페이지별 연동

| 페이지 | 작업 |
| --- | --- |
| `/login` | login API → store → redirect · **아이디/비밀번호 저장** |
| `/signup` | signup API → 안내 |
| `/posts` | 목록 + 페이징 |
| `/posts/[id]` | 상세 + 댓글 |
| `/posts/write` | POST + guard |
| `/posts/edit/[id]` | GET/PATCH + guard |
| `/mypage` | `/auth/me` + 내 글 목록 |
| `/` | 최근 글 or CTA |

### Header

- [ ] 로그인: 로그인 버튼
- [ ] 로그아웃: 닉네임 + 마이페이지 + 로그아웃
- [ ] `/recommend` — 선택 페이지 (과제 필수 아님)

### UI 추가

- [ ] `Pagination`
- [ ] `CommentList`, `CommentForm`
- [ ] Loading / Error 상태
- [ ] Toast 또는 inline error

---

## 평가 질문 대비

| 질문 | 구현 위치 |
| --- | --- |
| 상태관리 라이브러리? | Zustand — auth, (선택 UI) |
| API 호출 위치? | `src/services/api/*` |
| 공통 처리? | Axios client + interceptors |
| 에러 처리? | interceptor + 페이지별 try/catch |
| 로그in 확인? | store.token + `/auth/me` |
| 새로고침 유지? | Zustand persist |
| 아이디/비밀번호 저장? | `LoginForm` + `localStorage` (`booklog-login-credentials`) |
| 보호 페이지? | AuthGuard |
| 토큰 만료? | 401 → logout + redirect |
