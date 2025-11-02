import { useEffect, useState } from "react";
import ListView from "./list-view";

function SkeletonEntry({ titleWidth }) {
  return (
    <div className="flex justify-between py-1">
      <div className="flex-1">
        <div
          className={`h-5 animate-pulse rounded bg-[#e8e5dc] ${titleWidth}`}
        ></div>
      </div>
      <div className="font-berkeley ml-4 whitespace-nowrap sm:ml-12">
        <div className="h-6 w-24 animate-pulse rounded bg-[#e8e5dc]"></div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  const titleWidths = [
    "w-3/4",
    "w-5/6",
    "w-2/3",
    "w-4/5",
    "w-full",
    "w-3/5",
    "w-4/6",
    "w-2/3",
    "w-5/6",
    "w-3/4",
  ];

  return (
    <div className="py-0.5">
      {Array.from({ length: 50 }).map((_, index) => (
        <SkeletonEntry key={index} titleWidth={titleWidths[index % titleWidths.length]} />
      ))}
    </div>
  );
}

export default function Entries({
  supabase,
  searchTerm,
  filters,
  onFilteredCountChange,
  onFilteredEntriesChange,
  onLoadingChange,
}) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        onLoadingChange(true);
        const { data, error } = await supabase
          .from("links")
          .select("url, notion_timestamp, title")
          .order("notion_timestamp", { ascending: false });

        if (error) throw error;
        setEntries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
        onLoadingChange(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <div className="text-center">Error fetching data</div>;

  return (
    <ListView
      entries={entries}
      searchTerm={searchTerm}
      filters={filters}
      onFilteredCountChange={onFilteredCountChange}
      onFilteredEntriesChange={onFilteredEntriesChange}
    />
  );
}
