import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ListView from "./list-view";
import ExplorerView from "./explorer-view";

export default function Entries({ database, supabase }) {
  const [viewMode, setViewMode] = useState("list");
  const queryClient = useQueryClient();

  const fetchPosts = async () => {
    const { data } = await supabase
      .from(database)
      .select("*")
      .order("notion_timestamp", { ascending: false });
    return data;
  };

  const { data: entries, isLoading, isError } = useQuery({
    queryKey: ["entries", database],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    queryClient.invalidateQueries(["entries", database]);
  }, [database, queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="px-4 mt-24 pb-40 md:pb-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex justify-end">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={viewMode === "explorer"}
              onChange={() => setViewMode(viewMode === "list" ? "explorer" : "list")}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Explorer View
            </span>
          </label>
        </div>
        {viewMode === "list" ? (
          <ListView entries={entries} />
        ) : (
          <ExplorerView entries={entries} />
        )}
      </div>
    </div>
  );
}