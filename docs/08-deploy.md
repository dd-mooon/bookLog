# 08. 배포 · GitHub Actions

**상태:** ✅ 완료 (GCP + Docker Compose + GitHub Actions Deploy 성공)  
**선행:** [07-docker](./07-docker.md)  
**GitHub:** https://github.com/dd-mooon/bookLog  
**인수인계:** [handoff.md](./handoff.md)

---

## 과제 요구사항

- [x] 클라우드 서버에 배포 (GCP Compute Engine)
- [x] API + Frontend 배포
- [x] GitHub Actions 자동 배포

---

## 제출물

- [x] GitHub Repository URL — https://github.com/dd-mooon/bookLog
- [x] 배포된 서비스 URL — http://35.252.113.228:3000
- [x] Swagger URL — http://35.252.113.228:4000/api-docs

> 외부 IP는 VM 재시작 시 바뀔 수 있습니다. 바뀌면 GCP 콘솔 · `.env` · `SSH_HOST` Secret을 함께 갱신하세요.

---

## 저장소에 포함된 배포 자산

| 파일 | 설명 |
| --- | --- |
| `.github/workflows/ci.yml` | push/PR 시 lint · build |
| `.github/workflows/deploy.yml` | main push 시 SSH 배포 (`SSH_KEY_B64`) |
| `.env.docker.example` | Docker/클라우드 환경 변수 템플릿 |
| `docker-compose.yml` | FE + BE + DB |
| `scripts/deploy.sh` | 서버 수동 배포 |
| `scripts/setup-swap.sh` | e2-micro용 스왑 2GB |

---

## 운영 메모 (e2-micro)

- RAM 1GB라 Next 빌드가 빡셈 → **스왑 2GB** 권장
- 프로덕션 `npm run build`는 turbopack 미사용
- Deploy는 빌드 전 컨테이너 `stop`으로 메모리 확보
- 키 기반 SSH에서는 `sudo`가 안 될 수 있음 → `docker` 그룹으로 실행

---

## GitHub Secrets

| Secret | 값 |
| --- | --- |
| `SSH_HOST` | VM 외부 IP |
| `SSH_USER` | `vjwyp0308` |
| `SSH_KEY_B64` | `base64 -i ~/.ssh/booklog_gcp \| tr -d '\n'` |

---

## 배포 검증

- [x] Frontend 접속
- [x] Swagger 접속
- [x] health `{"status":"ok"}`
- [x] GitHub Actions Deploy 성공
- [x] 로그인 API 스모크 (`demo@booklog.com`)
- [x] 게시글 작성 · 댓글 작성 API 스모크
- [ ] 브라우저에서 회원가입 · 이메일 인증 · CRUD UI 확인

---

## 평가 질문 대비

| 질문 | 답변 포인트 |
| --- | --- |
| 배포 방식? | GCP VM + Docker Compose |
| CI/CD? | GitHub Actions — CI + Deploy(SSH, base64 키) |
| 저사양 대응? | 스왑, turbopack 제거, 빌드 전 컨테이너 중지 |
| Frontend API URL? | 빌드 시 `NEXT_PUBLIC_API_BASE_URL` bake-in |
