"use client";

import { useMemo, useState } from "react";
import type { RepaymentMethod } from "@/lib/loan-calculator";
import {
  CALCULATION_ASSUMPTIONS,
  calculateLoan,
  formatKrw,
  methodLabel,
} from "@/lib/loan-calculator";
import { roundWon } from "@/lib/money";
import { AmortizationTable } from "@/components/AmortizationTable";
import { CalculatorDisclaimer } from "@/components/CalculatorDisclaimer";
import { repaymentUserGuide } from "@/data/repayment-routes";

type Props = {
  initialPrincipal: number;
  initialYears: number;
  initialRate: number;
  initialMethod: RepaymentMethod;
  focusMethod?: RepaymentMethod;
};

const METHODS: RepaymentMethod[] = [
  "equalPayment",
  "equalPrincipal",
  "bullet",
];

export function LoanCalculator({
  initialPrincipal,
  initialYears,
  initialRate,
  initialMethod,
  focusMethod,
}: Props) {
  const [principalEok, setPrincipalEok] = useState(
    initialPrincipal / 100_000_000
  );
  const [years, setYears] = useState(initialYears);
  const [rate, setRate] = useState(initialRate);
  const [method, setMethod] = useState<RepaymentMethod>(
    focusMethod ?? initialMethod
  );

  const principalWon = roundWon(Math.max(0, principalEok * 100_000_000));

  const validationError = useMemo(() => {
    if (!Number.isFinite(principalEok) || principalEok < 0) {
      return "대출금(억)을 올바른 숫자로 입력해 주세요.";
    }
    if (!Number.isFinite(years) || years < 1 || years > 50) {
      return "대출 기간은 1년 이상 50년 이하로 입력해 주세요.";
    }
    if (!Number.isFinite(rate) || rate < 0 || rate > 30) {
      return "연이율은 0% 이상 30% 이하로 입력해 주세요.";
    }
    if (principalWon <= 0) {
      return "대출금이 0원이면 계산할 수 없습니다.";
    }
    return null;
  }, [principalEok, years, rate, principalWon]);

  const summary = useMemo(() => {
    if (validationError) return null;
    return calculateLoan(method, principalWon, rate, years);
  }, [method, principalWon, rate, years, validationError]);

  const firstMonth = summary?.schedule[0]?.payment ?? 0;
  const lastMonth =
    summary && summary.schedule.length > 0
      ? summary.schedule[summary.schedule.length - 1]!.payment
      : 0;

  const avgMonthly =
    summary && summary.monthlyPayments.length > 0
      ? roundWon(
          summary.monthlyPayments.reduce((a, b) => a + b, 0) /
            summary.monthlyPayments.length
        )
      : 0;

  return (
    <div className="space-y-8">
      <CalculatorDisclaimer />

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            대출금 (억 원)
            <input
              type="number"
              min={0}
              step={0.1}
              value={Number.isFinite(principalEok) ? principalEok : 0}
              onChange={(e) => setPrincipalEok(Number(e.target.value))}
              className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            <span className="text-xs font-normal text-slate-500">
              ≈ {formatKrw(principalWon)}
            </span>
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            대출 기간 (년)
            <input
              type="number"
              min={1}
              max={50}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            연이율 (%)
            <input
              type="number"
              min={0}
              max={30}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </label>
          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
            <span className="text-sm font-medium text-slate-700">상환 방식</span>
            <div className="flex flex-col gap-2">
              {METHODS.map((m) => {
                const active = method === m;
                const disabled = !!focusMethod && focusMethod !== m;
                return (
                  <button
                    key={m}
                    type="button"
                    disabled={disabled}
                    onClick={() => setMethod(m)}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                      active
                        ? "border-sky-500 bg-sky-50 font-medium text-sky-900 ring-1 ring-sky-500"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                  >
                    {methodLabel(m)}
                  </button>
                );
              })}
            </div>
            {focusMethod && (
              <span className="text-xs text-slate-500">
                이 페이지는 {methodLabel(focusMethod)}만 계산합니다.
              </span>
            )}
          </div>
        </div>

        <div
          className="mt-5 rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3 text-sm leading-relaxed text-slate-800"
          role="region"
          aria-labelledby="method-guide-heading"
        >
          <h3
            id="method-guide-heading"
            className="text-sm font-semibold text-sky-950"
          >
            {methodLabel(method)}이란?
          </h3>
          <p className="mt-2 text-slate-700">{repaymentUserGuide(method)}</p>
        </div>

        {validationError && (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {validationError}
          </p>
        )}
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          {CALCULATION_ASSUMPTIONS}
        </p>
      </div>

      {summary && (
        <>
          <section
            aria-label="요약 결과"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {method === "equalPayment" && summary.equalPaymentInstallment != null && (
              <ResultCard
                label="매월 상환액 (원리금균등)"
                value={formatKrw(summary.equalPaymentInstallment)}
                hint="중간 회차 기준. 마지막 회차는 잔액 정산으로 다를 수 있음"
              />
            )}
            {method === "equalPrincipal" && (
              <ResultCard
                label="월 상환액 (첫 달 → 마지막 달)"
                value={`${formatKrw(firstMonth)} → ${formatKrw(lastMonth)}`}
                hint="원금균등은 초기 월액이 가장 크고 이후 감소"
              />
            )}
            {method === "bullet" && (
              <>
                <ResultCard
                  label="월 이자 (만기 전)"
                  value={formatKrw(summary.schedule[0]?.interest ?? 0)}
                  hint="원금은 만기에 일시 상환"
                />
                <ResultCard
                  label="만기 상환액 (마지막 달)"
                  value={formatKrw(lastMonth)}
                  hint="원금 + 마지막 이자"
                />
              </>
            )}
            <ResultCard
              label="월 상환 평균"
              value={formatKrw(avgMonthly)}
              hint="납입 총액 ÷ 개월 수"
            />
            <ResultCard
              label="총 이자"
              value={formatKrw(summary.totalInterest)}
              hint="아래 표의 이자 칸을 모두 더한 값"
            />
            <ResultCard
              label="총 상환액"
              value={formatKrw(summary.totalPaid)}
              hint="아래 표의 월 상환액을 모두 더한 값"
            />
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              상환 스케줄
            </h2>
            <AmortizationTable schedule={summary.schedule} />
          </section>
        </>
      )}
    </div>
  );
}

function ResultCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        {value}
      </p>
      <p className="mt-2 text-xs text-slate-500">{hint}</p>
    </div>
  );
}
