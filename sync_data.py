import csv # Added missing import
import subprocess
import json
import random

# Google Sheet Export URL
sheet_id = "1XE-fpAMIqIu3N9pgc6AXYhHvEjfctMYJcP7dlk_uZek"
csv_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
csv_path = 'data.csv'
js_path = 'data.js'

data = []

# Fallback video URL directly from user request
FALLBACK_VIDEO = "https://ilans.org/sett_videos/anna1.mp4"

def clean_text(text):
    return text.strip() if text else ""

try:
    print("Downloading data from Google Sheet...")
    subprocess.run(["curl", "-L", "-o", csv_path, csv_url], check=True)
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        headers = next(reader) # Skip header
        
            # Header expected: Hook Type, Idea, WHY, Link (example), video_link
            # Index: 0, 1, 2, 3, 4
        
        for row in reader:
            if len(row) < 2: continue # Skip empty rows

            hook_type = clean_text(row[0])
            idea = clean_text(row[1])
            why = clean_text(row[2])
            link_example = clean_text(row[3]) if len(row) > 3 else "" 
            video_link_col = clean_text(row[4]) if len(row) > 4 else "" # "video_link"
            
            # User Request: Use "video_link" column (index 4)
            # Fallback if empty.
            
            video_url = video_link_col if video_link_col else FALLBACK_VIDEO
            
            # Map to App Structure
            item = {
                "hook_type": hook_type,
                "hook_text": idea,      # Main text from Idea column
                "hook_why": why,        # Explanation from Why column
                "link_reference": link_example, # Link (example) column
                "video": video_url,
                "thumbnail": ""         # Kept structure but empty
            }
            data.append(item)

    # Write JS file
    js_content = f"const hooksData = {json.dumps(data, indent=2)};"
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully converted {len(data)} rows to {js_path}")

except Exception as e:
    print(f"Error: {e}")
