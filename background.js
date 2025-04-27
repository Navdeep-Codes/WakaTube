// background.js

let userApiKey = null;

// Load API key from storage
chrome.storage.sync.get(['apiKey'], (result) => {
  userApiKey = result.apiKey || null;
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "heartbeat" && userApiKey) {
    sendHeartbeat(message.title);
  }
});

function sendHeartbeat(title) {
  fetch('https://hackatime.hackclub.com/api/hackatime/v1/heartbeats', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      entity: title,
      type: 'video',
      category: 'watching',
      timestamp: Math.floor(Date.now() / 1000),
      project: 'YouTube',
      language: 'Video'
    }),
  })
  .then(response => {
    if (!response.ok) {
      console.error('Failed to send heartbeat', response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Heartbeat sent!', data);
  })
  .catch(error => {
    console.error('Error sending heartbeat', error);
  });
}
