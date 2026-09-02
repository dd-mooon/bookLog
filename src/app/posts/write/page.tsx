import type { Metadata } from 'next';

import { PostWriteForm } from '@/components/posts/PostWriteForm';

export const metadata: Metadata = {
  title: '글쓰기',
};

export default function PostWritePage() {
  return <PostWriteForm />;
}
