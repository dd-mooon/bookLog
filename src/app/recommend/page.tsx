import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: '추천도서',
};

const RECOMMENDED_BOOKS = [
  {
    title: '데미안',
    author: '헤르만 헤세',
    reason: '성장과 자아를 찾는 여정을 짧고 깊게 담은 고전.',
  },
  {
    title: '인간 실격',
    author: '다자이 오사무',
    reason: '자기 인식과 고독을 날카롭게 그려 낸 대표작.',
  },
  {
    title: '사피엔스',
    author: '유발 하라리',
    reason: '인류의 역사를 큰 흐름으로 다시 보게 해 주는 교양서.',
  },
  {
    title: '아몬드',
    author: '손원평',
    reason: '감정을 이해하는 과정을 담담하게 풀어낸 국내 소설.',
  },
  {
    title: '클린 코드',
    author: '로버트 C. 마틴',
    reason: '읽기 좋은 코드를 위한 실무 원칙을 정리한 개발서.',
  },
] as const;

export default function RecommendPage() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            추천도서
          </h1>
          <p className="text-foreground/60 max-w-xl text-sm">
            Book Log에서 가볍게 시작해 보기 좋은 책들입니다. 읽고 난 감상은
            게시판에 남겨 보세요.
          </p>
        </div>
        <Link href={ROUTES.POST_WRITE}>
          <Button className="w-full sm:w-auto">감상기록 쓰기</Button>
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {RECOMMENDED_BOOKS.map((book, index) => (
          <li key={book.title}>
            <div className="border-foreground/10 hover:bg-foreground/5 flex flex-col gap-4 rounded-md border p-4 transition-colors sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="flex gap-4 sm:gap-5">
                <span className="text-foreground/35 w-8 shrink-0 font-mono text-sm tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <h2 className="font-medium tracking-tight">{book.title}</h2>
                  <p className="text-foreground/50 text-sm">{book.author}</p>
                  <p className="text-foreground/70 mt-1 text-sm leading-6">
                    {book.reason}
                  </p>
                </div>
              </div>
              <Link
                href={ROUTES.POST_WRITE}
                className="text-foreground/60 hover:text-foreground shrink-0 self-start text-xs underline-offset-4 hover:underline sm:mt-0.5 sm:self-center"
              >
                게시판에서 기록하기
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
