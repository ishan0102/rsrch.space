"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Entries } from "../components/Entries";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [showPapers, setShowPapers] = useState(false);

  return (
    <div>
      <div className="fixed top-0 w-full pt-4 pb-2 border-b border-gray-200 bg-off-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-4">
              <button
                className={`px-4 text-gray-900 font-medium group hover:text-indigo-600 ${
                  !showPapers ? "text-indigo-600" : ""
                }`}
                onClick={() => {
                  setShowPapers(false);
                  window.scrollTo(0, 0);
                }}
              >
                Links
              </button>
              <button
                className={`px-4 text-gray-900 font-medium group hover:text-indigo-600 ${
                  showPapers ? "text-indigo-600" : ""
                }`}
                onClick={() => {
                  setShowPapers(true);
                  window.scrollTo(0, 0);
                }}
              >
                Papers
              </button>
            </div>
            <div className="text-[12px] text-gray-500">
              <span>Created by </span>
              <a
                href="https://ishanshah.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline hover:underline-offset-4"
              >
                Ishan
              </a>
            </div>
          </div>
        </div>
      </div>
      {showPapers ? (
        <Entries database="papers" supabase={supabase} />
      ) : (
        <Entries database="links" supabase={supabase} />
      )}
    </div>
  );
}
