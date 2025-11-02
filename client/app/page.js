"use client";

import Entries from "@/components/entries";
import { BookIcon, BrainIcon, SearchIcon, ShuffleIcon } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    arxiv: false,
    ai: false,
  });
  const [filteredCount, setFilteredCount] = useState(0);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFilterToggle = (filter) => {
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
      window.open(modifiedUrl, "_blank").focus();
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-off-white shadow-sm">
        <div className="mx-auto px-4 pb-4 pt-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-medium text-primary">
                rsrch space
              </h1>
              <Link
                href="https://ishanshah.me"
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                A project by Ishan
              </Link>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="relative max-w-[240px] flex-grow">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder={
                      isLoading
                        ? "Search"
                        : filteredCount > 0
                        ? `Search ${filteredCount} ${filteredCount === 1 ? "link" : "links"}`
                        : "Search"
                    }
                    onChange={handleSearchChange}
                    className="w-full rounded-md border border-gray-400 bg-[#f0eadd] px-3 py-2.5 pl-8 text-sm font-medium text-gray-600 placeholder-gray-500"
                  />
                </div>
                <button
                  onClick={() => handleFilterToggle("arxiv")}
                  className={`flex h-[42px] items-center justify-center rounded-md border border-gray-400 ${
                    filters.arxiv
                      ? "bg-primary text-white"
                      : "bg-[#f0eadd] text-gray-600"
                  } px-4 py-2.5 text-sm font-medium`}
                >
                  <BookIcon
                    className={`mr-2 h-4 w-4 ${filters.arxiv ? "text-white" : "text-gray-600"}`}
                  />
                  <span>arXiv</span>
                </button>
                <button
                  onClick={() => handleFilterToggle("ai")}
                  className={`flex h-[42px] items-center justify-center rounded-md border border-gray-400 ${
                    filters.ai
                      ? "bg-primary text-white"
                      : "bg-[#f0eadd] text-gray-600"
                  } px-4 py-2.5 text-sm font-medium`}
                >
                  <BrainIcon
                    className={`mr-2 h-4 w-4 ${filters.ai ? "text-white" : "text-gray-600"}`}
                  />
                  <span>AI</span>
                </button>
              </div>
              <button
                onClick={handleShuffleClick}
                className="flex h-[42px] items-center justify-center rounded-md border border-gray-400 bg-[#f0eadd] px-4 py-2.5 text-sm font-medium text-gray-600"
              >
                <span className="mr-2">Shuffle</span>
                <ShuffleIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto px-4 py-2">
        <Entries
          supabase={supabase}
          searchTerm={searchTerm}
          filters={filters}
          onFilteredCountChange={setFilteredCount}
          onFilteredEntriesChange={setFilteredEntries}
          onLoadingChange={setIsLoading}
        />
      </main>
    </div>
  );
}
