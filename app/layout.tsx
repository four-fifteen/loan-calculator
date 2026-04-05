import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/SiteFooter";
import { MonetizationSlot } from "@/components/monetization/MonetizationSlot";
import { REPAYMENT_ROUTES } from "@/data/repayment-routes";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "대출 이자 계산기 | 월 상환금·총 이자·상환 스케줄",
    template: "%s | 대출 이자 계산기",
  },
  description:
    "대출 이자 계산과 원리금균등·원금균등·만기일시 상환을 무료로 시뮬레이션하세요. 금액·금리·기간별 전용 페이지와 상환 스케줄을 제공합니다.",
  keywords: [
    "대출 이자 계산",
    "대출 이자 계산기",
    "월 상환금",
    "원리금균등",
    "원금균등",
    "만기일시",
    "상환 스케줄",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "대출 이자 계산기",
  },
  twitter: {
    card: "summary_large_image",
    title: "대출 이자 계산기 | 월 상환금·총 이자·상환 스케줄",
    description:
      "원리금균등·원금균등·만기일시 대출 이자 계산과 상환 스케줄을 무료로 제공합니다.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "WhZuCLkCYnATOsX96An8TslPXRBPN31EUegnk3FZrvQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans">
        <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <MonetizationSlot id="layout-top" />
          <header className="mb-10 flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-slate-900 hover:text-sky-700"
              >
                대출 이자 계산기
              </Link>
              <p className="mt-1 text-sm text-slate-600">
                원리금균등·원금균등·만기일시 | 월 상환금·총 이자·스케줄
              </p>
            </div>
            <nav
              className="flex flex-wrap gap-2 text-sm"
              aria-label="상환 방식 바로가기"
            >
              {REPAYMENT_ROUTES.map((r) => (
                <Link
                  key={r.slug}
                  title={r.oneLiner}
                  className="rounded-full bg-white px-3 py-1 text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                  href={`/${r.slug}`}
                >
                  {r.shortTitle}
                </Link>
              ))}
            </nav>
          </header>
          {children}
          <MonetizationSlot id="layout-bottom" />
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
