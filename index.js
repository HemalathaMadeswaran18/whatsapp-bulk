const { chromium } = require('playwright');
const readline = require('readline');

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const MESSAGE = `Hey! I saw that you are interested in Open Source Projects.

Observal is an Open Source project being run by ex-GSoC community members.

Please do checkout the repo and react to this message if you would be interested in contributing.

https://github.com/BlazeUp-AI/Observal

Join our Discord community: https://discord.gg/SFPjnTWddk`;

const MAX_NUMBERS = 45;
const DELAY_BETWEEN_MS = [6000, 14000];
// ─────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumbers() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const lines = [];

    console.log('─────────────────────────────────────────────');
    console.log('📱 WhatsApp Bulk Sender');
    console.log('─────────────────────────────────────────────');
    console.log('Paste your numbers below (one per line), e.g.:');
    console.log('  +91 93534 66456');
    console.log('  +91 93548 23599');
    console.log('');
    console.log('When done, press Enter on an empty line.');
    console.log('─────────────────────────────────────────────\n');

    rl.on('line', (line) => {
      if (line.trim() === '') {
        rl.close();
        return;
      }
      lines.push(line.trim());
    });

    rl.on('close', () => {
      const numbers = [...new Set(
        lines
          .map(l => l.replace(/\D/g, ''))
          .filter(n => n.length >= 10)
      )];
      resolve(numbers);
    });
  });
}

async function sendMessage(page, number, message) {
  const url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
  console.log(`\n📤 Opening chat for +${number}...`);

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const INPUT_SELECTOR = 'div[contenteditable="true"][data-tab="10"]';

  try {
    await page.waitForSelector(INPUT_SELECTOR, { timeout: 20000 });
  } catch {
    const popup = await page.$('[data-testid="popup-contents"]');
    if (popup) {
      console.warn(`  ❌ Invalid or non-WhatsApp number: +${number}. Skipping.`);
      const okButton = await page.$('[data-testid="popup-contents"] button');
      if (okButton) await okButton.click();
    } else {
      console.warn(`  ⚠️ Timed out waiting for chat to load for +${number}. Skipping.`);
    }
    return false;
  }

  const input = await page.$(INPUT_SELECTOR);
  if (!input) {
    console.warn(`  ⚠️ Message box not found for +${number}. Skipping.`);
    return false;
  }

  await input.click();
  await sleep(500);
  await page.keyboard.press('Enter');

  await sleep(1000);
  const remaining = await input.innerText();
  if (remaining.trim() === '') {
    console.log(`  ✅ Message sent to +${number}`);
    return true;
  }

  console.warn(`  ⚠️ Message may not have sent for +${number} (input not cleared).`);
  return false;
}

(async () => {
  const numbers = await getNumbers();

  if (numbers.length === 0) {
    console.log('\n❌ No valid numbers found. Exiting.');
    process.exit(1);
  }

  if (numbers.length > MAX_NUMBERS) {
    console.log(`\n⚠️  WARNING: You entered ${numbers.length} numbers. Maximum allowed is ${MAX_NUMBERS}.`);
    console.log('❌ Aborting. Please reduce the list and try again.');
    process.exit(1);
  }

  console.log(`\n✅ ${numbers.length} number(s) ready to send.\n`);

  console.log('🚀 Launching WhatsApp Web...\n');

  const browser = await chromium.launchPersistentContext('./whatsapp-session', {
    headless: false,
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded' });

  console.log('⏳ Waiting for WhatsApp to load (scan QR if prompted)...');

  await page.waitForSelector('[data-testid="chat-list"], [data-testid="search-container"]', {
    timeout: 120000,
  });

  console.log('✅ Logged in to WhatsApp Web!\n');
  await sleep(2000);

  const results = { success: [], failed: [] };

  for (let i = 0; i < numbers.length; i++) {
    const ok = await sendMessage(page, numbers[i], MESSAGE);
    if (ok) {
      results.success.push(numbers[i]);
    } else {
      results.failed.push(numbers[i]);
    }

    if (i < numbers.length - 1) {
      const delay = randomDelay(...DELAY_BETWEEN_MS);
      console.log(`  ⏱️ Waiting ${(delay / 1000).toFixed(1)}s before next message...`);
      await sleep(delay);
    }
  }

  console.log('\n─────────────────────────────');
  console.log('📊 Summary:');
  console.log(`  ✅ Sent: ${results.success.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);
  console.log('─────────────────────────────\n');

  console.log('Done! Closing in 5s...');
  await sleep(5000);
  await browser.close();
})();
