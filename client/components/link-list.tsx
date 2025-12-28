"use client";

import { useEffect, useMemo } from "react";
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

  useEffect(() => {
    onFilteredCountChange(filteredEntries.length);
    onFilteredEntriesChange(filteredEntries);
  }, [filteredEntries, onFilteredCountChange, onFilteredEntriesChange]);

  return (
    <>
      {filteredEntries.map((entry, index) => (
        <LinkRow
          key={index}
          title={entry.title}
          created={entry.notion_timestamp}
          link={transformArxivUrl(entry.url)}
          onDomainClick={onDomainClick}
        />
      ))}
    </>
  );
}
