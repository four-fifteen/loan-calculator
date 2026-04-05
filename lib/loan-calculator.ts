import { roundWon } from "@/lib/money";

export type RepaymentMethod = "equalPayment" | "equalPrincipal" | "bullet";

const METHOD_LABEL_KO: Record<RepaymentMethod, string> = {
  equalPayment: "원리금균등상환",
  equalPrincipal: "원금균등상환",
  bullet: "만기일시상환",
};

export function methodLabel(method: RepaymentMethod): string {
  return METHOD_LABEL_KO[method];
}

/** 계산 가정 (UI·면책과 문구 일치) */
export const CALCULATION_ASSUMPTIONS =
  "연이율을 12로 나눈 월할 이율을 사용하고, 매 회차 이자·원금·잔액은 원 단위로 반올림합니다. 상환일·일할·절사 규칙은 금융기관별로 다를 수 있습니다.";

export type ScheduleRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type LoanSummary = {
  /** 매월 납입 총액 */
  monthlyPayments: number[];
  totalPrincipal: number;
  totalInterest: number;
  totalPaid: number;
  schedule: ScheduleRow[];
  /** 원리금균등: 매월 동일 목표 상환액(원 단위). 다른 방식은 null */
  equalPaymentInstallment: number | null;
};

function clampMonths(years: number): number {
  if (!Number.isFinite(years) || years <= 0) return 0;
  return Math.max(1, Math.round(years * 12));
}

/** 연 이율(%) → 월 이율(소수) */
export function annualToMonthlyRate(annualPercent: number): number {
  return annualPercent / 100 / 12;
}

function emptySummary(): LoanSummary {
  return {
    monthlyPayments: [],
    totalPrincipal: 0,
    totalInterest: 0,
    totalPaid: 0,
    schedule: [],
    equalPaymentInstallment: null,
  };
}

function finalizeFromSchedule(
  schedule: ScheduleRow[],
  totalPrincipal: number,
  equalPaymentInstallment: number | null
): LoanSummary {
  const monthlyPayments = schedule.map((r) => r.payment);
  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
  const totalPaid = schedule.reduce((s, r) => s + r.payment, 0);
  return {
    monthlyPayments,
    totalPrincipal,
    totalInterest,
    totalPaid,
    schedule,
    equalPaymentInstallment,
  };
}

/** 원리금균등 — 원 단위 반올림 스케줄, 마지막 회차 잔액 정산 */
export function calculateEqualPayment(
  principal: number,
  annualRatePercent: number,
  years: number
): LoanSummary {
  const n = clampMonths(years);
  const balance0 = roundWon(principal);
  if (n === 0 || balance0 <= 0) return emptySummary();

  const r = annualToMonthlyRate(annualRatePercent);
  let monthlyFixed: number;
  if (r === 0) {
    monthlyFixed = roundWon(balance0 / n);
  } else {
    const pow = Math.pow(1 + r, n);
    monthlyFixed = roundWon((balance0 * r * pow) / (pow - 1));
  }

  const schedule: ScheduleRow[] = [];
  let balance = balance0;

  for (let m = 1; m < n; m++) {
    const interest = roundWon(balance * r);
    let principalPart = monthlyFixed - interest;
    if (principalPart > balance) principalPart = balance;
    if (principalPart < 0) principalPart = 0;
    const payment = principalPart + interest;
    balance = roundWon(balance - principalPart);
    schedule.push({
      month: m,
      payment,
      principal: principalPart,
      interest,
      balance,
    });
  }

  const interest = roundWon(balance * r);
  const principalPart = balance;
  const payment = principalPart + interest;
  schedule.push({
    month: n,
    payment,
    principal: principalPart,
    interest,
    balance: 0,
  });

  return finalizeFromSchedule(schedule, balance0, monthlyFixed);
}

/** 원금균등 — 원금을 월별로 정수 분배(나머지 원을 앞 회차에 배분) */
export function calculateEqualPrincipal(
  principal: number,
  annualRatePercent: number,
  years: number
): LoanSummary {
  const n = clampMonths(years);
  const P0 = roundWon(principal);
  if (n === 0 || P0 <= 0) return emptySummary();

  const r = annualToMonthlyRate(annualRatePercent);
  const q = Math.floor(P0 / n);
  const rem = P0 - q * n;

  const schedule: ScheduleRow[] = [];
  let balance = P0;

  for (let m = 1; m <= n; m++) {
    const principalPart = q + (m <= rem ? 1 : 0);
    const interest = roundWon(balance * r);
    const payment = principalPart + interest;
    balance = roundWon(balance - principalPart);
    schedule.push({
      month: m,
      payment,
      principal: principalPart,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return finalizeFromSchedule(schedule, P0, null);
}

/** 만기일시 — 매월 이자만, 만기에 원금+이자 */
export function calculateBullet(
  principal: number,
  annualRatePercent: number,
  years: number
): LoanSummary {
  const n = clampMonths(years);
  const P0 = roundWon(principal);
  if (n === 0 || P0 <= 0) return emptySummary();

  const r = annualToMonthlyRate(annualRatePercent);
  const schedule: ScheduleRow[] = [];

  for (let m = 1; m < n; m++) {
    const interest = roundWon(P0 * r);
    const payment = interest;
    schedule.push({
      month: m,
      payment,
      principal: 0,
      interest,
      balance: P0,
    });
  }

  const interest = roundWon(P0 * r);
  const principalPart = P0;
  const payment = principalPart + interest;
  schedule.push({
    month: n,
    payment,
    principal: principalPart,
    interest,
    balance: 0,
  });

  return finalizeFromSchedule(schedule, P0, null);
}

export function calculateLoan(
  method: RepaymentMethod,
  principal: number,
  annualRatePercent: number,
  years: number
): LoanSummary {
  switch (method) {
    case "equalPayment":
      return calculateEqualPayment(principal, annualRatePercent, years);
    case "equalPrincipal":
      return calculateEqualPrincipal(principal, annualRatePercent, years);
    case "bullet":
      return calculateBullet(principal, annualRatePercent, years);
  }
}

export function formatKrw(n: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(roundWon(n));
}
