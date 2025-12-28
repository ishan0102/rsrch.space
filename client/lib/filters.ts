import type { Filters } from "./types";

export const AI_ORGS = [
  "openai.com",
  "anthropic.com",
  "research.google",
  "ai.google",
  "google.com/research",
  "research.fb",
  "ai.meta",
  "meta.com/research",
  "deepmind.com",
] as const;

export const AI_TERMS = [
  "ai",
  "artificial intelligence",
  "machine learning",
  "neural",
  "llm",
  "language model",
] as const;

export function matchesFilters(
  filters: Filters,
  link: string,
  title: string | undefined
): boolean {
  if (filters.arxiv && !link.includes("arxiv")) return false;
  if (filters.ai) {
    const hasAiOrg = AI_ORGS.some((org) => link.includes(org));
    const hasAiTerm = AI_TERMS.some((term) => title?.includes(term));
    if (!hasAiOrg && !hasAiTerm) return false;
  }
  return true;
}
