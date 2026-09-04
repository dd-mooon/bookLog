#!/usr/bin/env bash
# e2-micro 등 저메모리 VM에서 Next.js Docker 빌드 OOM 완화용
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "sudo로 실행하세요: sudo bash scripts/setup-swap.sh"
  exit 1
fi

SWAPFILE=/swapfile
SIZE=2G

if swapon --show | grep -q "$SWAPFILE"; then
  echo "이미 스왑이 활성화되어 있습니다."
  swapon --show
  free -h
  exit 0
fi

if [ ! -f "$SWAPFILE" ]; then
  echo "Creating $SIZE swap at $SWAPFILE ..."
  fallocate -l "$SIZE" "$SWAPFILE" || dd if=/dev/zero of="$SWAPFILE" bs=1M count=2048
  chmod 600 "$SWAPFILE"
  mkswap "$SWAPFILE"
fi

swapon "$SWAPFILE"

if ! grep -q "$SWAPFILE" /etc/fstab; then
  echo "$SWAPFILE none swap sw 0 0" >> /etc/fstab
fi

echo "스왑 설정 완료"
swapon --show
free -h
