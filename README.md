# Strong Hooks Video Gallery

A premium, interactive video gallery designed to showcase "Hook" concepts. The gallery is powered by a Google Sheet and features autoplaying video thumbnails, a detailed playback modal, and sorting/filtering capabilities.

## Features
*   **Live Data Source**: Content is managed via a Google Sheet.
*   **Interactive Gallery**: 
    *   **9:16 Vertical Thumbnails**: Optimized for shorts/reels content.
    *   **Autoplay**: Videos play on hover (desktop) or load muted.
*   **Deep Dive Modal**: Clicking a card opens a modal with the full video, "Idea" vs "Why" breakdown, and "Reference Links".
*   **Smart Fallback**: Automatically uses a default video if a link is missing.

## Quick Start (Local)
1.  Simply open `index.html` in your browser.
2.  That's it! It is a static website.

## How It Works (Hybdrid Live Data)
This app uses a smart hybrid approach for data:
1.  **Live Mode (Primary)**: The app attempts to fetch data *directly* from the Google Sheet via a custom Apps Script API. This means updates are instant on refresh.
2.  **Fallback Mode (Offline)**: If the API fails or is offline, it falls back to the local `data.js` file, ensuring the site never crashes.

### How to Connect Your Own Sheet
If you are setting this up for a new sheet:
1.  Open your Google Sheet.
2.  Go to **Extensions > Apps Script**.
3.  Copy the code from `google_apps_script_code.gs` (included in this repo).
4.  Paste it into the script editor.
5.  **Deploy**:
    *   Click `Deploy` > `New Deployment`.
    *   Select type: `Web App`.
    *   **IMPORTANT**: Set "Who has access" to **"Anyone"**.
    *   Click Deploy.
6.  Copy the **Web App URL**.
7.  Open `app.js` in this project and paste the URL into `LIVE_DATA_URL`.

### Syncing the Fallback Data
To keep the fallback file up to date (recommended occasionally):
1.  Run the sync script locally:
    ```bash
    python3 sync_data.py
    ```
2.  Commit the updated `data.js` to GitHub.

## Deployment
Upload the following files to any static host (Hostinger, Netlify, GitHub Pages, etc.):
*   `index.html`
*   `style.css`
*   `app.js`
*   `data.js`

**Note**: To update production data, run the sync script locally and re-upload `data.js`.

## Tech Stack
*   Vanilla HTML5, CSS3, JavaScript (ES6+).
*   Python 3 (for the data sync utility).
*   No frameworks, no build steps required.
