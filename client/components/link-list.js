"use client";

import { useEffect, useMemo } from "react";
import { LinkRow } from "./link-row";
import { normalizeForSearch, transformArxivUrl } from "@/lib/utils";
import { matchesFilters } from "@/lib/filters";

export function LinkList({
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
        <LinkRow
          key={index}
          title={entry.title}
          created={entry.notion_timestamp}
          link={transformArxivUrl(entry.url)}
        />
      ))}
    </>
  );
}
