
function colorCodeEmails() {
  const emails = document.querySelectorAll(".zA");  // Gmail's email row class
  emails.forEach((email) => {
    const emailId = email.getAttribute("data-legacy-message-id");
    chrome.storage.local.get(emailId, (result) => {
      if (result[emailId] === "important") email.style.backgroundColor = "green";
      else if (result[emailId] === "possibly important") email.style.backgroundColor = "yellow";
      else email.style.backgroundColor = "red";
    });
  });
}

// Run color-coding periodically
setInterval(colorCodeEmails, 3000);
