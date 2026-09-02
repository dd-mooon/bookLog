# 08. 배포 · GitHub Actions

**상태:** ⬜ 미착수  
**선행:** [07-docker](./07-docker.md)  
**GitHub:** https://github.com/dd-mooon/bookLog

---

## 과제 요구사항

- [ ] 클라우드 서버에 배포 (Oracle / GCP / AWS)
- [ ] API + Frontend 배포
- [ ] GitHub Actions 자동 배포

---

## 제출물

- [ ] GitHub Repository URL
- [ ] 배포된 서비스 URL (Frontend)
- [ ] Swagger URL (`https://api.../api-docs`)

---

## 배포 옵션 비교

| 옵션 | 난이도 | 과제 적합 | 비고 |
| --- | --- | --- | --- |
| **Oracle Cloud** | 높음 | ✅ 명시됨 | 무료, SSH·방화벽 설정 오래 걸림 |
| Railway / Render | 낮음 | ⚠️ | 빠르지만 과제 Cloud 항목 설명 필요 |
| VPS + Docker Compose | 중간 | ✅ | Oracle VM에 compose up |

**추천:** Oracle Cloud Free VM 1대 + Docker Compose (FE + BE + DB)

---

## 작업 체크리스트

### 클라우드 서버

- [ ] Oracle Cloud 계정 · VM 생성 (Ubuntu)
- [ ] Security List — 80, 443, 22, 3000, 4000
- [ ] Docker · Docker Compose 설치
- [ ] Git clone + `docker compose up -d`
- [ ] (선택) Nginx reverse proxy + SSL (Let's Encrypt)

### 환경 변수 (프로덕션)

- [ ] `JWT_SECRET` — 강력한 랜덤값
- [ ] `DATABASE_URL`
- [ ] `FRONTEND_URL` — 배포 도메인
- [ ] SMTP 설정
- [ ] `NEXT_PUBLIC_API_BASE_URL`

### GitHub Actions

- [ ] `.github/workflows/deploy.yml`
- [ ] Trigger: push to `main`
- [ ] Steps: SSH → pull → docker compose rebuild
- [ ] Secrets: `SSH_HOST`, `SSH_KEY`, `SSH_USER`

### 배포 검증

- [ ] 회원가입 · 이메일 인증 · 로그인
- [ ] 게시글 CRUD · 페이징
- [ ] 댓글 CRUD
- [ ] Swagger 접근
- [ ] 새로고침 후 로그in 유지

---

## GitHub Actions 초안

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd ~/bookLog
            git pull origin main
            docker compose up -d --build
```

---

## 배포 후 URL 예시

| 서비스 | URL |
| --- | --- |
| Frontend | `http://<public-ip>:3000` |
| API | `http://<public-ip>:4000/api` |
| Swagger | `http://<public-ip>:4000/api-docs` |

---

## 미완료 커밋

로컬 `main`이 origin보다 ahead 1커밋 — 배포 전 push 필요:

```bash
git push origin main
```
