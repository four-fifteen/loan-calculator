import Link from "next/link";

export default function NotFound() {
  return (
    <article className="space-y-6 pb-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          주소가 변경되었거나 삭제되었을 수 있습니다. 계산기는 홈에서 바로 사용할 수
          있습니다.
        </p>
      </header>
      <p className="flex flex-wrap gap-3">
        <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
          ← 홈으로
        </Link>
        <Link href="/guides" className="text-sm font-medium text-sky-700 hover:underline">
          가이드 보기
        </Link>
      </p>
    </article>
  );
}

