import Link from "next/link";
import type { Metadata } from "next";
import { STATIC_SEO_PAGES } from "@/data/static-pages";
import { REPAYMENT_ROUTES } from "@/data/repayment-routes";
import { JsonLd } from "@/components/JsonLd";
import { LoanCalculator } from "@/components/LoanCalculator";
import { MonetizationSlot } from "@/components/monetization/MonetizationSlot";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { methodLabel } from "@/lib/loan-calculator";

export const metadata: Metadata = buildPageMetadata({
  title: "대출 이자 계산 | 무료 대출 이자 계산기",
  description:
    "대출 이자 계산과 월 상환금, 총 이자, 상환 스케줄을 무료로 확인하세요. 원리금균등·원금균등·만기일시와 금액·기간·금리별 안내 페이지를 제공합니다.",
  path: "/",
  keywords: ["주택담보대출 이자", "대출 월납입금"],
});

const featuredSlugs = [
  "loan-100m-interest",
  "loan-200m-30y-interest",
  "loan-300m-5pct-interest",
  "equal-payment",
];

const HOME_DEFAULT_PRINCIPAL = 3 * 100_000_000;
const HOME_DEFAULT_YEARS = 30;
const HOME_DEFAULT_RATE = 4.5;

export default function HomePage() {
  const featured = featuredSlugs
    .map((s) => STATIC_SEO_PAGES.find((p) => p.slug === s))
    .filter(Boolean) as typeof STATIC_SEO_PAGES;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: "대출 이자 계산기",
        inLanguage: "ko-KR",
        description:
          "대출 이자 계산, 월 상환금, 총 이자, 상환 스케줄 시뮬레이션",
      },
      {
        "@type": "WebApplication",
        name: "대출 이자 계산기",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "KRW",
        },
        url: absoluteUrl("/"),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="space-y-12">
        <section>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            대출 이자 계산 · 대출 이자 계산기
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            금액·금리·기간·상환 방식을 바꿔 가며{" "}
            <strong className="font-semibold text-slate-800">
              대출 이자 계산
            </strong>
            을 할 수 있습니다. 원리금균등·원금균등·만기일시 방식의 월 상환금,
            총 이자, 상환 스케줄을 함께 확인해 보세요. 아래 숫자는 예시이므로
            본인 조건에 맞게 수정하면 됩니다.
          </p>
        </section>

        <section aria-labelledby="repayment-types-heading">
          <h2
            id="repayment-types-heading"
            className="text-xl font-semibold text-slate-900"
          >
            상환 방식이란?
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            대출을 갚는 방식에 따라 매달 내는 돈의 크기와 총 이자가 달라집니다.
            세 가지의 차이를 먼저 익혀 두면 계산 결과를 이해하기 쉽습니다.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {REPAYMENT_ROUTES.map((r) => (
              <li
                key={r.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {methodLabel(r.method)}
                </h3>
                <p className="mt-1 text-xs font-medium text-sky-800">
                  {r.oneLiner}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {r.guide}
                </p>
                <Link
                  href={`/${r.slug}`}
                  className="mt-4 text-sm font-medium text-sky-700 hover:underline"
                >
                  {methodLabel(r.method)}만 쓰는 계산기 →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <MonetizationSlot id="home-calculator-top" />

        <section aria-label="대출 이자 계산기">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            대출 이자 계산기
          </h2>
          <LoanCalculator
            initialPrincipal={HOME_DEFAULT_PRINCIPAL}
            initialYears={HOME_DEFAULT_YEARS}
            initialRate={HOME_DEFAULT_RATE}
            initialMethod="equalPayment"
          />
        </section>

        <MonetizationSlot id="home-calculator-bottom" />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            자주 쓰는 조건으로 바로 계산
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="block rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-sky-800 hover:bg-sky-50"
                >
                  {p.h1.replace(/\s*\|.*$/, "")}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
