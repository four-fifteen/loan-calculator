import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "이용약관",
  description:
    "대출 이자 계산기 웹사이트 이용약관(서비스 성격, 책임 제한, 지적재산권, 광고/외부링크)을 안내합니다.",
  path: "/terms",
  keywords: ["이용약관", "면책", "책임 제한"],
});

export default function TermsPage() {
  return (
    <article className="space-y-10 pb-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          이용약관
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          본 약관은 「대출 이자 계산기」(이하 “사이트”)의 이용과 관련하여 사이트와
          이용자 간의 기본적인 권리·의무 및 책임 사항을 규정합니다.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          시행일:{" "}
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <section className="space-y-3" aria-labelledby="terms-service">
        <h2 id="terms-service" className="text-lg font-semibold text-slate-900">
          1. 서비스의 성격
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          사이트는 원리금균등·원금균등·만기일시 상환 방식 등을 바탕으로 대출 이자와
          상환 스케줄을 계산하는 “참고용 시뮬레이션 도구”를 제공합니다. 사이트는
          금융상품의 판매·중개·투자 자문·대출 승인과 관련된 어떤 보증도 제공하지
          않습니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="terms-user">
        <h2 id="terms-user" className="text-lg font-semibold text-slate-900">
          2. 이용자의 책임
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          이용자는 본인의 판단과 책임 하에 사이트를 이용해야 하며, 계산 결과를 실제
          약정 또는 금융기관 안내와 동일하다고 가정해서는 안 됩니다. 최종 금리·한도·
          수수료·상환 조건은 반드시 금융기관의 견적서/약정서를 기준으로 확인해야
          합니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="terms-liability">
        <h2 id="terms-liability" className="text-lg font-semibold text-slate-900">
          3. 책임 제한
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          사이트는 계산 오류, 서비스 중단, 데이터 손실, 제3자 링크/콘텐츠, 광고 노출로
          인해 발생하는 직접·간접·부수적 손해에 대해 법령이 허용하는 범위에서 책임을
          제한합니다.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          특히 실제 대출은 일할 계산, 절사/올림 규칙, 상환일, 금리 재산정, 중도상환
          수수료 등에 따라 결과가 달라질 수 있으므로, 사이트 결과는 참고용으로만
          사용해야 합니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="terms-links">
        <h2 id="terms-links" className="text-lg font-semibold text-slate-900">
          4. 외부 링크 및 광고
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          사이트에는 제3자 웹사이트로 연결되는 링크가 포함될 수 있으며, 링크된
          웹사이트의 콘텐츠·정책에 대해 사이트가 통제하거나 책임지지 않습니다. 또한
          사이트는 운영을 위해 제3자 광고(예: Google AdSense)를 게재할 수 있습니다.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          광고와 관련된 쿠키/식별자 사용 등은{" "}
          <Link href="/privacy" className="font-medium text-sky-700 hover:underline">
            개인정보처리방침
          </Link>
          에서 안내합니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="terms-changes">
        <h2 id="terms-changes" className="text-lg font-semibold text-slate-900">
          5. 약관의 변경
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          사이트는 법령 또는 서비스 운영상 필요에 따라 약관을 변경할 수 있으며, 중요한
          변경이 있는 경우 사이트 내 공지 또는 적절한 방법으로 안내하는 것을 원칙으로
          합니다.
        </p>
      </section>

      <p>
        <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
          ← 홈으로
        </Link>
      </p>
    </article>
  );
}

