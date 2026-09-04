# Book Log — 기능별 작업 가이드

과제 요구사항을 **기능 단위 README**로 나눠 두었습니다.  
각 문서의 체크리스트 순서대로 작업하면 됩니다.

## 진행 현황

| # | 기능 | 문서 | 상태 |
| --- | --- | --- | --- |
| 0 | 전체 개요 · 작업 순서 | [00-overview.md](./00-overview.md) | 🟡 진행 중 |
| 1 | Database | [01-database.md](./01-database.md) | ✅ 완료 |
| 2 | Backend · API · Swagger | [02-backend-api.md](./02-backend-api.md) | ✅ 완료 |
| 3 | Auth (로그인 · 회원가입) | [03-auth.md](./03-auth.md) | ✅ 완료 |
| 4 | 게시판 (Posts) | [04-posts.md](./04-posts.md) | ✅ Backend |
| 5 | 댓글 (Comments) | [05-comments.md](./05-comments.md) | ✅ Backend |
| 6 | Frontend 연동 | [06-frontend.md](./06-frontend.md) | ✅ 완료 |
| 7 | Docker | [07-docker.md](./07-docker.md) | ✅ 완료 |
| 8 | 배포 · GitHub Actions | [08-deploy.md](./08-deploy.md) | 🟡 인프라 준비 |
| - | **인수인계 (다른 맥용)** | [handoff.md](./handoff.md) | 📝 최신 상태 |

**범례:** ⬜ 미착수 · 🟡 일부 · ✅ 완료

---

## 권장 작업 순서

```text
1. 01-database        → 스키마 · 관계 확정
2. 02-backend-api     → Express 프로젝트 · Swagger 골격
3. 03-auth            → JWT · 회원가입 · 이메일 인증
4. 04-posts           → 게시판 CRUD · 페이징
5. 05-comments        → 댓글 CRUD
6. 06-frontend        → Axios · Zustand · 페이지 연동
7. 07-docker          → Compose로 FE + BE + DB
8. 08-deploy          → 클라우드 · Actions
```

---

## 아키텍처 (목표)

```text
[Browser]
    ↓
[Next.js Frontend :3000]  ──Axios──▶  [Express API :4000]
                                           ↓
                                    [PostgreSQL :5432]
```

---

## 제출물 체크

- [ ] GitHub Repository
- [ ] 배포된 서비스 URL
- [ ] Swagger API 문서 URL
