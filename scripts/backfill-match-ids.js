// backfill-match-ids.js
// One-time script to find CricClubs matchIds for existing Supabase results
// and update the match_id column.
// Run: node scripts/backfill-match-ids.js

const { chromium } = require("playwright");
const { createClient } = require("@supabase/supabase-js");

const CLUB_ID = "1097646";
const LEAGUE = "TSCL1";
const TEAM_ID = "257";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function scrapeMatchesFromUrl(page, url) {
  console.log(`  Fetching: ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });

  let attempts = 0;
  while ((await page.title()).includes("Just a moment") && attempts < 10) {
    await page.waitForTimeout(3000);
    attempts++;
  }

  await page.waitForTimeout(2000);

  const noResults = await page.locator(".empty-state").count();
  if (noResults > 0) {
    console.log("  No matches found on this page.");
    return [];
  }

  const tableExists = await page.locator("#schedule-table1").count();
  if (tableExists === 0) {
    console.log("  Table not found on this page.");
    return [];
  }

  const rows = await page.$$eval("#schedule-table1 tbody tr", (trs) =>
    trs.map((tr) => {
      const cells = Array.from(tr.querySelectorAll("td")).map((td) =>
        td.innerText.trim()
      );
      const matchId = tr.id ? parseInt(tr.id.replace("row", ""), 10) : null;
      return { cells, matchId };
    })
  );

  const matches = [];
  for (const { cells, matchId } of rows) {
    if (cells.length < 6 || !matchId) continue;
    const dateRaw = cells[2] || "";
    const teamOne = cells[3] || "";
    const teamTwo = cells[4] || "";

    if (!/\d{2}\/\d{2}\/\d{4}/.test(dateRaw)) continue;
    const [month, day, year] = dateRaw.split("/");
    const date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    matches.push({ matchId, date, teamOne, teamTwo });
  }

  console.log(`  Found ${matches.length} matches.`);
  return matches;
}

async function main() {
  // Fetch all results from Supabase that are missing match_id
  const { data: existing, error } = await supabase
    .from("results")
    .select("id, opponent, date, match_id")
    .is("match_id", null);

  if (error) throw error;
  if (!existing || existing.length === 0) {
    console.log("All results already have match_id — nothing to backfill.");
    return;
  }

  console.log(`Found ${existing.length} results without match_id to backfill.`);

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
  });
  const page = await context.newPage();

  // League IDs from CricClubs nav:
  // 21 = TSCL 35 2026, 20 = TSCL T20 2025, 19 = TSCL 35 2025, 14 = TSCL T20 2024
  // Note: teamId=257 is only valid for league 21. For past leagues, scrape all matches
  // and filter by DCORP team name.
  const leagueIds = [19, 20];
  const allScraped = [];

  for (const leagueId of leagueIds) {
    // No teamId filter — scrape all matches in the league, then filter for DCORP
    const url = `https://cricclubs.com/${LEAGUE}/listMatches.do?league=${leagueId}&teamId=null&internalClubId=null&year=null&clubId=${CLUB_ID}`;
    console.log(`\nScraping all matches in league ${leagueId}...`);
    const matches = await scrapeMatchesFromUrl(page, url);
    // Keep only matches involving DCORP
    const dcorpMatches = matches.filter(m => {
      const t1 = m.teamOne.toLowerCase();
      const t2 = m.teamTwo.toLowerCase();
      return t1.includes("dcorp") || t1.includes("d corp") || t2.includes("dcorp") || t2.includes("d corp");
    });
    console.log(`  ${dcorpMatches.length} DCORP matches found.`);
    allScraped.push(...dcorpMatches);
  }

  await browser.close();

  console.log(`\nTotal scraped matches: ${allScraped.length}`);

  // Match scraped data to Supabase records by date + opponent name similarity
  let updated = 0;
  for (const record of existing) {
    const candidate = allScraped.find((s) => {
      if (s.date !== record.date) return false;
      const oppLower = record.opponent.toLowerCase();
      const t1 = s.teamOne.toLowerCase();
      const t2 = s.teamTwo.toLowerCase();
      // Check if opponent name matches either team (partial match)
      return (
        t1.includes(oppLower) || oppLower.includes(t1) ||
        t2.includes(oppLower) || oppLower.includes(t2)
      );
    });

    if (candidate) {
      console.log(`Updating id=${record.id} (${record.date} vs ${record.opponent}) → matchId=${candidate.matchId}`);
      const { error: updateError } = await supabase
        .from("results")
        .update({ match_id: candidate.matchId })
        .eq("id", record.id);
      if (updateError) {
        console.error(`  Failed to update id=${record.id}:`, updateError.message);
      } else {
        updated++;
      }
    } else {
      console.log(`No match found for id=${record.id} (${record.date} vs ${record.opponent})`);
    }
  }

  console.log(`\nDone. Updated ${updated}/${existing.length} records.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
