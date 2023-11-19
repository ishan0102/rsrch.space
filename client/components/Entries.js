import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Entry({ title, created, link }) {
  const dateObj = new Date(created);
  const date = dateObj.toISOString().split('T')[0];
  return (
    <a href={link.replace("pdf", "abs")} className="flex justify-between text-secondary py-1 group text-md">
      <strong className="font-medium break-all sm:break-normal text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-500">{title}</strong>
      <p className="font-berkeley whitespace-nowrap ml-12">{date}</p>
    </a>
  );
}

export function Entries({ database }) {
  const [entries, setEntries] = useState([]);

  async function fetchPosts() {
    const { data } = await supabase
      .from(database)
      .select('*')
      .order('notion_timestamp', { ascending: false });

    setEntries(data);
  }

  useEffect(() => {
    fetchPosts();
  }, [database]);

  return (
    <div className="max-h-screen w-full flex-col overflow-y-scroll scrollbar-hide px-8">
      <div className="mx-auto w-full max-w-5xl mt-4 mb-52 md:mb-32">
        {entries.map((entry, index) => (
          <Entry
            key={index}
            title={entry.title}
            created={entry.notion_timestamp}
            link={entry.url}
          />
        ))}
      </div>
    </div>
  );
}
