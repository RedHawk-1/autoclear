let initialSettings = {};

// Load settings
chrome.storage.local.get({
  interval: 60,
  unit: 'minutes',
  clearHistory: true,
  clearCookies: false,
  clearCache: false,
  clearDownloads: false
}, (data) => {
  // Convert stored minutes back to the selected unit for display
  let displayInterval = data.interval;
  if (data.unit === 'seconds') {
    displayInterval = data.interval * 60;
  } else if (data.unit === 'hours') {
    displayInterval = data.interval / 60;
  } else if (data.unit === 'days') {
    displayInterval = data.interval / (60 * 24);
  }

  document.getElementById('interval').value = displayInterval;
  document.getElementById('unit').value = data.unit;
  document.getElementById('clearHistory').checked = data.clearHistory;
  document.getElementById('clearCookies').checked = data.clearCookies;
  document.getElementById('clearCache').checked = data.clearCache;
  document.getElementById('clearDownloads').checked = data.clearDownloads;

  initialSettings = {
    interval: data.interval,
    unit: data.unit,
    clearHistory: data.clearHistory,
    clearCookies: data.clearCookies,
    clearCache: data.clearCache,
    clearDownloads: data.clearDownloads
  };
});

// Save settings
document.getElementById('saveBtn').addEventListener('click', () => {
  const interval = parseInt(document.getElementById('interval').value);
  const unit = document.getElementById('unit').value;
  const clearHistory = document.getElementById('clearHistory').checked;
  const clearCookies = document.getElementById('clearCookies').checked;
  const clearCache = document.getElementById('clearCache').checked;
  const clearDownloads = document.getElementById('clearDownloads').checked;
  const statusElement = document.getElementById('status');

  if (isNaN(interval)) {
    showMessage('Please enter a valid number.', 'error');
    return;
  }

  // Convert to minutes for storage (Chrome alarms use minutes)
  let intervalInMinutes;
  switch (unit) {
    case 'seconds':
      intervalInMinutes = interval / 60;
      break;
    case 'minutes':
      intervalInMinutes = interval;
      break;
    case 'hours':
      intervalInMinutes = interval * 60;
      break;
    case 'days':
      intervalInMinutes = interval * 60 * 24;
      break;
    default:
      intervalInMinutes = interval;
  }

  if (intervalInMinutes <= 0) {
    showMessage('Please enter a value greater than 0.', 'error');
    return;
  }

  chrome.storage.local.set({
    interval: intervalInMinutes,
    unit: unit,
    clearHistory: clearHistory,
    clearCookies: clearCookies,
    clearCache: clearCache,
    clearDownloads: clearDownloads
  }, () => {
    showMessage('Settings saved successfully!', 'success');
    initialSettings = { 
      interval: intervalInMinutes, 
      unit: unit, 
      clearHistory, 
      clearCookies, 
      clearCache, 
      clearDownloads 
    };
  });
});

function showMessage(message, type) {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
  statusElement.className = `status-message status-${type}`;
  
  setTimeout(() => {
    statusElement.className = 'status-message';
  }, 3000);
}

function hasUnsavedChanges() {
  const currentSettings = {
    interval: parseInt(document.getElementById('interval').value),
    unit: document.getElementById('unit').value,
    clearHistory: document.getElementById('clearHistory').checked,
    clearCookies: document.getElementById('clearCookies').checked,
    clearCache: document.getElementById('clearCache').checked,
    clearDownloads: document.getElementById('clearDownloads').checked
  };

  return JSON.stringify(currentSettings) !== JSON.stringify(initialSettings);
}