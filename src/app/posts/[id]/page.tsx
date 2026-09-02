import type { Metadata } from 'next';

import { PostDetailClient } from '@/components/posts/PostDetailClient';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `게시글 ${id}`,
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;

  return <PostDetailClient postId={id} />;
}
