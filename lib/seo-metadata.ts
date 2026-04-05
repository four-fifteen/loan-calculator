import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

const DEFAULT_KEYWORDS = [
  "대출 이자 계산",
  "대출 이자 계산기",
  "월 상환금",
  "원리금균등",
  "원금균등",
  "만기일시",
  "상환 스케줄",
];

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(input.path);
  const keywords = [...DEFAULT_KEYWORDS, ...(input.keywords ?? [])];
  return {
    title: input.title,
    description: input.description,
    keywords,
    alternates: { canonical: input.path },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
