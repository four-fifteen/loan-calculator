import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "문의하기",
  description:
    "대출 이자 계산기 사이트의 오류 제보·개선 제안·정책 문의를 위한 안내 페이지입니다.",
  path: "/contact",
  keywords: ["문의", "오류 제보", "개선 제안"],
});

export default function ContactPage() {
  return (
    <article className="space-y-10 pb-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          문의하기
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          이 페이지는 “연락 가능한 경로가 없는 사이트”로 보이지 않도록, 문의 방법과
          처리 범위를 명확히 안내하기 위한 페이지입니다.
        </p>
      </header>

      <section className="space-y-3" aria-labelledby="contact-scope">
        <h2 id="contact-scope" className="text-lg font-semibold text-slate-900">
          1. 어떤 문의를 받나요?
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>
            계산 결과가 특정 금융기관과 크게 달라 보이는 경우(예: 반올림/절사 방식,
            상환일 차이로 인한 오차)
          </li>
          <li>오탈자, 링크 오류, 페이지 접근 문제</li>
          <li>새로운 가이드/FAQ 주제 제안</li>
          <li>개인정보/쿠키/광고 관련 정책 문의</li>
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="contact-how">
        <h2 id="contact-how" className="text-lg font-semibold text-slate-900">
          2. 연락 방법
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          현재는 별도의 회원 시스템이나 고객센터를 운영하지 않습니다. 가능한 연락
          경로는 배포 환경(예: Vercel 프로젝트/저장소)에서 제공하는 공개 채널을 통해
          안내하는 것을 원칙으로 합니다.
        </p>
        <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
          운영자가 공개 이메일을 즉시 제공하지 않더라도, 광고/정책 관련 통지 또는
          법적 요청 등은 호스팅 사업자나 도메인 등록 정보의 공개 채널을 통해 전달될 수
          있습니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="contact-what-to-send">
        <h2 id="contact-what-to-send" className="text-lg font-semibold text-slate-900">
          3. 오류 제보 시 포함하면 좋은 정보
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>문제가 발생한 페이지 주소(URL)</li>
          <li>입력값(대출금·기간·금리·상환 방식)과 기대 결과</li>
          <li>사용한 기기/브라우저(예: iPhone Safari, Windows Chrome 등)</li>
          <li>가능하다면 스크린샷</li>
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="contact-links">
        <h2 id="contact-links" className="text-lg font-semibold text-slate-900">
          4. 관련 문서
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>
            <Link href="/about" className="font-medium text-sky-700 hover:underline">
              사이트 소개
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="font-medium text-sky-700 hover:underline">
              개인정보처리방침
            </Link>
          </li>
          <li>
            <Link href="/terms" className="font-medium text-sky-700 hover:underline">
              이용약관
            </Link>
          </li>
        </ul>
      </section>

      <p>
        <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
          ← 홈으로
        </Link>
      </p>
    </article>
  );
}

