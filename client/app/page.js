"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import Entries from "@/components/entries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const queryClient = new QueryClient();

export default function Home() {
  const [showPapers, setShowPapers] = useState(false);
  const [isExplorerView, setIsExplorerView] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <nav className="sticky top-0 bg-off-white shadow-sm z-10">
          <div className="mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 items-center">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    !showPapers ? "bg-primary text-white" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setShowPapers(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Links
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    showPapers ? "bg-primary text-white" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setShowPapers(true);
                    window.scrollTo(0, 0);
                  }}
                >
                  Papers
                </button>
                {/* <label className="inline-flex items-center cursor-pointer pl-2">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isExplorerView}
                    onChange={() => setIsExplorerView(!isExplorerView)}
                  />
                  <div className="relative w-11 h-6 bg-primary/10 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {isExplorerView ? "Explorer" : "List"}
                  </span>
                </label> */}
              </div>
              <a
                href="https://ishanshah.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary"
              >
                Created by Ishan
              </a>
            </div>
          </div>
        </nav>
        <main className="mx-auto px-4 py-8">
          <Entries database={showPapers ? "papers" : "links"} supabase={supabase} isExplorerView={false} />
        </main>
      </div>
    </QueryClientProvider>
  );
}