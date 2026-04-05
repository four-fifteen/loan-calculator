import type { ReactNode } from "react";

/**
 * 향후 애드센스 등 수익화 컴포넌트를 끼워 넣을 위치 표시용 래퍼.
 * 스크립트/CMP는 넣지 않음 — 이 컴포넌트 안에 나중에 자식으로 삽입하면 됨.
 */
type Props = {
  id: string;
  className?: string;
  children?: ReactNode;
};

export function MonetizationSlot({ id, className = "", children }: Props) {
  return (
    <aside
      data-monetization-slot={id}
      className={className}
      aria-label={children ? "추가 콘텐츠 영역" : undefined}
      hidden={!children}
    >
      {children}
    </aside>
  );
}
