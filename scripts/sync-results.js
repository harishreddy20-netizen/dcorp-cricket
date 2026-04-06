// sync-results.js
// Scrapes match results from CricClubs and syncs to Supabase.
// Run via GitHub Actions on a schedule, or manually: node scripts/sync-results.js

const { chromium } = require("playwright");
const { createClient } = require("@supabase/supabase-js");

const CLUB_ID = "1097646";
const LEAGUE = "TSCL1";
const URL = `https://cricclubs.com/${LEAGUE}/listMatches.do?clubId=${CLUB_ID}`;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function parseScore(raw) {
  if (!raw) return "";
  return raw.trim().replace(/\s+/g, "");
}

function parseResult(margin) {
  if (!margin) return null;
  const m = margin.toLowerCase();
  if (m.includes("won") || m.includes("win")) return "won";
  if (m.includes("lost") || m.includes("loss") || m.includes("defeat")) return "lost";
  return null;
}

async function scrapeResults(page) {
  await page.waitForSelector("table", { timeout: 30000 });

  const rows = await page.$$eval("table tr", (trs) =>
    trs.slice(1).map((tr) => {
      const cells = Array.from(tr.querySelectorAll("td")).map((td) =>
        td.innerText.trim()
      );
      return cells;
    })
  );

  const results = [];

  for (const cells of rows) {
    if (cells.length < 5) continue;

    const dateRaw = cells[0];
    const matchType = cells[1] || "League";
    const homeTeam = cells[2] || "";
    const homeScore = parseScore(cells[3]);
    const awayTeam = cells[4] || "";
    const awayScore = parseScore(cells[5]);
    const margin = cells[6] || "";

    if (!dateRaw || !/\d{4}|\d{2}\/\d{2}/.test(dateRaw)) continue;

    let date = null;
    try {
      const d = new Date(dateRaw);
      if (!isNaN(d)) date = d.toISOString().split("T")[0];
    } catch {
      continue;
    }
    if (!date) continue;

    const dcorpIsHome =
      homeTeam.toLowerCase().includes("dcorp") ||
      homeTeam.toLowerCase().includes("d corp");

    const opponent = dcorpIsHome ? awayTeam : homeTeam;
    const dcorpScore = dcorpIsHome ? homeScore : awayScore;
    const opponentScore = dcorpIsHome ? awayScore : homeScore;
    const result = parseResult(margin);

    if (!opponent || !dcorpScore || !result) continue;

    results.push({
      opponent: opponent.trim(),
      date,
      type: matchType.trim(),
      dcorp_score: dcorpScore,
      opponent_score: opponentScore,
      result,
      margin: margin.trim(),
    });
  }

  return results;
}

async function main() {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  try {
    console.log(`Navigating to ${URL}`);
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

    // Wait for Cloudflare challenge to clear if present
    const title = await page.title();
    if (title.includes("Just a moment")) {
      console.log("Cloudflare challenge detected, waiting...");
      await page.waitForFunction(
        () => !document.title.includes("Just a moment"),
        { timeout: 30000 }
      );
    }

    console.log("Page loaded, scraping results...");
    const scraped = await scrapeResults(page);
    console.log(`Found ${scraped.length} results on CricClubs`);

    if (scraped.length === 0) {
      console.log("No results found — saving debug screenshot.");
      await page.screenshot({ path: "debug-screenshot.png" });
      process.exit(1);
    }

    // Fetch existing results to avoid duplicates
    const { data: existing } = await supabase
      .from("results")
      .select("opponent, date, type");

    const existingKeys = new Set(
      (existing || []).map((r) => `${r.opponent}|${r.date}|${r.type}`)
    );

    const newResults = scraped.filter(
      (r) => !existingKeys.has(`${r.opponent}|${r.date}|${r.type}`)
    );

    console.log(`${newResults.length} new results to insert`);

    if (newResults.length > 0) {
      const { error } = await supabase.from("results").insert(newResults);
      if (error) throw error;
      console.log(`Inserted ${newResults.length} new results ✓`);
    } else {
      console.log("Already up to date — nothing to insert");
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
