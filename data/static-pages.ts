import { methodLabel, type RepaymentMethod } from "@/lib/loan-calculator";
import {
  buildComboAmountIntro,
  buildComboAmountRateIntro,
  buildComboAmountTermIntro,
  buildRepaymentIntro,
  defaultFaqs,
} from "@/lib/seo-copy";
import { REPAYMENT_ROUTES } from "@/data/repayment-routes";

export type PageKind = "repayment" | "combo_amount" | "combo_term" | "combo_rate";

export type StaticSeoPage = {
  slug: string;
  kind: PageKind;
  /** 상환 전용 페이지에서 강조할 방식 */
  focusMethod?: RepaymentMethod;
  defaults: {
    principal: number;
    years: number;
    annualRatePercent: number;
    method: RepaymentMethod;
  };
  h1: string;
  title: string;
  description: string;
  bodyParagraphs: string[];
  faq: { q: string; a: string }[];
};

const EOK_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15] as const;
const YEAR_VALUES = [10, 15, 20, 25, 30, 35, 40] as const;
const RATE_VALUES = [2, 3, 4, 5, 6, 7] as const;

const DEFAULT_YEARS = 30;
const DEFAULT_RATE = 4.5;

function eokToPrincipal(eok: number): number {
  return Math.round(eok * 100_000_000);
}

/** 1억 = 100 million KRW → URL용 금액 구간 (예: 1억 → 100m) */
function amountSlugM(eok: number): string {
  return `${Math.round(eok * 100)}m`;
}

function slugLoanAmountInterest(eok: number): string {
  return `loan-${amountSlugM(eok)}-interest`;
}

function slugLoanAmountTermInterest(eok: number, years: number): string {
  return `loan-${amountSlugM(eok)}-${years}y-interest`;
}

function slugLoanAmountRateInterest(eok: number, rate: number): string {
  const r = Number.isInteger(rate) ? String(rate) : String(rate).replace(".", "p");
  return `loan-${amountSlugM(eok)}-${r}pct-interest`;
}

function buildRepaymentPages(): StaticSeoPage[] {
  return REPAYMENT_ROUTES.map(({ slug, method }) => {
    const defaults = {
      principal: eokToPrincipal(3),
      years: DEFAULT_YEARS,
      annualRatePercent: DEFAULT_RATE,
      method,
    };
    const ml = methodLabel(method);
    const bodyParagraphs = buildRepaymentIntro(method, defaults);
    return {
      slug,
      kind: "repayment",
      focusMethod: method,
      defaults,
      h1: `${ml} 대출 이자 계산기 | 월 상환금·총 이자 시뮬레이션`,
      title: `${ml} 대출 이자 계산기 | 월 상환금·총 이자·상환 스케줄`,
      description: `${ml} 방식의 월 상환금, 총 이자, 총 상환액을 무료로 계산합니다. 대출 이자 계산과 상환 스케줄을 한 화면에서 확인하세요.`,
      bodyParagraphs,
      faq: defaultFaqs({ kind: "repayment", method }),
    };
  });
}

function buildAmountOnlyPages(): StaticSeoPage[] {
  return EOK_VALUES.map((eok) => {
    const principal = eokToPrincipal(eok);
    const defaults = {
      principal,
      years: DEFAULT_YEARS,
      annualRatePercent: DEFAULT_RATE,
      method: "equalPayment" as RepaymentMethod,
    };
    const slug = slugLoanAmountInterest(eok);
    return {
      slug,
      kind: "combo_amount",
      defaults,
      h1: `${eok}억 대출 이자 계산 | 월 상환금·총 이자`,
      title: `${eok}억 대출 이자 계산기 | 월 상환금·총 이자·상환 스케줄`,
      description: `${eok}억 대출의 월 상환금과 총 이자를 금리·기간·상환 방식별로 계산합니다. 대출 이자 계산기로 빠르게 시뮬레이션하세요.`,
      bodyParagraphs: buildComboAmountIntro(eok),
      faq: defaultFaqs({ kind: "combo", eok }),
    };
  });
}

function buildAmountTermPages(): StaticSeoPage[] {
  const pages: StaticSeoPage[] = [];
  for (const eok of EOK_VALUES) {
    for (const years of YEAR_VALUES) {
      const principal = eokToPrincipal(eok);
      const defaults = {
        principal,
        years,
        annualRatePercent: DEFAULT_RATE,
        method: "equalPayment" as RepaymentMethod,
      };
      const slug = slugLoanAmountTermInterest(eok, years);
      pages.push({
        slug,
        kind: "combo_term",
        defaults,
        h1: `${eok}억 ${years}년 대출 이자·월 상환금 계산`,
        title: `${eok}억 ${years}년 대출 이자 계산기 | 월 상환금·총 이자`,
        description: `${eok}억을 ${years}년 만기로 갚을 때 월 상환금과 총 이자를 계산합니다. 대출 이자 계산을 조건별로 비교해 보세요.`,
        bodyParagraphs: buildComboAmountTermIntro(eok, years),
        faq: defaultFaqs({ kind: "combo", eok, years }),
      });
    }
  }
  return pages;
}

function buildAmountRatePages(): StaticSeoPage[] {
  const pages: StaticSeoPage[] = [];
  for (const eok of EOK_VALUES) {
    for (const rate of RATE_VALUES) {
      const principal = eokToPrincipal(eok);
      const defaults = {
        principal,
        years: DEFAULT_YEARS,
        annualRatePercent: rate,
        method: "equalPayment" as RepaymentMethod,
      };
      const slug = slugLoanAmountRateInterest(eok, rate);
      pages.push({
        slug,
        kind: "combo_rate",
        defaults,
        h1: `${eok}억 금리 ${rate}% 대출 이자 계산`,
        title: `${eok}억 금리 ${rate}% 대출 이자 계산기 | 월 상환금·총 이자`,
        description: `연 ${rate}% 금리의 ${eok}억 대출 월 상환금과 총 이자를 계산합니다. 대출 이자 계산기로 상환 스케줄까지 확인하세요.`,
        bodyParagraphs: buildComboAmountRateIntro(eok, rate),
        faq: defaultFaqs({ kind: "combo", eok, rate }),
      });
    }
  }
  return pages;
}

export const STATIC_SEO_PAGES: StaticSeoPage[] = [
  ...buildRepaymentPages(),
  ...buildAmountOnlyPages(),
  ...buildAmountTermPages(),
  ...buildAmountRatePages(),
];

const bySlug = new Map(STATIC_SEO_PAGES.map((p) => [p.slug, p]));

export function getStaticPageBySlug(slug: string): StaticSeoPage | undefined {
  return bySlug.get(slug);
}

export function getAllStaticSlugs(): string[] {
  return STATIC_SEO_PAGES.map((p) => p.slug);
}
