import type { RepaymentMethod } from "@/lib/loan-calculator";

/** 상환 방식별 공식 URL — 네비·사이트맵·페이지 데이터에서 공통 사용 */
export const REPAYMENT_ROUTES: {
  slug: string;
  method: RepaymentMethod;
  shortTitle: string;
  /** 푸터·목록용 한 줄 요약 */
  oneLiner: string;
  /** 계산기·안내 카드용 설명 */
  guide: string;
}[] = [
  {
    slug: "equal-payment",
    method: "equalPayment",
    shortTitle: "원리금균등",
    oneLiner: "매달 내는 총액(원금+이자)을 거의 같게 맞춥니다.",
    guide:
      "원리금균등상환은 매월 상환하는 돈의 합(원금+이자)이 거의 일정하게 유지되는 방식입니다. 초반에는 이자 비중이 크고, 시간이 지날수록 원금을 더 많이 갚게 됩니다. 매달 납입액을 예측하기 쉬워서 많이 선택합니다.",
  },
  {
    slug: "equal-principal",
    method: "equalPrincipal",
    shortTitle: "원금균등",
    oneLiner: "매달 갚는 원금은 같고, 월 상환액은 줄어듭니다.",
    guide:
      "원금균등상환은 매달 갚는 원금은 동일하고, 남은 대출 잔액에 대한 이자를 더해 내는 방식입니다. 그래서 첫 달 상환액이 가장 크고 이후 매달 조금씩 줄어듭니다. 초기 부담은 크지만, 같은 금리·기간이라면 총 이자는 원리금균등보다 적게 나오는 경우가 많습니다.",
  },
  {
    slug: "bullet-repayment",
    method: "bullet",
    shortTitle: "만기일시",
    oneLiner: "기간 중에는 이자만 내고, 만기에 원금을 한 번에 갚습니다.",
    guide:
      "만기일시상환은 대출 기간 동안에는 이자만 매월 납부하고, 마지막에 원금 전액을 한 번에 갚는 방식입니다. 월 현금 부담은 작아 보일 수 있지만, 만기에 큰 금액이 필요하므로 그때 갚을 자금 계획이 반드시 있어야 합니다.",
  },
];

export function getRepaymentRouteBySlug(
  slug: string
): (typeof REPAYMENT_ROUTES)[number] | undefined {
  return REPAYMENT_ROUTES.find((r) => r.slug === slug);
}

export function repaymentUserGuide(method: RepaymentMethod): string {
  return REPAYMENT_ROUTES.find((r) => r.method === method)?.guide ?? "";
}
