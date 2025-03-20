import { useState, useEffect } from "react";
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

  if (isLoading) return (
    <div className="flex justify-center items-center">
      <div className="animate-spin mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
      </div>
    </div>  
  );

  if (isError) return <div className="text-center">Error fetching data</div>;

  return <ListView entries={entries} />;
}