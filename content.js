let lastVideoId = "";
let heartbeatIntervalId = null;

function sendVideoHeartbeat() {
  const videoTitle = document.title.replace(" - YouTube", "").trim();
  chrome.runtime.sendMessage({ type: "heartbeat", title: videoTitle });
}

function startHeartbeatTimer() {
  if (heartbeatIntervalId) clearInterval(heartbeatIntervalId);
  
  heartbeatIntervalId = setInterval(() => {
    console.log("Sending 1-min heartbeat...");
    sendVideoHeartbeat();
  }, 1 * 60 * 1000); // 1 min

  console.log("Started 1-min heartbeat timer!");
}

const observer = new MutationObserver(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('v');

  if (videoId && videoId !== lastVideoId) {
    lastVideoId = videoId;
    console.log("New video detected:", videoId);

    sendVideoHeartbeat();
    startHeartbeatTimer();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('beforeunload', () => {
  if (heartbeatIntervalId) {
    clearInterval(heartbeatIntervalId);
  }
});
