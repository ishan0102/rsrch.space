import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Paper({ title, created, link }) {
  const dateObj = new Date(created);
  const formattedDate = dateObj.toISOString().split('T')[0];
  return (
    <a href={link.replace("pdf", "abs")} className="flex justify-between text-secondary py-1 group text-md">
      <strong className="flex-none font-medium font-berkeley text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-500">{formattedDate}</strong>
      <p className="mr-auto pl-12">{title}</p>
    </a>
  );
}

export function Papers() {
  const [papers, setPapers] = useState([]);

  async function fetchPosts() {
    const { data } = await supabase
      .from('papers')
      .select('*')
      .order('notion_timestamp', { ascending: false });

    setPapers(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-h-screen w-full flex-col overflow-y-scroll scrollbar-hide px-8">
      <div className="mx-auto w-full max-w-5xl mb-52 md:mb-32">
        {papers.map((paper, index) => (
          <Paper
            key={index}
            title={paper.title}
            created={paper.notion_timestamp}
            link={paper.url}
          />
        ))}
      </div>
    </div>
  );
}
