import { SearchIcon, ShuffleIcon } from "lucide-react";
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
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
    const normalizedLink = entry.url?.replace(/\s+/g, "").toLowerCase();
    const normalizedSearchTerm = searchTerm.replace(/\s+/g, "").toLowerCase();
    return (
      normalizedTitle?.includes(normalizedSearchTerm) ||
      normalizedLink?.includes(normalizedSearchTerm)
    );
  });

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
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
          onClick={handleShuffleClick}
          className="flex h-[42px] items-center justify-center rounded-md border border-gray-400 bg-[#f0eadd] px-4 py-2.5 text-sm font-medium text-gray-600"
        >
          <span className="mr-2">Shuffle</span>
          <ShuffleIcon className="h-4 w-4 text-gray-500" />
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
