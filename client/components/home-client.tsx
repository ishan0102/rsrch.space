"use client";

import { BookIcon, BrainIcon, SearchIcon, ShuffleIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LinkList } from "./link-list";
import { ThemeToggle } from "./theme-toggle";
import type { Entry, Filters } from "@/lib/types";

interface HomeClientProps {
  entries: Entry[];
}

export default function HomeClient({ entries }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    arxiv: false,
    ai: false,
  });
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [filteredCount, setFilteredCount] = useState(entries.length);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>(entries);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFilterToggle = (filter: keyof Filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handleShuffleClick = () => {
    if (filteredEntries.length > 0) {
      const randomEntry =
        filteredEntries[Math.floor(Math.random() * filteredEntries.length)];
      const modifiedUrl = randomEntry.url
        .replace(/pdf(?=.)/, "abs")
        .replace(/v\d+$/, "");
      window.open(modifiedUrl, "_blank")?.focus();
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-off-white dark:bg-off-black shadow-sm dark:shadow-none dark:border-b dark:border-gray-800">
        <div className="mx-auto px-4 pb-4 pt-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-medium text-primary font-fransans">
                rsrch space
              </h1>
              <div className="flex items-center gap-4">
                <Link
                  href="https://ishanshah.me"
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  A project by Ishan
                </Link>
                <ThemeToggle />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedDomain && (
                  <button
                    onClick={() => setSelectedDomain(null)}
                    className="flex items-center gap-1.5 h-[42px] px-3 rounded-md border border-primary bg-primary/10 text-primary text-sm font-medium"
                  >
                    <span>{selectedDomain}</span>
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                )}
                <div className="relative flex-grow sm:max-w-[240px]">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={
                      filteredCount > 0
                        ? `Search ${filteredCount} ${filteredCount === 1 ? "link" : "links"}`
                        : "Search"
                    }
                    onChange={handleSearchChange}
                    className="w-full rounded-md border border-gray-400 dark:border-gray-600 bg-[#f0eadd] dark:bg-[#2a2a2e] px-3 py-2.5 pl-8 text-sm font-medium text-gray-600 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                  />
                </div>
                <button
                  onClick={() => handleFilterToggle("arxiv")}
                  className={`hidden sm:flex h-[42px] items-center justify-center rounded-md border border-gray-400 dark:border-gray-600 ${
                    filters.arxiv
                      ? "bg-primary text-white"
                      : "bg-[#f0eadd] dark:bg-[#2a2a2e] text-gray-600 dark:text-gray-300"
                  } px-4 py-2.5 text-sm font-medium`}
                >
                  <BookIcon
                    className={`mr-2 h-4 w-4 ${filters.arxiv ? "text-white" : "text-gray-600 dark:text-gray-300"}`}
                  />
                  <span>arXiv</span>
                </button>
                <button
                  onClick={() => handleFilterToggle("ai")}
                  className={`hidden sm:flex h-[42px] items-center justify-center rounded-md border border-gray-400 dark:border-gray-600 ${
                    filters.ai
                      ? "bg-primary text-white"
                      : "bg-[#f0eadd] dark:bg-[#2a2a2e] text-gray-600 dark:text-gray-300"
                  } px-4 py-2.5 text-sm font-medium`}
                >
                  <BrainIcon
                    className={`mr-2 h-4 w-4 ${filters.ai ? "text-white" : "text-gray-600 dark:text-gray-300"}`}
                  />
                  <span>AI</span>
                </button>
                <button
                  onClick={handleShuffleClick}
                  className="flex sm:hidden h-[42px] w-[42px] items-center justify-center rounded-md border border-gray-400 dark:border-gray-600 bg-[#f0eadd] dark:bg-[#2a2a2e] text-gray-600 dark:text-gray-300"
                >
                  <ShuffleIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleShuffleClick}
                className="hidden sm:flex h-[42px] items-center justify-center rounded-md border border-gray-400 dark:border-gray-600 bg-[#f0eadd] dark:bg-[#2a2a2e] px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                <span className="mr-2">Random</span>
                <ShuffleIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto px-4 py-2">
        <LinkList
          entries={entries}
          searchTerm={searchTerm}
          filters={filters}
          selectedDomain={selectedDomain}
          onDomainClick={setSelectedDomain}
          onFilteredCountChange={setFilteredCount}
          onFilteredEntriesChange={setFilteredEntries}
        />
      </main>
    </div>
  );
}
