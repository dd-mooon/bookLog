import type { Metadata } from 'next';

import { MyPageClient } from '@/components/mypage/MyPageClient';

export const metadata: Metadata = {
  title: '마이페이지',
};

export default function MyPage() {
  return <MyPageClient />;
}
