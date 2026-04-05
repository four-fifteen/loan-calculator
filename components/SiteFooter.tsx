import Link from "next/link";
import { methodLabel } from "@/lib/loan-calculator";
import { REPAYMENT_ROUTES } from "@/data/repayment-routes";

export function SiteFooter() {
  return (
    <footer
      id="site-disclaimer"
      className="mt-16 border-t border-slate-200 pt-10 pb-8"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            상환 방식 안내
          </h2>
          <ul className="mt-3 space-y-4 text-sm text-slate-600">
            {REPAYMENT_ROUTES.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${r.slug}`}
                  className="font-medium text-sky-700 hover:underline"
                >
                  {methodLabel(r.method)} 계산기
                </Link>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {r.guide}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">면책 및 안내</h2>
          <div className="mt-3 space-y-3 text-xs leading-relaxed text-slate-600">
            <p>
              이 사이트는 금융상품 판매·중개·투자 자문을 하지 않습니다. 계산 결과는
              교육·비교 목적의 시뮬레이션이며, 법적 효력이나 금융기관의 인가·검증을
              받은 것이 아닙니다. 대출 실행·상환·금리·한도·규제(예: DSR) 관련 최종
              결정은 반드시 해당 금융기관 및 전문가 상담을 통해 이루어져야 합니다.
            </p>
            <p>
              운영자는 계산 오류·서비스 중단·제3자 링크 등으로 발생한 직·간접 손해에
              대해 책임을 지지 않습니다. 사이트 정보는 예고 없이 변경될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <nav
        className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-slate-100 pt-6 text-xs text-slate-500"
        aria-label="정책 및 저작권"
      >
        <Link
          href="/privacy"
          className="font-medium text-sky-700 hover:underline"
        >
          개인정보처리방침
        </Link>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <span>
          © {new Date().getFullYear()} 대출 이자 계산기 · 참고용 도구
        </span>
      </nav>
    </footer>
  );
}
