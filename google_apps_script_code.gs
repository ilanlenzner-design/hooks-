function doGet() {
  // Use the FIRST sheet (index 0) regardless of name
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(h => h.toString().toLowerCase().trim());
  
  // Helper to find column index by name
  // We check multiple variations of the name to be safe
  const getIndex = (searchTerms) => {
    for (const term of searchTerms) {
      const idx = headers.indexOf(term);
      if (idx > -1) return idx;
    }
    return -1;
  };

  // Find Indices dynamically
  let typeIdx = getIndex(["type", "hook type", "hook"]);
  let ideaIdx = getIndex(["idea", "original hook", "original post", "hook text"]);
  let whyIdx = getIndex(["why", "rewritten post", "rewritten", "hook why"]);
  let videoIdx = getIndex(["video_link", "video link", "video url", "video"]);
  let linkIdx = getIndex(["link (example)", "link example", "reference", "link"]);

  // FALLBACKS (If header names change/missing, use these defaults from start of project)
  if (typeIdx === -1) typeIdx = 0; // Col A
  if (ideaIdx === -1) ideaIdx = 2; // Col C
  if (whyIdx === -1) whyIdx = 6;   // Col G
  if (videoIdx === -1) videoIdx = 4; // Col E
  if (linkIdx === -1) linkIdx = 7;   // Col H

  const rows = data.slice(1);
  const formattedData = rows.map(row => {
    return {
      "hook_type": row[typeIdx],
      "hook_text": row[ideaIdx],
      "hook_why": row[whyIdx],
      "link_reference": row[linkIdx],
      "video": row[videoIdx],
      "thumbnail": ""
    };
  });

  return ContentService.createTextOutput(JSON.stringify(formattedData))
    .setMimeType(ContentService.MimeType.JSON);
}
