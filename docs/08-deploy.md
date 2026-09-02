# 08. 배포 · GitHub Actions

**상태:** 🟡 인프라 준비 완료 (클라우드 VM 배포는 서버에서 진행)  
**선행:** [07-docker](./07-docker.md)  
**GitHub:** https://github.com/dd-mooon/bookLog

---

## 과제 요구사항

- [ ] 클라우드 서버에 배포 (Oracle / GCP / AWS)
- [ ] API + Frontend 배포
- [x] GitHub Actions 자동 배포 (워크플로우 준비)

---

## 제출물

- [x] GitHub Repository URL — https://github.com/dd-mooon/bookLog
- [ ] 배포된 서비스 URL (Frontend)
- [ ] Swagger URL (`http://<public-ip>:4000/api-docs`)

---

## 저장소에 포함된 배포 자산

| 파일 | 설명 |
| --- | --- |
| `.github/workflows/ci.yml` | push/PR 시 lint · build |
| `.github/workflows/deploy.yml` | main push 시 SSH 배포 |
| `.env.docker.example` | Docker/클라우드 환경 변수 템플릿 |
| `docker-compose.yml` | FE + BE + DB (환경 변수 지원) |
| `scripts/deploy.sh` | 서버에서 수동 배포 스크립트 |

---

## 1단계 — Oracle Cloud VM 생성 (1회)

1. [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/) 계정 생성
2. **Compute → Instances → Create Instance**
   - Shape: Ampere A1 (Always Free) 또는 VM.Standard.E2.1.Micro
   - Image: **Ubuntu 22.04**
   - SSH public key 등록
3. **Networking → Security List** 인바운드 규칙 추가

| 포트 | 용도 |
| --- | --- |
| 22 | SSH |
| 3000 | Frontend |
| 4000 | Backend API · Swagger |
| 80, 443 | (선택) Nginx + SSL |

> PostgreSQL(5432)은 **외부에 열지 않습니다.** Docker 내부 네트워크에서만 사용합니다.

4. Ubuntu 방화벽 (UFW) 사용 시 동일 포트 허용

```bash
sudo ufw allow 22
sudo ufw allow 3000
sudo ufw allow 4000
sudo ufw enable
```

---

## 2단계 — 서버 초기 설정 (1회)

VM에 SSH 접속 후:

```bash
# Docker 설치
sudo apt update
sudo apt install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# 재접속 후 docker 명령 사용

# 프로젝트 클론
git clone https://github.com/dd-mooon/bookLog.git ~/bookLog
cd ~/bookLog

# 환경 변수 설정
cp .env.docker.example .env
nano .env   # PUBLIC_HOST, NEXT_PUBLIC_API_BASE_URL, FRONTEND_URL, JWT_SECRET 수정
```

### `.env` 예시 (공인 IP가 `123.45.67.89`인 경우)

```env
PUBLIC_HOST=123.45.67.89
NEXT_PUBLIC_API_BASE_URL=http://123.45.67.89:4000/api
FRONTEND_URL=http://123.45.67.89:3000
JWT_SECRET=your-very-long-random-secret-here
```

```bash
# 최초 배포
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

---

## 3단계 — GitHub Actions 자동 배포 (1회)

GitHub Repository → **Settings → Secrets and variables → Actions** 에 추가:

| Secret | 값 |
| --- | --- |
| `SSH_HOST` | VM 공인 IP |
| `SSH_USER` | Ubuntu 사용자 (예: `ubuntu`) |
| `SSH_KEY` | SSH private key 전체 |
| `SSH_PORT` | (선택) 기본 22 |

Secrets 설정 후 `main`에 push하면:

1. **CI** — lint · build 검증
2. **Deploy** — SSH 접속 → `git pull` → `docker compose up -d --build`

> Secrets가 없으면 Deploy job은 자동으로 **스킵**됩니다. CI만 실행됩니다.

---

## 배포 검증

- [ ] Frontend: `http://<public-ip>:3000`
- [ ] Swagger: `http://<public-ip>:4000/api-docs`
- [ ] `demo@booklog.com` / `password123` 로그인
- [ ] 게시글 CRUD · 페이징
- [ ] 댓글 CRUD
- [ ] 새로고침 후 로그in 유지

---

## 배포 후 URL

| 서비스 | URL |
| --- | --- |
| Frontend | `http://<public-ip>:3000` |
| API | `http://<public-ip>:4000/api` |
| Swagger | `http://<public-ip>:4000/api-docs` |

---

## (선택) Nginx + HTTPS

도메인이 있으면 Nginx reverse proxy + Let's Encrypt(Certbot)로 80/443만 열고 3000/4000은 내부 포트로 프록시할 수 있습니다.

---

## 트러블슈팅

| 증상 | 해결 |
| --- | --- |
| Frontend에서 API 호출 실패 | `.env`의 `NEXT_PUBLIC_API_BASE_URL`이 **브라우저 기준** 공인 IP인지 확인 후 `docker compose up -d --build` 재실행 |
| 로그인 500 | 컨테이너 로그 확인: `docker compose logs backend` |
| DB 초기화 필요 | `docker compose down -v` 후 재배포 (데이터 삭제 주의) |
| Actions Deploy 실패 | SSH_HOST/KEY/USER Secrets, VM 방화벽 22번 확인 |

---

## 평가 질문 대비

| 질문 | 답변 포인트 |
| --- | --- |
| 배포 방식? | Oracle Cloud VM + Docker Compose |
| CI/CD? | GitHub Actions — CI(lint/build) + Deploy(SSH) |
| 환경 변수? | `.env` — JWT, API URL, FRONTEND_URL |
| Frontend API URL? | 빌드 시 `NEXT_PUBLIC_API_BASE_URL` bake-in |
| DB 보안? | Postgres는 Docker 내부만, 외부 5432 미개방 |
