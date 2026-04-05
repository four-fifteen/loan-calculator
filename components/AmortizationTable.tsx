"use client";

import { useMemo, useState } from "react";
import type { ScheduleRow } from "@/lib/loan-calculator";
import { formatKrw } from "@/lib/loan-calculator";

type Props = {
  schedule: ScheduleRow[];
};

const LIMIT_PRESETS = [12, 24, 60, 120, 360, 600] as const;

export function AmortizationTable({ schedule }: Props) {
  const maxMonths = schedule.length;
  const limitChoices = useMemo(() => {
    const s = new Set<number>([...LIMIT_PRESETS, maxMonths]);
    return [...s].filter((n) => n > 0).sort((a, b) => a - b);
  }, [maxMonths]);

  const [limit, setLimit] = useState<number>(60);

  const effectiveLimit = useMemo(() => {
    if (maxMonths === 0) return 0;
    return Math.min(limit, maxMonths);
  }, [maxMonths, limit]);

  const selectValue = limitChoices.includes(limit) ? limit : maxMonths;

  const rows = schedule.slice(0, effectiveLimit);
  const hidden = schedule.length - rows.length;

  if (schedule.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
        조건을 입력하면 상환 스케줄이 표시됩니다.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
        <span>전체 {schedule.length}개월</span>
        <label className="flex items-center gap-2">
          <span className="sr-only">표시 개수</span>
          <span>표시:</span>
          <select
            value={selectValue}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="rounded-lg border border-slate-300 bg-white px-2 py-1 font-mono text-slate-800 shadow-sm"
          >
            {limitChoices.map((n) => (
              <option key={n} value={n}>
                {n}개월{n >= maxMonths ? " (전체)" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm text-slate-800">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">회차</th>
              <th className="px-4 py-3">월 상환액</th>
              <th className="px-4 py-3">원금</th>
              <th className="px-4 py-3">이자</th>
              <th className="px-4 py-3">잔액</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.month}
                className="border-t border-slate-100 odd:bg-white even:bg-slate-50/60"
              >
                <td className="px-4 py-2 font-mono text-slate-700">{r.month}</td>
                <td className="px-4 py-2 font-mono">{formatKrw(r.payment)}</td>
                <td className="px-4 py-2 font-mono text-emerald-800">
                  {formatKrw(r.principal)}
                </td>
                <td className="px-4 py-2 font-mono text-amber-800">
                  {formatKrw(r.interest)}
                </td>
                <td className="px-4 py-2 font-mono text-slate-600">
                  {formatKrw(r.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hidden > 0 && (
          <p className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-600">
            위 드롭다운에서 표시 개수를 늘리면 나머지 {hidden}개월을 볼 수 있습니다.
          </p>
        )}
      </div>
    </div>
  );
}
