import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "원리금균등·원금균등·만기일시 차이",
  description:
    "원리금균등, 원금균등, 만기일시 상환의 월 상환액 흐름과 총 이자 차이를 이해하기 쉽게 정리합니다.",
  path: "/guides/repayment-types",
  keywords: ["상환 방식", "원리금균등", "원금균등", "만기일시"],
});

export default function RepaymentTypesGuidePage() {
  return (
    <article className="space-y-10 pb-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          원리금균등·원금균등·만기일시 차이
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          상환 방식은 “매달 얼마를 내느냐”뿐 아니라 “총 이자를 얼마나 내느냐”에도
          영향을 줍니다. 같은 원금·기간·금리라도, 매달 잔액이 어떻게 줄어드는지가
          달라지기 때문입니다.
        </p>
      </header>

      <section className="space-y-3" aria-labelledby="guide-core-idea">
        <h2 id="guide-core-idea" className="text-lg font-semibold text-slate-900">
          핵심 한 줄
        </h2>
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
          <strong className="font-semibold text-slate-900">총 이자</strong>는 “얼마 동안
          얼마의 잔액을 유지하느냐”의 합으로 결정됩니다. 잔액이 빨리 줄어들수록(초기에
          원금을 더 갚을수록) 이자는 대체로 줄어듭니다.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="guide-equal-payment">
        <h2 id="guide-equal-payment" className="text-lg font-semibold text-slate-900">
          1) 원리금균등상환: “매달 총액을 거의 일정하게”
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          원리금균등은 매달 내는 총액(원금+이자)이 거의 일정하도록 맞추는 방식입니다.
          초반에는 이자 비중이 크고, 시간이 지날수록 원금 비중이 커집니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>월 납입액이 일정해 가계 현금흐름을 계획하기 쉽습니다.</li>
          <li>
            같은 조건이라면 원금균등보다 총 이자가 다소 커지는 경우가 많습니다(초반
            잔액 감소가 상대적으로 느리기 때문).
          </li>
        </ul>
      </section>

      <section className="space-y-4" aria-labelledby="guide-equal-principal">
        <h2 id="guide-equal-principal" className="text-lg font-semibold text-slate-900">
          2) 원금균등상환: “원금을 매달 같은 양으로”
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          원금균등은 매달 갚는 원금이 같고, 이자는 남은 잔액에 따라 계산됩니다. 그래서
          첫 달 납입액이 가장 크고 이후 점차 줄어드는 형태가 됩니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>초기 월 부담이 커질 수 있습니다.</li>
          <li>
            초기에 잔액을 더 빠르게 줄이므로, 같은 조건이면 총 이자가 줄어드는 경향이
            있습니다.
          </li>
        </ul>
      </section>

      <section className="space-y-4" aria-labelledby="guide-bullet">
        <h2 id="guide-bullet" className="text-lg font-semibold text-slate-900">
          3) 만기일시상환: “기간 중 이자만, 만기에 원금 일시”
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          만기일시는 대출 기간 동안 이자만 내고, 마지막에 원금을 한 번에 갚는 구조입니다.
          월 현금 부담이 작아 보일 수 있지만, 만기 때 큰 자금이 필요합니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>월 납입액(이자)이 작아 단기 현금흐름엔 유리해 보일 수 있습니다.</li>
          <li>
            원금이 줄지 않으므로 기간 전체에 이자가 붙어, 총 이자 부담이 커질 수 있습니다.
          </li>
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="guide-practice">
        <h2 id="guide-practice" className="text-lg font-semibold text-slate-900">
          실제로 비교하는 방법(추천)
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>먼저 “내가 감당 가능한 월 납입 상한”을 대략 정합니다.</li>
          <li>같은 원금·금리·기간에서 상환 방식만 바꿔 월 상환 흐름을 확인합니다.</li>
          <li>
            <Link
              href="/guides/how-to-read-amortization"
              className="font-medium text-sky-700 hover:underline"
            >
              상환 스케줄 표
            </Link>
            를 보고 원금이 얼마나 빠르게 줄어드는지(잔액 감소)를 확인합니다.
          </li>
        </ol>
      </section>

      <p className="flex flex-wrap gap-3">
        <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
          ← 계산기로 비교하기
        </Link>
        <Link href="/guides" className="text-sm font-medium text-sky-700 hover:underline">
          가이드 목록
        </Link>
      </p>
    </article>
  );
}

