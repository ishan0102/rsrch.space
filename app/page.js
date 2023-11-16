"use client"
import React, { useState } from 'react';
import { Papers } from '../components/Papers';
import { Links } from '../components/Links';

export default function Home() {
  // State to toggle between Links and Papers
  const [showPapers, setShowPapers] = useState(true);

  return (
    <main>
      <div className="flex justify-center space-x-4 my-4">
        <button
          className={`px-4 py-2 text-gray-900 font-medium group hover:text-indigo-600 ${showPapers ? 'text-indigo-600' : ''}`}
          onClick={() => setShowPapers(true)}
        >
          Papers
        </button>
        <button
          className={`px-4 py-2 text-gray-900 font-medium group hover:text-indigo-600 ${!showPapers ? 'text-indigo-600' : ''}`}
          onClick={() => setShowPapers(false)}
        >
          Links
        </button>
      </div>
      {showPapers ? <Papers /> : <Links />}
    </main>
  );
}
