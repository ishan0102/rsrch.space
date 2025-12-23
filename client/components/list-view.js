import { useEffect, useMemo, useState } from "react";
import { Globe } from "lucide-react";

function getFaviconUrls(domain) {
  if (!domain) return [];

  const cleanHostname = domain.replace(/^www\./, "");

  // Extract base domain from any subdomain
  const parts = cleanHostname.split(".");
  let baseDomain = cleanHostname;
  if (parts.length >= 3) {
    baseDomain = parts.slice(-2).join(".");
  }

  return [
    `https://www.google.com/s2/favicons?domain=${baseDomain}&sz=128`,
    `https://www.google.com/s2/favicons?domain=www.${baseDomain}&sz=128`,
    `https://www.google.com/s2/favicons?domain=${cleanHostname}&sz=128`,
  ];
}

function Favicon({ domain }) {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const faviconUrls = getFaviconUrls(domain);

  const handleError = () => {
    if (currentUrlIndex < faviconUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
    } else {
      setShowFallback(true);
    }
  };

  // Check if image is the default Google globe (16x16 or very small)
  const handleLoad = (e) => {
    const img = e.target;
    // Google returns a tiny default icon for unknown domains
    if (img.naturalWidth <= 16 && img.naturalHeight <= 16) {
      setShowFallback(true);
    }
  };

  if (showFallback || faviconUrls.length === 0) {
    return <Globe className="w-4 h-4 flex-shrink-0 text-gray-400" />;
  }

  return (
    <img
      src={faviconUrls[currentUrlIndex]}
      alt=""
      className="w-4 h-4 rounded-full flex-shrink-0 object-cover"
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

function Entry({ title, created, link }) {
  const dateObj = new Date(created);
  const easternTime = dateObj.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const date = easternTime.split(",")[0];
  const formattedDate = new Date(date).toISOString().split("T")[0];

  // Extract domain for favicon
  let domain = "";
  try {
    domain = new URL(link).hostname;
  } catch (e) {
    domain = "";
  }

  return (
    <a
      href={link}
      target="_blank"
      className="text-secondary text-md group flex justify-between py-1"
    >
      <span className="flex items-start gap-2 min-w-0">
        <span className="mt-1 flex-shrink-0">
          <Favicon domain={domain} />
        </span>
        <strong className="break-word font-medium text-gray-900 group-hover:text-primary sm:break-normal">
          {title}
        </strong>
      </span>
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
