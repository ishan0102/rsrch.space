"use client"
import React, { useState } from 'react';
import { Links } from '../components/Links';
import { Papers } from '../components/Papers';

export default function Home() {
  // State to toggle between Links and Papers
  const [showLinks, setShowLinks] = useState(true);

  return (
    <main>
      <div className="flex justify-center space-x-4 my-4">
        <button
          className={`px-4 py-2 text-gray-900 font-medium group hover:text-indigo-600 ${showLinks ? 'bg-gray-200' : ''}`}
          onClick={() => setShowLinks(true)}
        >
          Links
        </button>
        <button
          className={`px-4 py-2 text-gray-900 font-medium group hover:text-indigo-600 ${!showLinks ? 'bg-gray-200' : ''}`}
          onClick={() => setShowLinks(false)}
        >
          Papers
        </button>
      </div>

      {showLinks ? <Links /> : <Papers />}
    </main>
  );
}
