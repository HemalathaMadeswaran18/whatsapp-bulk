# WhatsApp Bulk Sender

Send WhatsApp messages to multiple numbers via WhatsApp Web using Playwright.

## Setup

```bash
git clone https://github.com/HemalathaMadeswaran18/whatsapp-bulk.git
cd whatsapp-bulk
npm install
npx playwright install chromium
```

## Usage

```bash
node index.js
```

Paste your numbers (one per line) in any format:

```
+91 1234567890
+91 1234567899
+91 1234567898
```

Press Enter on an empty line to start sending.

On first run, a browser will open — scan the QR code to log in. Your session is saved locally so you won't need to scan again.

## Limits

- Maximum **45 numbers** per run (the script will refuse to run if you exceed this)
- Random 6–14 second delay between messages to reduce detection risk

## Notes

- Only works with numbers that have WhatsApp accounts
- Sending unsolicited messages to too many strangers can get your account flagged — use responsibly
- Your WhatsApp session is stored in `whatsapp-session/` (git-ignored, never shared)
