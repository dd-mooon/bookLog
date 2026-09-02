import type { Metadata } from 'next';

import { PostEditForm } from '@/components/posts/PostEditForm';

interface PostEditPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PostEditPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `게시글 수정 ${id}`,
  };
}

export default async function PostEditPage({ params }: PostEditPageProps) {
  const { id } = await params;

  return <PostEditForm postId={id} />;
}
