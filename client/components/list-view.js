import { BookIcon, BrainIcon, SearchIcon, ShuffleIcon } from "lucide-react";
import { useState } from "react";

function Entry({ title, created, link }) {
  const dateObj = new Date(created);
  const easternTime = dateObj.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const date = easternTime.split(",")[0];
  const formattedDate = new Date(date).toISOString().split("T")[0];

  return (
    <a
      href={link}
      target="_blank"
      className="text-secondary text-md group flex justify-between py-1"
    >
      <strong className="break-word font-medium text-gray-900 group-hover:text-primary sm:break-normal">
        {title}
      </strong>
      <p className="font-berkeley ml-4 whitespace-nowrap sm:ml-12">
        {formattedDate}
      </p>
    </a>
  );
}

export default function ListView({ entries }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    arxiv: false,
    ai: false,
  });

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

  const filteredEntries = entries.filter((entry) => {
    const normalizedTitle = entry.title?.replace(/\s+/g, "").toLowerCase();
    const normalizedLink = entry.url?.replace(/\s+/g, "").toLowerCase() || "";
    const normalizedSearchTerm = searchTerm.replace(/\s+/g, "").toLowerCase();

    // Basic search filter
    const matchesSearch =
      normalizedTitle?.includes(normalizedSearchTerm) ||
      normalizedLink.includes(normalizedSearchTerm);

    if (!matchesSearch) return false;

    // Apply additional filters
    if (filters.arxiv && !normalizedLink.includes("arxiv")) return false;

    // Check AI filter
    if (filters.ai) {
      const aiOrgs = [
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
      const aiTerms = [
        "ai",
        "artificial intelligence",
        "machine learning",
        "neural",
        "llm",
        "language model",
      ];

      // Check URL for AI organizations
      const hasAiOrg = aiOrgs.some((org) => normalizedLink.includes(org));

      // Check title for AI-related terms
      const hasAiTerm =
        normalizedTitle &&
        aiTerms.some((term) => normalizedTitle.includes(term));

      if (!hasAiOrg && !hasAiTerm) return false;
    }

    return true;
  });

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative max-w-[240px] flex-grow">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
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
      {filteredEntries.map((entry, index) => (
        <Entry
          key={index}
          title={entry.title}
          created={entry.notion_timestamp}
          link={entry.url.replace(/pdf(?=.)/, "abs").replace(/v\d+$/, "")}
        />
      ))}
    </>
  );
}
