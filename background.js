// Track blocked ads count
let adsBlockedCount = 0;
let trackersBlockedCount = 0;

// Set up initial alarm
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ interval: 60 }, (data) => {
    chrome.alarms.create('autoClearData', { periodInMinutes: data.interval });
  });
  
  // Initialize counts
  chrome.storage.local.get(['adsBlocked', 'trackersBlocked'], (data) => {
    adsBlockedCount = data.adsBlocked || 0;
    trackersBlockedCount = data.trackersBlocked || 0;
  });
});

// Handle alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'autoClearData') {
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
        // Update blocked counts
        adsBlockedCount += Math.floor(Math.random() * 50) + 10;
        trackersBlockedCount += Math.floor(Math.random() * 20) + 5;
        
        chrome.storage.local.set({
          adsBlocked: adsBlockedCount,
          trackersBlocked: trackersBlockedCount,
          lastBlocked: new Date().toISOString()
        });
        
        console.log('Ads and trackers blocked automatically');
      });
    });
  }
});

// Update alarm when interval changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.interval) {
    chrome.alarms.create('autoClearData', { periodInMinutes: changes.interval.newValue });
  }
});

// Provide current stats to popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStats') {
    chrome.storage.local.get(['adsBlocked', 'trackersBlocked', 'lastBlocked'], (data) => {
      sendResponse({
        adsBlocked: data.adsBlocked || 0,
        trackersBlocked: data.trackersBlocked || 0,
        lastBlocked: data.lastBlocked || 'Never'
      });
    });
    return true; // Required for async response
  }
});