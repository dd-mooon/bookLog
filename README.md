# Book Log

독서 기록을 관리하는 Next.js 기반 웹 애플리케이션입니다.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- Axios

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## Scripts

| 명령어                 | 설명               |
| ---------------------- | ------------------ |
| `npm run dev`          | 개발 서버 실행     |
| `npm run build`        | 프로덕션 빌드      |
| `npm run start`        | 프로덕션 서버 실행 |
| `npm run lint`         | ESLint 검사        |
| `npm run lint:fix`     | ESLint 자동 수정   |
| `npm run format`       | Prettier 포맷팅    |
| `npm run format:check` | Prettier 검사      |

## Project Structure

```text
src/
  app/           # App Router 페이지
  components/    # UI / 공통 컴포넌트
  layouts/       # 레이아웃
  services/      # API 서비스 (Axios)
  store/         # Zustand 스토어
  hooks/         # 커스텀 훅
  lib/           # 공통 헬퍼
  types/         # TypeScript 타입
  utils/         # 유틸 함수
  constants/     # 상수
public/          # 정적 파일
```
