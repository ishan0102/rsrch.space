import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ListView from "./list-view";

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
  }, [supabase, onLoadingChange]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );

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
