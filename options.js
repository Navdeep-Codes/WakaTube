document.getElementById('saveBtn').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value.trim();
    chrome.storage.local.set({ wakatimeApiKey: apiKey }, () => {
      alert("API Key saved!");
    });
  });
  
  // load api key if available
  chrome.storage.local.get(["wakatimeApiKey"], (result) => {
    if (result.wakatimeApiKey) {
      document.getElementById('apiKey').value = result.wakatimeApiKey;
    }
  });
  