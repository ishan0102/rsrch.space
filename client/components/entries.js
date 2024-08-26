import { useEffect, useState } from "react";
import ListView from "./list-view";
import ExplorerView from "./explorer-view";

export default function Entries({ database, supabase }) {
  const [entries, setEntries] = useState([]);
  const [viewMode, setViewMode] = useState("list");

  async function fetchPosts() {
    const cachedEntries = sessionStorage.getItem(database);
    if (cachedEntries) {
      setEntries(JSON.parse(cachedEntries));
      return;
    }

    const { data } = await supabase
      .from(database)
      .select("*")
      .order("notion_timestamp", { ascending: false });

    setEntries(data);
    sessionStorage.setItem(database, JSON.stringify(data));
  }

  useEffect(() => {
    fetchPosts();
  }, [database]);

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "explorer" : "list");
  };

  return (
    <div className="px-4 mt-24 pb-40 md:pb-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={toggleViewMode}
          className="mb-4 p-2 border border-gray-400 rounded-md bg-[#f0eadd] hover:bg-indigo-100"
        >
          Switch to {viewMode === "list" ? "Explorer" : "List"} View
        </button>
        {viewMode === "list" ? (
          <ListView entries={entries} />
        ) : (
          <ExplorerView entries={entries} />
        )}
      </div>
    </div>
  );
}