"use client"
import React, { useState } from 'react';
import { Entries } from '../components/Entries';

export default function Home() {
  // State to toggle between Links and Papers
  const [showPapers, setShowPapers] = useState(true);

  return (
    <div>
      <div className="flex justify-center items-center space-x-4 py-6 border-b border-gray-200">
        <button
          className={`px-4 text-gray-900 font-medium group hover:text-indigo-600 ${showPapers ? 'text-indigo-600' : ''}`}
          onClick={() => setShowPapers(true)}
        >
          Papers
        </button>
        <button
          className={`px-4 text-gray-900 font-medium group hover:text-indigo-600 ${!showPapers ? 'text-indigo-600' : ''}`}
          onClick={() => setShowPapers(false)}
        >
          Links
        </button>
      </div>
      {showPapers ? <Entries database="papers" /> : <Entries database="links" />}
    </div>
  );
}
