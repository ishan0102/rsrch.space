import logging
import os
import sys
import postgrest
from dotenv import load_dotenv
from notion_client import Client
from supabase import create_client
from tqdm import tqdm


load_dotenv()
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
notion_token = os.getenv("NOTION_TOKEN")
papers_database_id = os.getenv("PAPERS_DATABASE_ID")
links_database_id = os.getenv("LINKS_DATABASE_ID")

supabase = create_client(supabase_url, supabase_key)
logging.disable(sys.maxsize)
notion = Client(auth=notion_token)


def insert_data(database_id, table_name, notion, supabase):
    start_cursor = None
    while True:
        response = notion.databases.query(database_id=database_id, start_cursor=start_cursor)
        for item in tqdm(response["results"]):
            data = {
                "title": item["properties"]["Title"]["title"][0]["plain_text"],
                "url": item["properties"]["URL"]["url"],
                "notion_timestamp": item["created_time"],
            }

            if table_name == "papers":
                data["date"] = item["properties"]["Date"]["date"]["start"],
                data["authors"] = item["properties"]["Authors"]["rich_text"][0]["plain_text"]

            try:
                supabase.table(table_name).insert(data).execute()
            except postgrest.exceptions.APIError as e:
                if e.code != "23505":  # Ignoring the duplicate entry error
                    raise e
        
        if response["has_more"]:
            start_cursor = response["next_cursor"]
        else:
            break


if __name__ == "__main__":
    print("Inserting papers into Supabase")
    insert_data(papers_database_id, "papers", notion, supabase)

    print("Inserting links into Supabase")
    insert_data(links_database_id, "links", notion, supabase)
