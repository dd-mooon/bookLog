# 07. Docker

**상태:** ⬜ 미착수  
**선행:** [02-backend-api](./02-backend-api.md), [06-frontend](./06-frontend.md) (로컬 동작 확인 후)  
**후행:** [08-deploy](./08-deploy.md)

---

## 과제 요구사항

- [ ] Docker로 실행 환경 구성
- [ ] 환경 의존성 문제 해결
- [ ] 컨테이너 기반 서버 운영 이해

---

## 목표 구성

```text
docker-compose.yml
  ├── postgres      :5432
  ├── backend       :4000
  └── frontend      :3000
```

---

## 작업 체크리스트

### Dockerfile

- [ ] `backend/Dockerfile` — Node alpine, multi-stage
- [ ] `Dockerfile` (frontend) — Next.js standalone build

### docker-compose.yml

- [ ] `postgres` — volume, healthcheck
- [ ] `backend` — depends_on postgres, env_file
- [ ] `frontend` — depends_on backend, NEXT_PUBLIC_API_BASE_URL

### 스크립트

- [ ] `docker compose up --build`
- [ ] DB 초기화 (schema.sql mount or init script)

### 문서

- [ ] README에 Docker 실행 방법 추가

---

## docker-compose.yml 초안

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: booklog
      POSTGRES_PASSWORD: booklog
      POSTGRES_DB: booklog
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./backend/src/db/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    ports:
      - '5432:5432'

  backend:
    build: ./backend
    ports:
      - '4000:4000'
    environment:
      DATABASE_URL: postgresql://booklog:booklog@postgres:5432/booklog
      JWT_SECRET: dev-secret
      FRONTEND_URL: http://localhost:3000
    depends_on:
      - postgres

  frontend:
    build: .
    ports:
      - '3000:3000'
    environment:
      NEXT_PUBLIC_API_BASE_URL: http://localhost:4000/api
    depends_on:
      - backend

volumes:
  pgdata:
```

---

## 로컬 vs 배포

| 환경 | API URL |
| --- | --- |
| 로컬 compose | `http://localhost:4000/api` |
| 클라우드 | `https://api.your-domain.com/api` |
