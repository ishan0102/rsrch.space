"use client";

import { createClient } from "@supabase/supabase-js";
import Entries from "@/components/entries";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 bg-off-white shadow-sm z-10">
        <div className="mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4 items-center">
              <h1 className="text-sm font-medium text-gray-700">rsrch space</h1>
            </div>
            <a
              href="https://donate.stripe.com/9AQaEK6A26Dz6kgbII"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary"
            >
              Donate
            </a>
          </div>
        </div>
      </nav>
      <main className="mx-auto px-4 py-8">
        <Entries supabase={supabase} />
      </main>
    </div>
  );
}