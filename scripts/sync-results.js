// sync-results.js
// Scrapes match results from CricClubs and syncs to Supabase.
// Run via GitHub Actions on a schedule, or manually: node scripts/sync-results.js

const { chromium } = require("playwright");
const { createClient } = require("@supabase/supabase-js");

const CLUB_ID = "1097646";
const LEAGUE = "TSCL1";
const TEAM_ID = "257"; // DCORP's team ID
const URL = `https://cricclubs.com/${LEAGUE}/listMatches.do?league=21&teamId=${TEAM_ID}&internalClubId=null&year=null&clubId=${CLUB_ID}`;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function parseResult(resultText, dcorpTeam) {
  if (!resultText) return null;
  const lower = resultText.toLowerCase();
  // Result looks like "DCORP won by 5 wickets" or "GSO won by 74 runs"
  // Check if DCORP is mentioned as the winner
  const winnerMatch = resultText.match(/^(.+?)\s+won\s+by/i);
  if (!winnerMatch) {
    if (lower.includes("tie") || lower.includes("no result") || lower.includes("abandon")) return "tie";
    return null;
  }
  const winner = winnerMatch[1].trim().toLowerCase();
  if (winner.includes("dcorp") || winner.includes("d corp")) return "won";
  return "lost";
}

function parseScoreSummary(summaryText, teamName) {
  // Summary looks like "DCORP: 194/7(30.0)\nGSO: 195/5(28.1)"
  if (!summaryText) return "";
  const lines = summaryText.split(/\n/).map(l => l.trim()).filter(Boolean);
  for (const line of lines) {
    if (line.toLowerCase().startsWith(teamName.toLowerCase() + ":")) {
      return line.replace(/^[^:]+:\s*/, "").replace(/\s+/g, "").trim();
    }
  }
  return "";
}

async function scrapeResults(page) {
  // Check for "no results" state first
  const noResults = await page.locator(".empty-state").count();
  if (noResults > 0) {
    console.log("CricClubs reports no matches for DCORP yet.");
    return [];
  }

  // Wait for the table
  const tableExists = await page.locator("#schedule-table1").count();
  if (tableExists === 0) {
    console.log("Table #schedule-table1 not found — dumping page HTML.");
    const html = await page.content();
    require("fs").writeFileSync("debug-page.html", html);
    await page.screenshot({ path: "debug-screenshot.png", fullPage: true });
    throw new Error("Table #schedule-table1 not found on page. Debug files saved.");
  }

  const rows = await page.$$eval("#schedule-table1 tbody tr", (trs) =>
    trs.map((tr) => {
      const cells = Array.from(tr.querySelectorAll("td")).map((td) =>
        td.innerText.trim()
      );
      return cells;
    })
  );

  console.log(`Found ${rows.length} rows in #schedule-table1`);

  const results = [];

  for (const cells of rows) {
    // Columns: [0]=SNO, [1]=Match Type, [2]=Date, [3]=Team One, [4]=Team Two, [5]=Result, [6]=Score Summary, [7]=Points
    if (cells.length < 6) continue;

    const matchType = cells[1] || "League";
    const dateRaw = cells[2] || "";
    const teamOne = cells[3] || "";
    const teamTwo = cells[4] || "";
    const resultText = cells[5] || "";
    const scoreSummary = cells[6] || "";

    // Parse date (MM/DD/YYYY)
    if (!dateRaw || !/\d{2}\/\d{2}\/\d{4}/.test(dateRaw)) continue;
    let date = null;
    try {
      const [month, day, year] = dateRaw.split("/");
      date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } catch {
      continue;
    }
    if (!date) continue;

    // Determine which team is DCORP
    const dcorpIsTeamOne =
      teamOne.toLowerCase().includes("dcorp") ||
      teamOne.toLowerCase().includes("d corp");
    const dcorpIsTeamTwo =
      teamTwo.toLowerCase().includes("dcorp") ||
      teamTwo.toLowerCase().includes("d corp");

    if (!dcorpIsTeamOne && !dcorpIsTeamTwo) {
      console.log(`Skipping match: ${teamOne} vs ${teamTwo} — DCORP not involved`);
      continue;
    }

    const dcorpTeam = dcorpIsTeamOne ? teamOne : teamTwo;
    const opponent = dcorpIsTeamOne ? teamTwo : teamOne;

    const result = parseResult(resultText, dcorpTeam);
    if (!result) {
      console.log(`Skipping match on ${date}: could not parse result from "${resultText}"`);
      continue;
    }

    // Parse scores from the summary
    const dcorpScore = parseScoreSummary(scoreSummary, dcorpTeam);
    const opponentScore = parseScoreSummary(scoreSummary, opponent);

    results.push({
      opponent: opponent.trim(),
      date,
      type: matchType.trim(),
      dcorp_score: dcorpScore,
      opponent_score: opponentScore,
      result,
      margin: resultText.trim(),
    });
  }

  return results;
}

async function main() {
  console.log("Launching browser...");
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
  });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  const page = await context.newPage();

  try {
    console.log(`Navigating to ${URL}`);
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });

    // Wait for Cloudflare challenge to clear if present
    let attempts = 0;
    while ((await page.title()).includes("Just a moment") && attempts < 10) {
      console.log(`Cloudflare challenge detected, waiting... (${attempts + 1}/10)`);
      await page.waitForTimeout(3000);
      attempts++;
    }

    if ((await page.title()).includes("Just a moment")) {
      console.log("Cloudflare challenge did not clear — saving screenshot.");
      await page.screenshot({ path: "debug-screenshot.png" });
      process.exit(1);
    }

    // Extra wait for AJAX-loaded table content
    await page.waitForTimeout(3000);

    console.log("Page loaded, scraping results...");
    const scraped = await scrapeResults(page);
    console.log(`Found ${scraped.length} DCORP results on CricClubs`);

    if (scraped.length === 0) {
      console.log("No DCORP matches found on CricClubs — nothing to sync.");
      return;
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
      console.log("Results to insert:", JSON.stringify(newResults, null, 2));
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
