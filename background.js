chrome.identity.getAuthToken({ interactive: true }, (token) => {
  fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(response => response.json())
  .then(data => {
    // For each email, fetch details and send to Databricks
    data.messages.forEach((message) => fetchEmailDetails(message.id, token));
  });
});

function fetchEmailDetails(emailId, token) {
  fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${emailId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(response => response.json())
  .then(emailData => {
    categorizeEmailWithDatabricks(emailData);
  });
}

function categorizeEmailWithDatabricks(emailData) {
  fetch("https://your-databricks-endpoint/categorize-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject: emailData.snippet })  // Send email snippet or other details to Databricks
  })
  .then(response => response.json())
  .then(data => {
    chrome.storage.local.set({ [emailData.id]: data.category });  // Store categorized label
  });
}
