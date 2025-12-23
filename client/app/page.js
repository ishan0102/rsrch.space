import { createClient } from "@supabase/supabase-js";
import HomeClient from "@/components/home-client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getEntries() {
  const { data, error } = await supabase
    .from("links")
    .select("url, notion_timestamp, title")
    .order("notion_timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data;
}

export default async function Home() {
  const entries = await getEntries();

  return <HomeClient entries={entries} />;
}
