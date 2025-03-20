import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ListView from "./list-view";

export default function Entries({ supabase }) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
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
      }
    };

    fetchPosts();
  }, [supabase]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );

  if (isError) return <div className="text-center">Error fetching data</div>;

  return <ListView entries={entries} />;
}
