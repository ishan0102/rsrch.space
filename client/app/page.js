"use client"
import React, { useState } from 'react';
import { Entries } from '../components/Entries';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [showPapers, setShowPapers] = useState(true);

  return (
    <div>
      <div className="flex justify-center items-center fixed top-0 w-full space-x-4 py-6 border-b border-gray-200 bg-off-white">
        <button
          className={`px-4 text-gray-900 font-medium group hover:text-indigo-600 ${showPapers ? 'text-indigo-600' : ''}`}
          onClick={() => {
            setShowPapers(true);
            window.scrollTo(0, 0);
          }}
        >
          Papers
        </button>
        <button
          className={`px-4 text-gray-900 font-medium group hover:text-indigo-600 ${!showPapers ? 'text-indigo-600' : ''}`}
          onClick={() => {
            setShowPapers(false);
            window.scrollTo(0, 0);
          }}
        >
          Links
        </button>
      </div>
      {showPapers ? <Entries database="papers" supabase={supabase} /> : <Entries database="links" supabase={supabase} />}
    </div>
  );
}
