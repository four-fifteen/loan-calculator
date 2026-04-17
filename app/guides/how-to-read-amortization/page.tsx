import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "상환 스케줄 표 읽는 법",
  description:
    "대출 상환 스케줄(월별 원금/이자/잔액) 표를 해석하는 방법과, 방식별로 표가 왜 달라지는지 설명합니다.",
  path: "/guides/how-to-read-amortization",
  keywords: ["상환 스케줄", "원금", "이자", "잔액", "상환 표"],
});

export default function HowToReadAmortizationGuidePage() {
  return (
    <article className="space-y-10 pb-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          상환 스케줄(원금/이자/잔액) 표 읽는 법
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          대출 계산기 결과에서 가장 중요한 부분은 “표”입니다. 한 달치 숫자만 보면 체감이
          어렵지만, 월별로 잔액이 어떻게 줄어드는지를 보면 상환 방식의 차이가 분명해집니다.
        </p>
      </header>

      <section className="space-y-3" aria-labelledby="amort-cols">
        <h2 id="amort-cols" className="text-lg font-semibold text-slate-900">
          표의 각 열이 의미하는 것
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>
            <strong className="font-semibold text-slate-800">월 상환액</strong>: 그 달에 실제로
            납부하는 총액(원금+이자)입니다.
          </li>
          <li>
            <strong className="font-semibold text-slate-800">원금</strong>: 그 달에 줄어드는
            대출 원금입니다.
          </li>
          <li>
            <strong className="font-semibold text-slate-800">이자</strong>: 그 달에 발생하는
            이자입니다. 보통 “직전 잔액 × 월할 이율”에 가깝습니다.
          </li>
          <li>
            <strong className="font-semibold text-slate-800">잔액</strong>: 상환 후 남아 있는
            원금입니다. 잔액이 줄어들수록 이후 이자도 줄어드는 경향이 있습니다.
          </li>
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="amort-why-diff">
        <h2 id="amort-why-diff" className="text-lg font-semibold text-slate-900">
          같은 조건인데 표가 달라지는 이유
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          상환 방식이 바뀌면 “원금을 줄이는 속도”가 달라집니다. 이자는 잔액에 붙기 때문에,
          잔액이 빨리 줄어들면 이후 이자도 빠르게 줄어드는 구조입니다.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          예를 들어 원금균등은 초기에 원금을 많이 줄여 잔액을 빠르게 낮추지만, 그만큼 첫 달
          상환액이 커질 수 있습니다. 원리금균등은 월 상환액을 일정하게 유지하는 대신 초기
          잔액 감소가 상대적으로 느릴 수 있습니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="amort-how-to-use">
        <h2 id="amort-how-to-use" className="text-lg font-semibold text-slate-900">
          표를 “의사결정 도구”로 쓰는 방법
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>
            월 납입 상한이 있다면, 첫 달/초기 몇 달의 상환액이 상한을 넘는지 확인합니다
            (특히 원금균등).
          </li>
          <li>
            잔액이 얼마나 빨리 줄어드는지 확인해 총 이자 부담 감각을 잡습니다.
          </li>
          <li>
            금리를 0.1%p 단위로 바꿔 보며 총 이자가 얼마나 흔들리는지 감을 잡습니다. 관련
            내용은{" "}
            <Link
              href="/guides/rate-sensitivity"
              className="font-medium text-sky-700 hover:underline"
            >
              금리 민감도 가이드
            </Link>
            에서 더 자세히 다룹니다.
          </li>
        </ol>
      </section>

      <section className="space-y-3" aria-labelledby="amort-note">
        <h2 id="amort-note" className="text-lg font-semibold text-slate-900">
          주의: 금융기관과 숫자가 약간 다른 이유
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          실제 약정은 “일할 계산(실제 일수)”, “절사/올림 규칙”, “상환일(예: 매월 5일)”
          등에 따라 소액 차이가 발생할 수 있습니다. 사이트의 결과는 비교·학습 목적의
          추정치로 활용하고, 최종 결정은 금융기관 자료를 기준으로 하세요.
        </p>
      </section>

      <p className="flex flex-wrap gap-3">
        <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
          ← 계산기로 확인하기
        </Link>
        <Link href="/guides" className="text-sm font-medium text-sky-700 hover:underline">
          가이드 목록
        </Link>
      </p>
    </article>
  );
}

