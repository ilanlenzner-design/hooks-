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

## How to Update Data
The website uses a local data file (`data.js`) to ensure speed and reliability (avoiding CORS issues). To update the content from your Google Sheet:

1.  Open your terminal in this folder.
2.  Run the sync script:
    ```bash
    python3 sync_data.py
    ```
3.  This downloads the latest CSV and updates `data.js`.
4.  Refresh `index.html`.

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
