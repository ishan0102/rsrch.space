import { useQuery } from "@tanstack/react-query";
import ListView from "./list-view";
import ExplorerView from "./explorer-view";

export default function Entries({ database, supabase, isExplorerView }) {
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

  if (isLoading) return (
    <div className="flex justify-center items-center">
      <div className="animate-spin mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
      </div>
    </div>  
  );

  if (isError) return <div className="text-center">Error fetching data</div>;

  return (
    <div>
      {isExplorerView ? (
        <ExplorerView entries={entries} />
      ) : (
        <ListView entries={entries} />
      )}
    </div>
  );
}