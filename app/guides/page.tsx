import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "가이드",
  description:
    "대출 이자 계산, 상환 방식(원리금균등/원금균등/만기일시), 상환 스케줄 해석 등 실사용에 도움이 되는 가이드 모음입니다.",
  path: "/guides",
  keywords: ["가이드", "상환 방식", "상환 스케줄", "대출 이자"],
});

const GUIDES: { href: string; title: string; description: string }[] = [
  {
    href: "/guides/repayment-types",
    title: "원리금균등·원금균등·만기일시 차이",
    description:
      "월 상환액의 흐름과 총 이자가 왜 달라지는지, 어떤 상황에서 어떤 방식이 자주 선택되는지 정리합니다.",
  },
  {
    href: "/guides/how-to-read-amortization",
    title: "상환 스케줄(원금/이자/잔액) 표 읽는 법",
    description:
      "월별 표가 의미하는 것과, 같은 조건에서 표가 달라지는 이유(잔액, 이자 비중)를 쉽게 설명합니다.",
  },
  {
    href: "/guides/rate-sensitivity",
    title: "금리 0.1%p 차이가 총 이자에 미치는 영향",
    description:
      "장기 대출에서 작은 금리 차이가 크게 누적되는 이유와, 비교할 때 놓치기 쉬운 포인트를 다룹니다.",
  },
];

export default function GuidesIndexPage() {
  return (
    <article className="space-y-10 pb-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          가이드
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          계산기를 “수치만 찍어 보는 도구”로 끝내지 않도록, 결과를 이해하고 비교하는
          데 필요한 핵심 개념을 짧고 실용적으로 정리했습니다.
        </p>
      </header>

      <section aria-label="가이드 목록">
        <ul className="grid gap-4 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <li
              key={g.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-base font-semibold text-slate-900">
                <Link href={g.href} className="hover:text-sky-800 hover:underline">
                  {g.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {g.description}
              </p>
              <p className="mt-3">
                <Link href={g.href} className="text-sm font-medium text-sky-700 hover:underline">
                  읽기 →
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p>
        <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
          ← 계산기로
        </Link>
      </p>
    </article>
  );
}

