import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "금리 0.1%p 차이가 총 이자에 미치는 영향",
  description:
    "장기 대출에서 작은 금리 차이가 총 이자에 크게 누적되는 이유와, 비교 시 주의할 포인트를 정리합니다.",
  path: "/guides/rate-sensitivity",
  keywords: ["금리", "총 이자", "금리 비교", "우대금리"],
});

export default function RateSensitivityGuidePage() {
  return (
    <article className="space-y-10 pb-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          금리 0.1%p 차이가 총 이자에 미치는 영향
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          “0.1%p면 별거 아닌데?”처럼 느껴질 수 있지만, 대출은 잔액에 매달 이자가 붙기 때문에
          작은 차이가 장기간 누적되면 총 이자에서 큰 차이가 날 수 있습니다.
        </p>
      </header>

      <section className="space-y-3" aria-labelledby="rate-why">
        <h2 id="rate-why" className="text-lg font-semibold text-slate-900">
          왜 작은 차이가 크게 누적될까요?
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          이자는 보통 “남은 잔액 × 이율”로 발생합니다. 잔액이 큰 초반에는 같은 0.1%p라도
          월 이자 증가분이 크고, 그 차이가 여러 해 반복되면서 총합이 커집니다. 특히 20~30년
          같은 장기 만기에서는 누적 효과가 더 크게 나타납니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="rate-compare">
        <h2 id="rate-compare" className="text-lg font-semibold text-slate-900">
          금리 비교할 때 꼭 같이 봐야 하는 것
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>
            <strong className="font-semibold text-slate-800">금리 종류</strong>: 고정/변동/혼합,
            재산정 주기(예: 6개월, 1년), 우대금리 적용 기간
          </li>
          <li>
            <strong className="font-semibold text-slate-800">부대비용</strong>: 인지세, 보증료,
            보험료, 설정비용 등(상품에 따라 다름)
          </li>
          <li>
            <strong className="font-semibold text-slate-800">중도상환 수수료</strong>: 중도상환
            계획이 있다면 실제 총 비용을 좌우할 수 있음
          </li>
          <li>
            <strong className="font-semibold text-slate-800">상환 방식</strong>: 같은 금리여도
            잔액 감소 속도가 달라 총 이자 합이 달라짐
          </li>
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="rate-how">
        <h2 id="rate-how" className="text-lg font-semibold text-slate-900">
          계산기로 빠르게 감 잡는 방법
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>원금/기간/상환 방식을 고정합니다.</li>
          <li>금리를 기준치에서 ±0.1%p, ±0.3%p 정도로 바꿔 봅니다.</li>
          <li>총 이자와 월 상환액 변화를 함께 봅니다.</li>
        </ol>
        <p className="text-sm leading-relaxed text-slate-600">
          표를 읽는 법이 익숙하지 않다면{" "}
          <Link
            href="/guides/how-to-read-amortization"
            className="font-medium text-sky-700 hover:underline"
          >
            상환 스케줄 표 읽는 법
          </Link>
          을 먼저 보는 것을 추천합니다.
        </p>
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

