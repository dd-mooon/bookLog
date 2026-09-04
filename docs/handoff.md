# Book Log — 인수인계 (Handoff)

다른 맥/Cursor에서 이어서 작업할 때 이 문서를 먼저 읽으세요.  
작성 시점: 2026-09-04

---

## 한 줄 요약

- **클라우드 배포 + GitHub Actions Deploy 성공** (GCP e2-micro + Docker Compose + 스왑 2GB)
- **API 스모크 통과**: 로그인 · 글 작성 · 댓글 · health · FE 200
- CI: `eslint`에서 `backend/**` ignore + build `NODE_OPTIONS` (로컬 lint/build OK, push 후 Actions 확인)
- **월요일 제출**: 아래 URL + 데모 계정. VM 실행 유지 또는 심사 전 시작

---

## 제출용 URL

| 항목 | URL |
| --- | --- |
| GitHub | https://github.com/dd-mooon/bookLog |
| Frontend | http://35.252.113.228:3000 (외부 IP가 바뀌면 GCP에서 다시 확인) |
| Swagger | http://35.252.113.228:4000/api-docs |
| Health | http://35.252.113.228:4000/health |

### 데모 계정

| email | password |
| --- | --- |
| demo@booklog.com | password123 |

---

## GCP

| 항목 | 값 |
| --- | --- |
| 프로젝트 | My First Project |
| VM 이름 | `booklog` |
| 리전/존 | us-west1-b |
| 머신 | e2-micro (RAM ~1GB) — Always Free 근처 |
| OS | Ubuntu (Minimal 계열) |
| 방화벽 | `allow-booklog` → tcp 3000,4000 / `default-allow-ssh` → tcp 22 |

### VM 조작

- 목록: https://console.cloud.google.com/compute/instances
- **중지됨** → 체크 → **시작**
- **실행 중**일 때만 브라우저 **SSH** 또는 Mac `ssh` 가능
- 빌드 중에는 SSH가 먹통이 될 수 있음 → 콘솔에서 **중지 → 시작**으로 복구

### 서버에서 앱 켜기 (브라우저 SSH)

```bash
cd ~/bookLog
docker compose --env-file .env up -d
docker compose ps
curl http://localhost:4000/health
```

### 스왑 (이미 설정됨 — 재시작 후에도 fstab으로 유지되어야 함)

```bash
free -h   # Swap: 2.0Gi 보이면 OK
# 없으면:
sudo bash ~/bookLog/scripts/setup-swap.sh
# 또는 docs/08-deploy.md / 이전 수동 fallocate 명령
```

### 서버 `.env` (예시)

경로: `~/bookLog/.env`

```env
PUBLIC_HOST=35.252.113.228
NEXT_PUBLIC_API_BASE_URL=http://35.252.113.228:4000/api
FRONTEND_URL=http://35.252.113.228:3000
JWT_SECRET=booklog-prod-secret-change-me-please-32chars
```

IP가 바뀌면 위 값을 수정한 뒤:

```bash
cd ~/bookLog
docker compose --env-file .env up -d --build
```

---

## GitHub Actions

- CI: `.github/workflows/ci.yml` (lint/build — `backend/**` eslint ignore, Node 메모리 상향)
- Deploy: `.github/workflows/deploy.yml`
  - `SSH_HOST`, `SSH_USER`, `SSH_KEY_B64` Secrets 사용
  - base64 키로 SSH 후 `docker compose up -d --build`
  - 빌드 전 컨테이너 `stop`으로 메모리 확보
  - 키 기반 SSH에서는 `sudo`가 안 됨 → docker 그룹으로 실행

### Secrets

https://github.com/dd-mooon/bookLog/settings/secrets/actions

| Name | 값 |
| --- | --- |
| `SSH_HOST` | VM 외부 IP (현재 `35.252.113.228`) |
| `SSH_USER` | `vjwyp0308` |
| `SSH_KEY_B64` | `base64 < ~/.ssh/booklog_gcp \| tr -d '\n'` 결과 |

> Secret 수정 화면이 **빈칸**인 것은 정상(저장값 비공개). 빈칸으로 저장하면 지워지니 주의.

### Actions 확인

https://github.com/dd-mooon/bookLog/actions/workflows/deploy.yml

---

## SSH 키 (맥마다 다름)

회사 맥에만 `~/.ssh/booklog_gcp` 가 있을 수 있습니다.

집 맥에서 서버 SSH가 필요하면:

1. 새 키 생성 또는 안전하게 키 복사
2. GCP 브라우저 SSH에서 `~/.ssh/authorized_keys`에 **공개키** 등록
3. `SSH_KEY_B64` Secret도 새 키에 맞게 갱신

Mac에서 테스트:

```bash
ssh -i ~/.ssh/booklog_gcp vjwyp0308@35.252.113.228 'echo OK'
```

---

## 로컬 개발 (Docker 없이)

```bash
# Postgres
brew services start postgresql@16

# Backend
cd backend
cp .env.example .env   # Homebrew면 DATABASE_URL=postgresql://localhost:5432/booklog
npm install
npm run db:setup       # 최초 1회
npm run dev            # :4000

# Frontend (다른 터미널)
cp .env.example .env.local
npm install
npm run dev            # :3000
```

Docker로 돌릴 때는 Homebrew Postgres / npm run dev와 **포트 충돌** 주의 (3000, 4000, 5432).

---

## 과제 대비 — 남은 것 / 우선순위

### 필수에 가깝게 된 것

- Frontend (Next) · Backend (Express) · PostgreSQL · JWT · 게시판/댓글 · 페이징 · Docker · GCP 배포 · Swagger · GitHub

### 보완하면 좋은 것 (월요 전까지)

1. ~~제출 URL 접속~~ · ~~API 스모크~~ · ~~Actions Deploy 성공~~
2. 브라우저 UI 스모크 (로그인 · CRUD · 페이징 · 댓글 수정)
3. 이메일 인증: SMTP 없으면 `docker compose logs backend`에 인증 링크 출력
4. CI push 후 Actions Frontend lint/build 초록 확인
5. ~~댓글 수정 UI~~ (FE 수정/저장/취소 추가됨 — push 후 배포 반영)

### 평가 질문 포인트

- Zustand + persist (로그인 유지)
- Axios interceptor (Bearer, 401 → logout)
- JWT payload: userId, email
- DB: User 1:N Post 1:N Comment

자세한 가이드: [08-deploy.md](./08-deploy.md), [03-auth.md](./03-auth.md), [06-frontend.md](./06-frontend.md)

---

## 새 Cursor 채팅에 붙여넣기용

```text
Book Log 이어서 작업.
- repo: https://github.com/dd-mooon/bookLog
- 인수인계: docs/handoff.md
- GCP VM booklog (e2-micro), 스왑 2GB 설정함
- Actions Deploy는 SSH_KEY_B64 방식. 자동 배포 빌드가 e2-micro에서 오래 걸림
- 월요일 제출: 사이트 URL + 스모크 테스트 우선, Actions는 여유 시
- 데모: demo@booklog.com / password123
```
