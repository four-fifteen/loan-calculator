import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "개인정보처리방침",
  description:
    "대출 이자 계산기의 개인정보·쿠키·제3자 광고(구글 애드센스) 관련 안내입니다.",
  path: "/privacy",
  keywords: ["개인정보처리방침", "쿠키", "애드센스"],
});

export default function PrivacyPage() {
  return (
    <article className="space-y-10 pb-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          개인정보처리방침
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          본 방침은「대출 이자 계산기」웹사이트(이하 &quot;사이트&quot;)에 적용됩니다.
          사이트를 이용함으로써 아래 내용에 동의하는 것으로 간주될 수 있습니다.
          방침은 법령·서비스 변경에 따라 수정될 수 있으며, 중요한 변경 시 사이트를
          통해 안내하는 것을 원칙으로 합니다.
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

      <section
        className="space-y-3 text-sm leading-relaxed text-slate-600"
        aria-labelledby="privacy-purpose"
      >
        <h2
          id="privacy-purpose"
          className="text-lg font-semibold text-slate-900"
        >
          1. 운영 목적
        </h2>
        <p>
          사이트는 대출 이자·월 상환금 등을 시뮬레이션하는 참고용 계산 도구와
          관련 정보를 제공합니다. 금융상품 판매·중개·투자 자문을 하지 않으며,
          계산에 입력한 값은 참고용 시뮬레이션에만 사용됩니다.
        </p>
      </section>

      <section
        className="space-y-3 text-sm leading-relaxed text-slate-600"
        aria-labelledby="privacy-collection"
      >
        <h2
          id="privacy-collection"
          className="text-lg font-semibold text-slate-900"
        >
          2. 수집하는 개인정보
        </h2>
        <p>
          사이트는 회원 가입·로그인을 제공하지 않으며, 성명·연락처·주민등록번호 등
          일반적인 의미의 개인정보를 별도로 수집·저장하지 않습니다.
        </p>
        <p>
          계산기에 입력하는 금액·금리·기간 등은 이용자 기기(브라우저)에서 계산 처리되는
          것을 원칙으로 하며, 사이트 운영자가 해당 입력값을 서버에 저장하거나
          식별 가능한 형태로 수집하는 절차는 두지 않습니다.
        </p>
        <p>
          다만 웹사이트 운영에 필요한 범위에서 서버 로그(IP 주소, 접속 시각, 브라우저
          종류 등)가 자동으로 기록될 수 있습니다. 이는 보안·통계·장애 대응 목적에
          한해 제한적으로 활용될 수 있습니다.
        </p>
      </section>

      <section
        className="space-y-3 text-sm leading-relaxed text-slate-600"
        aria-labelledby="privacy-cookies-ads"
      >
        <h2
          id="privacy-cookies-ads"
          className="text-lg font-semibold text-slate-900"
        >
          3. 쿠키 및 제3자 광고(구글 애드센스)
        </h2>
        <p>
          사이트는 광고 제공을 위해 구글 애드센스(Google AdSense) 등 제3자 광고
          서비스를 사용할 수 있습니다. 광고가 게재되는 경우, 광고 사업자는 맞춤형
          광고·측정·사기 방지 등을 위해 쿠키·유사 기술(예: 로컬 스토리지, 광고
          식별자)을 사용할 수 있습니다.
        </p>
        <p>
          구글을 비롯한 제3자 광고 사업자는 이용자의 사이트 방문 정보를 바탕으로
          광고를 게재할 수 있으며, 이 과정에서{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            className="font-medium text-sky-700 underline decoration-sky-700/30 underline-offset-2 hover:decoration-sky-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            구글 광고에서 쿠키를 사용하는 방식
          </a>
          에 설명된 바와 같이 쿠키가 사용될 수 있습니다.
        </p>
        <p>
          맞춤형 광고에 사용되는 정보의 수집·이용에 관한 자세한 내용은{" "}
          <a
            href="https://policies.google.com/privacy"
            className="font-medium text-sky-700 underline decoration-sky-700/30 underline-offset-2 hover:decoration-sky-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            구글 개인정보처리방침
          </a>
          을 참고하시기 바랍니다. EU·영국 등 일부 지역에서는 동의 관리 도구(CMP)를
          통해 광고 관련 선택을 제공할 수 있습니다.
        </p>
        <p>
          브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있으며,{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="font-medium text-sky-700 underline decoration-sky-700/30 underline-offset-2 hover:decoration-sky-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 광고 설정
          </a>
          에서 맞춤형 광고를 끌 수 있습니다. 쿠키를 차단하면 일부 기능이 제한될 수
          있습니다.
        </p>
      </section>

      <section
        className="space-y-3 text-sm leading-relaxed text-slate-600"
        aria-labelledby="privacy-third"
      >
        <h2
          id="privacy-third"
          className="text-lg font-semibold text-slate-900"
        >
          4. 제3자 제공 및 처리위탁
        </h2>
        <p>
          광고·분석 등 제3자 서비스 연동 시, 해당 사업자의 정책에 따라 이용자
          단말 정보·쿠키 식별자 등이 제3자에게 전달되거나 제3자가 직접 수집할 수
          있습니다. 사이트 운영자는 계약·정책에 따라 필요한 범위에서만 연동합니다.
        </p>
      </section>

      <section
        className="space-y-3 text-sm leading-relaxed text-slate-600"
        aria-labelledby="privacy-rights"
      >
        <h2
          id="privacy-rights"
          className="text-lg font-semibold text-slate-900"
        >
          5. 이용자의 권리
        </h2>
        <p>
          개인정보 보호 관련 문의·열람·정정·삭제 요구 등은 사이트에 공개된 연락
          수단(있는 경우)으로 요청할 수 있습니다. 다만 본 사이트가 식별 가능한
          개인정보를 별도 보관하지 않는 구조인 경우, 해당 요청에 응할 수 없는
          항목이 있을 수 있습니다.
        </p>
      </section>

      <section
        className="space-y-3 text-sm leading-relaxed text-slate-600"
        aria-labelledby="privacy-children"
      >
        <h2
          id="privacy-children"
          className="text-lg font-semibold text-slate-900"
        >
          6. 아동
        </h2>
        <p>
          사이트는 14세 미만 아동을 대상으로 고의로 개인정보를 수집하지 않습니다.
        </p>
      </section>

      <section
        className="space-y-3 text-sm leading-relaxed text-slate-600"
        aria-labelledby="privacy-contact"
      >
        <h2
          id="privacy-contact"
          className="text-lg font-semibold text-slate-900"
        >
          7. 문의
        </h2>
        <p>
          본 방침에 대한 문의는 사이트 운영자에게 연락해 주시기 바랍니다. 연락처를
          별도로 두지 않은 경우, 사이트 도메인 등록 정보 또는 호스팅 사업자
          안내에 따른 공개 연락 경로를 이용해 주시기 바랍니다.
        </p>
      </section>

      <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
        계산 결과·본 사이트 정보는 참고용이며 법적·금융기관 확정 정보가 아닙니다.
        최종 조건은 해당 금융기관을 통해 확인하시기 바랍니다. 자세한 면책은{" "}
        <Link
          href="/#site-disclaimer"
          className="font-medium text-sky-700 hover:underline"
        >
          하단 면책 안내
        </Link>
        를 참고하세요.
      </p>

      <p>
        <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">
          ← 홈으로
        </Link>
      </p>
    </article>
  );
}
