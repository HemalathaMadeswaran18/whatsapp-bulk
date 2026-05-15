const { chromium } = require('playwright');
const readline = require('readline');

// ─────────────────────────────────────────────
// MESSAGE VARIANTS (randomly picked per send)
// ─────────────────────────────────────────────
const MESSAGES = [
  `Hey! I saw that you're interested in AI and Open Source.

Observal is an Open Source project being run by ex-GSoC community members. Thought it might be up your alley.

Check out the repo and react to this message if you'd like to contribute!

https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hey! Noticed you're into AI and Open Source projects.

We're building Observal, run by former GSoC community members, and we're looking for contributors.

Have a look: https://github.com/BlazeUp-AI/Observal
Join the community: https://discord.gg/SFPjnTWddk`,

  `Hi! I saw that you're exploring AI and Open Source.

Wanted to share Observal with you. It's a project led by ex-GSoC members and open for contributions.

https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hey! I came across your profile and saw you're into AI/Open Source.

Observal is a project by former GSoC community members. We'd love to have you contribute.

Repo: https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hi! Saw that you're interested in AI and Open Source contributions.

Observal is run by ex-GSoC folks and actively looking for contributors. Thought you'd be a good fit.

https://github.com/BlazeUp-AI/Observal
https://discord.gg/SFPjnTWddk`,

  `Hey! I noticed you're into AI and Open Source work.

There's this project called Observal, built by former GSoC community members. We're growing the team.

Check it out: https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hi! I saw your interest in AI and Open Source.

Observal is an open source project by ex-GSoC members. Thought I'd share it with you.

https://github.com/BlazeUp-AI/Observal
Community: https://discord.gg/SFPjnTWddk

React if you'd like to get involved!`,

  `Hey! Noticed you've been exploring AI and Open Source projects.

Observal is one you might like. It's led by former GSoC community members and we need contributors.

GitHub: https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hi! I saw that you're into AI and Open Source stuff.

Wanted to put Observal on your radar. It's run by ex-GSoC members and open for contributions right now.

https://github.com/BlazeUp-AI/Observal
https://discord.gg/SFPjnTWddk`,

  `Hey! I came across your profile. Looks like you're into AI and Open Source.

Observal is a project by former GSoC community members. We're actively looking for people to join.

Repo: https://github.com/BlazeUp-AI/Observal
Join us: https://discord.gg/SFPjnTWddk`,

  `Hi! Saw that you're interested in AI and Open Source.

Observal is being built by ex-GSoC community members and we're welcoming contributors.

Have a look and react if you'd like to join!

https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hey! I noticed your interest in AI and Open Source projects.

Thought you'd want to know about Observal. It's run by former GSoC members and looking for contributors.

https://github.com/BlazeUp-AI/Observal
https://discord.gg/SFPjnTWddk`,

  `Hi! I saw you're into AI and Open Source work.

Observal is a project by ex-GSoC community members. We'd love more contributors on board.

Check the repo: https://github.com/BlazeUp-AI/Observal
Discord server: https://discord.gg/SFPjnTWddk`,

  `Hey! Noticed you're interested in AI and Open Source contributions.

Observal is led by former GSoC community members and we're looking for people to help build it.

https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hi! I saw that you're exploring AI and Open Source.

There's a project called Observal, run by ex-GSoC members. Thought it'd be relevant to you.

GitHub: https://github.com/BlazeUp-AI/Observal
Community Discord: https://discord.gg/SFPjnTWddk`,

  `Hey! I came across your profile and noticed you're into AI/Open Source.

Observal is an open source project by former GSoC community members. Contributions are welcome.

https://github.com/BlazeUp-AI/Observal
https://discord.gg/SFPjnTWddk`,

  `Hi! Saw you're interested in AI and Open Source.

Observal is run by ex-GSoC folks. We're building it out and looking for contributors.

Repo: https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk

Let me know if you'd like to join!`,

  `Hey! I noticed you're into AI and Open Source projects.

Wanted to share Observal. It's by former GSoC community members and open for contributions.

https://github.com/BlazeUp-AI/Observal
Join the Discord: https://discord.gg/SFPjnTWddk`,

  `Hi! I saw your interest in AI and Open Source work.

Observal is a project led by ex-GSoC members. We're actively growing the contributor base.

Check it out: https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hey! Noticed you've been into AI and Open Source.

Observal is built by former GSoC community members. Thought you might want to contribute.

https://github.com/BlazeUp-AI/Observal
https://discord.gg/SFPjnTWddk`,

  `Hi! I saw that you're interested in AI and Open Source contributions.

Observal is run by ex-GSoC members and we're looking for more people to join the project.

GitHub: https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hey! I came across your profile. Noticed you're into AI and Open Source.

Observal is a project by former GSoC community members. We'd love to have you on board.

https://github.com/BlazeUp-AI/Observal
Community: https://discord.gg/SFPjnTWddk`,

  `Hi! Saw that you're exploring AI and Open Source projects.

Observal is led by ex-GSoC members and actively seeking contributors. Thought I'd reach out.

Repo: https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk`,

  `Hey! I noticed you're interested in AI and Open Source.

Observal is being built by former GSoC community members. We're looking for contributors to join.

https://github.com/BlazeUp-AI/Observal
Join us on Discord: https://discord.gg/SFPjnTWddk`,

  `Hi! I saw you're into AI and Open Source stuff.

Observal is a project run by ex-GSoC members. Thought you'd want to check it out.

https://github.com/BlazeUp-AI/Observal
Discord: https://discord.gg/SFPjnTWddk

React if you'd like to contribute!`,
];

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const MAX_NUMBERS = 45;
const DELAY_BETWEEN_MS = [6000, 14000];
// ─────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickMessage() {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
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

async function sendMessage(page, number) {
  const message = pickMessage();
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
    const ok = await sendMessage(page, numbers[i]);
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
