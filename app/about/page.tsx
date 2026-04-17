import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "사이트 소개",
  description:
    "대출 이자 계산기 사이트의 목적, 계산 방식, 데이터 처리 방식(로컬 계산), 참고/면책 사항을 안내합니다.",
  path: "/about",
  keywords: ["사이트 소개", "대출 계산기", "계산 방식", "면책"],
});

export default function AboutPage() {
  return (
    <article className="space-y-10 pb-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          사이트 소개
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          「대출 이자 계산기」는 원리금균등·원금균등·만기일시 상환을 기준으로{" "}
          <strong className="font-semibold text-slate-800">
            월 상환금, 총 이자, 상환 스케줄
          </strong>
          을 빠르게 비교할 수 있는 참고용 도구입니다.
        </p>
      </header>

      <section className="space-y-3" aria-labelledby="about-why">
        <h2 id="about-why" className="text-lg font-semibold text-slate-900">
          1. 이 사이트가 제공하는 가치
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          대출은 같은 금리라도 “어떻게 갚느냐”에 따라 매달 현금흐름과 총 이자 부담이
          달라집니다. 이 사이트는 입력값을 바꿔 가며 세 가지 상환 방식의 결과를
          직관적으로 비교하고, 월별로 원금·이자·잔액이 어떻게 변하는지 표로 확인할
          수 있도록 구성했습니다.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          특정 금융상품의 판매·중개·광고성 추천을 목적으로 하지 않습니다. 사용자가
          스스로 조건을 설정해 “가능한 범위”를 가늠하고, 이후 금융기관의 견적서/약정서
          확인으로 이어지도록 돕는 것이 목적입니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="about-how">
        <h2 id="about-how" className="text-lg font-semibold text-slate-900">
          2. 계산 방식(가정)
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          본 계산기는 일반적으로 널리 쓰이는 상환 수식을 기반으로, 연이율을 12개월로
          나눈 월할 이율을 사용해 회차별 이자·원금을 산정합니다. 각 회차 값은 원 단위로
          반올림되며, 마지막 회차는 잔액 정산을 위해 소폭 달라질 수 있습니다.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          실제 금융기관은 일할 계산(실제 일수), 절사/올림 규칙, 상환일, 수수료, 금리
          재산정 주기 등에 따라 다른 숫자를 제시할 수 있습니다. 따라서 결과는 참고용
          추정치이며 법적·계약적 효력을 갖지 않습니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="about-data">
        <h2 id="about-data" className="text-lg font-semibold text-slate-900">
          3. 데이터 처리(입력값)
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          계산 입력값(대출금·금리·기간·상환 방식)은 브라우저에서 계산에 사용되는 것을
          원칙으로 하며, 운영자가 해당 입력값을 사용자 식별 가능한 형태로 저장하는
          기능을 두지 않습니다. 자세한 내용은{" "}
          <Link href="/privacy" className="font-medium text-sky-700 hover:underline">
            개인정보처리방침
          </Link>
          에서 확인할 수 있습니다.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="about-next">
        <h2 id="about-next" className="text-lg font-semibold text-slate-900">
          4. 더 알아보기
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>
            계산기를 바로 쓰려면{" "}
            <Link href="/" className="font-medium text-sky-700 hover:underline">
              홈
            </Link>
            으로 이동하세요.
          </li>
          <li>
            상환 방식별 차이는{" "}
            <Link
              href="/guides/repayment-types"
              className="font-medium text-sky-700 hover:underline"
            >
              상환 방식 가이드
            </Link>
            에서 정리했습니다.
          </li>
          <li>
            문의가 필요하면{" "}
            <Link href="/contact" className="font-medium text-sky-700 hover:underline">
              문의하기
            </Link>
            를 이용하세요.
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

