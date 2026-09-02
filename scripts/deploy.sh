#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "❌ .env 파일이 없습니다."
  echo "   cp .env.docker.example .env 후 PUBLIC_HOST 등을 수정하세요."
  exit 1
fi

echo "▶ Docker Compose 빌드 및 실행..."
docker compose --env-file .env up -d --build

echo "▶ 사용하지 않는 이미지 정리..."
docker image prune -f

echo ""
echo "✅ 배포 완료"
echo "   Frontend : http://$(grep -E '^PUBLIC_HOST=' .env | cut -d= -f2-):3000"
echo "   API      : http://$(grep -E '^PUBLIC_HOST=' .env | cut -d= -f2-):4000"
echo "   Swagger  : http://$(grep -E '^PUBLIC_HOST=' .env | cut -d= -f2-):4000/api-docs"
