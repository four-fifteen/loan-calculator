/** 금액을 원 단위 정수로 반올림 (상환 스케줄 표시·합계 일치용) */
export function roundWon(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n);
}
