# Calorie Log

A simple, private calorie and macro tracker for iPhone. It runs in Safari and installs to the Home Screen like a regular app.

**Open it:** https://konstantinstoilov336-ai.github.io/calorie-log/

## Features

- Daily calorie ring with protein, carbs and fat bars
- Scan a product barcode (live camera or a photo of the barcode), or type the number in
- Product nutrition comes from [Open Food Facts](https://world.openfoodfacts.org), a free, open food database
- Correct units per product (g or ml), and it remembers the last amount you logged for each product
- Manual entry and saved favourites for foods without a barcode
- History of past days and adjustable daily goals
- Works offline once installed

## Install on iPhone

1. Open the link above in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Launch it from the Home Screen icon. After an update, close and reopen the app to get the new version.

## Your data

Everything you log is stored **only on your phone**, in the browser storage for this site. Nothing is sent to a server, and there is no account or sync. The only network requests are barcode lookups to Open Food Facts.

Because the data lives only on the device, deleting the Home Screen app or clearing Safari website data will erase it.

## Backup and restore

- **Export backup** saves a small `.json` file. Choose "Save to Files" to keep it in iCloud Drive or on the phone.
- **Import backup** loads that file back, for example on a new phone or after reinstalling.

Make an export now and then so you don't lose your history.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app (HTML, CSS and JavaScript) |
| `sw.js` | Service worker for offline use and updates |
| `manifest.webmanifest` | Home Screen app name, colours and icons |
| `*.png` | App icons |
