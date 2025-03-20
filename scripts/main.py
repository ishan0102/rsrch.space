import logging
import os
import sys
from dotenv import load_dotenv
from notion_client import Client
from supabase import create_client
from tqdm import tqdm


load_dotenv()
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
notion_token = os.getenv("NOTION_TOKEN")
links_database_id = os.getenv("LINKS_DATABASE_ID")

supabase = create_client(supabase_url, supabase_key)
logging.disable(sys.maxsize)
notion = Client(auth=notion_token)


def insert_data(database_id, table_name, notion, supabase):
    start_cursor = None
    data_batch = []
    
    while True:
        response = notion.databases.query(database_id=database_id, start_cursor=start_cursor)
        for item in tqdm(response["results"]):
            data = {
                "title": item["properties"]["Title"]["title"][0]["plain_text"],
                "url": item["properties"]["URL"]["url"],
                "notion_timestamp": item["created_time"],
            }

            data_batch.append(data)
            
        supabase.table(table_name).upsert(data_batch).execute()
        data_batch = []

        if response["has_more"]:
            start_cursor = response["next_cursor"]
        else:
            break



if __name__ == "__main__":
    print("Inserting links into Supabase")
    insert_data(links_database_id, "links", notion, supabase)
