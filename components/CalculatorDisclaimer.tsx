import Link from "next/link";

/** 계산기 인근에 두는 짧은 면책 — 상세는 푸터 */
export function CalculatorDisclaimer() {
  return (
    <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
      본 계산기는 <strong className="font-medium text-slate-700">참고용 추정치</strong>
      입니다. 연이율을 12개월로 나눈 월할 이율로 매월 이자를{" "}
      <strong className="font-medium text-slate-700">원 단위 반올림</strong>하여
      스케줄을 만듭니다. 실제 금융기관은 일할·상환일·수수료·중도상환 등으로 금액이
      달라질 수 있습니다.{" "}
      <Link href="#site-disclaimer" className="text-sky-700 underline-offset-2 hover:underline">
        면책 전문
      </Link>
    </p>
  );
}
