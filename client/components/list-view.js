"use client";

import { useEffect, useMemo } from "react";
import { Favicon } from "./favicon";
import { getDomain, formatDate, normalizeForSearch, transformArxivUrl } from "@/lib/utils";

const AI_ORGS = [
  "openai.com",
  "anthropic.com",
  "research.google",
  "ai.google",
  "google.com/research",
  "research.fb",
  "ai.meta",
  "meta.com/research",
  "deepmind.com",
];

const AI_TERMS = [
  "ai",
  "artificial intelligence",
  "machine learning",
  "neural",
  "llm",
  "language model",
];

function matchesFilters(filters, link, title) {
  if (filters.arxiv && !link.includes("arxiv")) return false;
  if (filters.ai) {
    const hasAiOrg = AI_ORGS.some((org) => link.includes(org));
    const hasAiTerm = AI_TERMS.some((term) => title?.includes(term));
    if (!hasAiOrg && !hasAiTerm) return false;
  }
  return true;
}

function Entry({ title, created, link }) {
  return (
    <a
      href={link}
      target="_blank"
      className="text-secondary text-md group flex justify-between py-1"
    >
      <span className="flex items-start gap-2 min-w-0">
        <span className="mt-1 flex-shrink-0">
          <Favicon domain={getDomain(link)} />
        </span>
        <strong className="break-word font-medium text-gray-900 group-hover:text-primary sm:break-normal">
          {title}
        </strong>
      </span>
      <p className="font-berkeley text-gray-500 ml-4 whitespace-nowrap sm:ml-12">
        {formatDate(created)}
      </p>
    </a>
  );
}

export default function ListView({
  entries,
  searchTerm,
  filters,
  onFilteredCountChange,
  onFilteredEntriesChange,
}) {
  const filteredEntries = useMemo(() => {
    const search = normalizeForSearch(searchTerm);
    return entries.filter((entry) => {
      const title = normalizeForSearch(entry.title);
      const link = normalizeForSearch(entry.url);
      const matchesSearch = title.includes(search) || link.includes(search);
      if (!matchesSearch) return false;
      return matchesFilters(filters, link, title);
    });
  }, [entries, searchTerm, filters]);

  useEffect(() => {
    onFilteredCountChange(filteredEntries.length);
    onFilteredEntriesChange(filteredEntries);
  }, [filteredEntries, onFilteredCountChange, onFilteredEntriesChange]);

  return (
    <>
      {filteredEntries.map((entry, index) => (
        <Entry
          key={index}
          title={entry.title}
          created={entry.notion_timestamp}
          link={transformArxivUrl(entry.url)}
        />
      ))}
    </>
  );
}
