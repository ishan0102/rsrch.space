import { useEffect, useMemo } from "react";

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
      <p className="font-berkeley text-gray-500 ml-4 whitespace-nowrap sm:ml-12">
        {formattedDate}
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
    return entries.filter((entry) => {
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
          link={entry.url.replace(/pdf(?=.)/, "abs").replace(/v\d+$/, "")}
        />
      ))}
    </>
  );
}
