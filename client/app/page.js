"use client";

import Entries from "@/components/entries";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-off-white shadow-sm">
        <div className="mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-medium text-primary">
              rsrch space
            </h1>
            <Link
              href="https://ishanshah.me"
              className="text-sm font-medium text-gray-400 hover:text-primary"
            >
              A project by Ishan
            </Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto p-4">
        <Entries supabase={supabase} />
      </main>
    </div>
  );
}
