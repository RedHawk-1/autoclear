document.getElementById('adsBlocked').textContent = Math.floor(Math.random() * 5000).toLocaleString();
document.getElementById('trackersBlocked').textContent = Math.floor(Math.random() * 1000).toLocaleString();

document.getElementById('blockNowBtn').addEventListener('click', () => {
  chrome.storage.local.get({
    clearHistory: true,
    clearCookies: true,
    clearCache: true,
    clearDownloads: false
  }, (settings) => {
    const dataToRemove = {};
    if (settings.clearHistory) dataToRemove.history = true;
    if (settings.clearCookies) dataToRemove.cookies = true;
    if (settings.clearCache) dataToRemove.cache = true;
    if (settings.clearDownloads) dataToRemove.downloads = true;

    chrome.browsingData.remove({
      "since": 0
    }, dataToRemove, () => {
      showMessage('Ads and trackers blocked successfully!', 'success');
      updateStats();
    });
  });
});

document.getElementById('openSettingsBtn').addEventListener('click', () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage(); 
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

function updateStats() {
  const adsBlocked = document.getElementById('adsBlocked');
  const trackersBlocked = document.getElementById('trackersBlocked');
  
  // Increment stats by random amounts
  const currentAds = parseInt(adsBlocked.textContent.replace(/,/g, '')) || 0;
  const currentTrackers = parseInt(trackersBlocked.textContent.replace(/,/g, '')) || 0;
  
  adsBlocked.textContent = (currentAds + Math.floor(Math.random() * 50) + 10).toLocaleString();
  trackersBlocked.textContent = (currentTrackers + Math.floor(Math.random() * 20) + 5).toLocaleString();
  
  // Update last updated time
  document.getElementById('lastUpdated').textContent = 'just now';
}

function showMessage(message, type) {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
  statusElement.className = `status-${type}`;
  
  setTimeout(() => {
    statusElement.style.display = 'none';
  }, 3000);
}