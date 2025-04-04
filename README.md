# AdBlock Pro (Privacy Cleaner)
A Chrome extension that mimics an adblocker's interface while functioning as an advanced privacy cleaner.

🔍 Overview
This extension provides a professional adblocker-style interface while actually functioning as a powerful privacy protection tool. It helps maintain browser cleanliness by:

🧹 Clearing browsing history, cookies, and cache (configurable)

⏱️ Running automatic cleanups on schedule

📊 Displaying privacy stats in an adblocker-like dashboard

# Note: This is NOT a traditional content-blocking adblocker. It enhances privacy by removing tracking data rather than preventing ads from loading.

✨ Features
Dashboard
Real-time counters for "tracking attempts blocked"

Quick-clean button for manual cleaning

Last cleaned timestamp

Cleaning Options
Selective cleaning: Choose what to remove (history, cookies, cache, downloads)

Scheduled cleaning: Set intervals from 1 minute to 30 days

Aggressive mode: More thorough cleaning (may impact some site functionality)

Privacy Protection
Removes tracking cookies and browsing fingerprints

Clears cached tracking elements

Optional history sanitization

🛠️ Installation
Clone this repository:

bash
Copy
git clone https://github.com/yourusername/adblock-pro.git
Load in Chrome:

Go to chrome://extensions

Enable "Developer mode"

Click "Load unpacked" and select the extension folder

⚙️ Configuration
Customize your cleaning preferences in the options page:

Set cleaning frequency (seconds/minutes/hours/days)

Choose which data types to clean

Enable/disable automatic cleaning

📝 How It Works
The extension uses Chrome's:

browsingData API for cleaning operations

storage API to save settings

alarms API for scheduled cleaning

🌟 Why Use This?
Perfect for users who want adblocker-style privacy without breaking sites

Lightweight alternative to memory-heavy adblockers

Great for shared computers where you want to leave no traces
