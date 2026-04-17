import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  STATIC_SEO_PAGES,
  getStaticPageBySlug,
} from "@/data/static-pages";
import { LoanCalculator } from "@/components/LoanCalculator";
import { JsonLd } from "@/components/JsonLd";
import { MonetizationSlot } from "@/components/monetization/MonetizationSlot";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { methodLabel } from "@/lib/loan-calculator";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STATIC_SEO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getStaticPageBySlug(slug);
  if (!page) return {};
  const path = `/${slug}`;
  const extraKeywords =
    page.kind === "repayment" && page.focusMethod
      ? [methodLabel(page.focusMethod), "상환 계산기", page.slug]
      : [page.slug.replace(/-/g, " ")];
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path,
    keywords: extraKeywords,
  });
}

export default async function SeoLoanPage({ params }: Props) {
  const { slug } = await params;
  const page = getStaticPageBySlug(slug);
  if (!page) {
    // Legacy cleanup: older versions generated many "loan-..." combo pages.
    // Keep UX/SEO tidy by permanently redirecting these removed cookie-cutter URLs.
    if (
      slug.startsWith("loan-") &&
      (slug.endsWith("-interest") || slug.includes("-interest-") || slug.includes("-pct-interest"))
    ) {
      permanentRedirect("/");
    }
    notFound();
  }

  const d = page.defaults;

  const faqJson = {
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const webAppJson = {
    "@type": "WebApplication",
    name: page.title,
    url: absoluteUrl(`/${slug}`),
    applicationCategory: "FinanceApplication",
    description: page.description,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
  };

  const breadcrumbJson = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1.replace(/\s*\|.*$/, "").trim(),
        item: absoluteUrl(`/${slug}`),
      },
    ],
  };

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [webAppJson, faqJson, breadcrumbJson] }} />
      <MonetizationSlot id={`page-${slug}-top`} />
      <article className="space-y-10" itemScope itemType="https://schema.org/WebPage">
        <header>
          <h1
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            itemProp="name"
          >
            {page.h1}
          </h1>
          <p className="mt-3 text-slate-600" itemProp="description">
            {page.description}
          </p>
        </header>

        <section aria-label="대출 이자 계산기">
          <h2 className="sr-only">대출 이자 계산기</h2>
          <LoanCalculator
            initialPrincipal={d.principal}
            initialYears={d.years}
            initialRate={d.annualRatePercent}
            initialMethod={d.method}
            focusMethod={page.focusMethod}
          />
        </section>

        <section className="max-w-none">
          <h2 className="text-xl font-semibold text-slate-900">
            대출 이자 계산 안내
          </h2>
          {page.bodyParagraphs.map((para, i) => (
            <p key={i} className="mt-4 leading-relaxed text-slate-700">
              {para}
            </p>
          ))}
        </section>

        <MonetizationSlot id={`page-${slug}-mid`} />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">자주 묻는 질문</h2>
          <ul className="mt-4 space-y-4">
            {page.faq.map((item) => (
              <li
                key={item.q}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="font-medium text-slate-900">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <MonetizationSlot id={`page-${slug}-bottom`} />
    </>
  );
}
