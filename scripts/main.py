# type: ignore
import logging
import os
import sys
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from notion_client import Client
from supabase import create_client

load_dotenv()
logging.disable(sys.maxsize)


def is_recent(timestamp, days=7):
    created = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    return created >= cutoff


def fetch_recent_links(notion, database_id):
    links = []
    seen_urls = set()
    cursor = None
    
    while True:
        response = notion.databases.query(
            database_id=database_id,
            start_cursor=cursor,
            sorts=[{"timestamp": "created_time", "direction": "descending"}]
        )
        
        if not response["results"]:
            break
        
        old_count = 0
        for item in response["results"]:
            if not is_recent(item["created_time"]):
                old_count += 1
                if old_count >= 10:
                    return links
                continue
            
            url = item["properties"]["URL"]["url"]
            if not url or url in seen_urls:
                continue
            
            seen_urls.add(url)
            title_prop = item["properties"]["Title"]["title"]
            links.append({
                "url": url,
                "title": title_prop[0]["plain_text"] if title_prop else "",
                "notion_timestamp": item["created_time"]
            })
        
        cursor = response["next_cursor"] if response["has_more"] else None
        if not cursor:
            break
    
    return links


def upsert_links(supabase, links):
    for i in range(0, len(links), 100):
        batch = links[i:i + 100]
        try:
            supabase.table("links").upsert(batch).execute()
        except Exception:
            for link in batch:
                try:
                    supabase.table("links").upsert(link).execute()
                except Exception:
                    pass


if __name__ == "__main__":
    notion = Client(auth=os.getenv("NOTION_TOKEN"))
    supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
    
    print("Syncing links from Notion...")
    links = fetch_recent_links(notion, os.getenv("LINKS_DATABASE_ID"))
    
    if links:
        print(f"Upserting {len(links)} links to Supabase...")
        upsert_links(supabase, links)
        print("Done.")
    else:
        print("No recent links found.")
