"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LinkRow } from "./link-row";
import { normalizeForSearch, transformArxivUrl, getBaseDomain } from "@/lib/utils";
import { matchesFilters } from "@/lib/filters";
import type { Entry, Filters } from "@/lib/types";

interface LinkListProps {
  entries: Entry[];
  searchTerm: string;
  filters: Filters;
  selectedDomain: string | null;
  onDomainClick: (domain: string) => void;
  onFilteredCountChange: (count: number) => void;
  onFilteredEntriesChange: (entries: Entry[]) => void;
}

const PAGE_SIZE = 50;

export function LinkList({
  entries,
  searchTerm,
  filters,
  selectedDomain,
  onDomainClick,
  onFilteredCountChange,
  onFilteredEntriesChange,
}: LinkListProps) {
  const filteredEntries = useMemo(() => {
    const search = normalizeForSearch(searchTerm);
    return entries.filter((entry) => {
      const title = normalizeForSearch(entry.title);
      const link = normalizeForSearch(entry.url);
      const matchesSearch = title.includes(search) || link.includes(search);
      if (!matchesSearch) return false;
      if (!matchesFilters(filters, link, title)) return false;
      if (selectedDomain && getBaseDomain(entry.url) !== selectedDomain) return false;
      return true;
    });
  }, [entries, searchTerm, filters, selectedDomain]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filteredEntries]);

  useEffect(() => {
    onFilteredCountChange(filteredEntries.length);
    onFilteredEntriesChange(filteredEntries);
  }, [filteredEntries, onFilteredCountChange, onFilteredEntriesChange]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (visibleCount >= filteredEntries.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredEntries.length));
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filteredEntries.length]);

  const visibleEntries = filteredEntries.slice(0, visibleCount);

  return (
    <>
      {visibleEntries.map((entry, index) => (
        <LinkRow
          key={index}
          title={entry.title}
          created={entry.notion_timestamp}
          link={transformArxivUrl(entry.url)}
          onDomainClick={onDomainClick}
        />
      ))}
      {visibleCount < filteredEntries.length && <div ref={sentinelRef} aria-hidden />}
    </>
  );
}
