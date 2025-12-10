function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Check your tab name!
  const data = sheet.getDataRange().getValues();
  
  // Headers are in row 1, data starts row 2
  const headers = data[0];
  const rows = data.slice(1);
  
  const formattedData = rows.map(row => {
    return {
      "hook_type": row[0],         // Column A
      "hook_text": row[2],         // Column C (Idea)
      "hook_why": row[6],          // Column G (Why)
      "link_reference": row[7],    // Column H (Link)
      "video": row[4],             // Column E (Video Link)
      "thumbnail": ""
    };
  });

  return ContentService.createTextOutput(JSON.stringify(formattedData))
    .setMimeType(ContentService.MimeType.JSON);
}
