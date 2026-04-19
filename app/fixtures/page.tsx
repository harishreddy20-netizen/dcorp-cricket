import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { fixtures } from "@/lib/data";

export const metadata: Metadata = {
  title: "Fixtures & Results",
  description: "Upcoming fixtures and past match results for Dcorp Cricket Club.",
  alternates: { canonical: "https://dcorpcc.com/fixtures" },
};

export const dynamic = "force-dynamic";

const CLUB_ID = "1097646";
const LEAGUE  = "TSCL1";

type Result = {
  id: number;
  opponent: string;
  date: string;
  type: string;
  dcorp_score: string | null;
  opponent_score: string | null;
  result: "won" | "lost";
  margin: string | null;
  match_id: number | null;
};

function parseScores(dcorpRaw: string | null, opponentRaw: string | null) {
  const opScore = (opponentRaw ?? "").trim();
  const dcScore = (dcorpRaw ?? "").trim();
  if (opScore) return { dcorp: dcScore || "—", opponent: opScore };
  const match = dcScore.match(/^([^A-Z]+)[A-Z]+:(.+)$/);
  if (match) return { dcorp: match[1].trim(), opponent: match[2].trim() };
  return { dcorp: dcScore || "—", opponent: "—" };
}

function runBarPct(result: "won" | "lost", margin: string | null): number {
  if (result === "lost") return 25;
  const m = margin ?? "";
  const runs = m.match(/(\d+)\s*run/i);
  if (runs) return Math.min(90, 52 + Math.floor(Number(runs[1]) / 3));
  const wkts = m.match(/(\d+)\s*w/i);
  if (wkts) return Math.min(95, 60 + Number(wkts[1]) * 3);
  return 65;
}

function groupByMonth(items: typeof fixtures) {
  return items.reduce<Record<string, typeof fixtures>>((acc, match) => {
    const month = new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(match);
    return acc;
  }, {});
}

export default async function FixturesPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data: results, error } = await supabase
    .from("results")
    .select("*")
    .order("date", { ascending: false });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingFixtures = fixtures.filter((f) => new Date(f.date + "T00:00:00") >= today);
  const grouped = groupByMonth(upcomingFixtures);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dcorp Cricket Club 2026 Fixtures",
    itemListElement: upcomingFixtures.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SportsEvent",
        name: `Dcorp CC vs ${f.opponent}`,
        startDate: `${f.date}T00:00:00`,
        location: {
          "@type": "Place",
          name: f.venue,
          address: { "@type": "PostalAddress", addressLocality: "Oklahoma City", addressRegion: "OK" },
        },
        competitor: [
          { "@type": "SportsTeam", name: "Dcorp Cricket Club" },
          { "@type": "SportsTeam", name: f.opponent },
        ],
      },
    })),
  };

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />

      {/* ── PAGE HEADER ── */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "60px clamp(24px,4vw,60px) 48px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "10px" }}>
          Season 2026
        </div>
        <h1 className="font-display font-black uppercase" style={{ fontSize: "clamp(40px,6vw,80px)", lineHeight: 0.92, marginBottom: "16px" }}>
          Fixtures <em style={{ fontStyle: "italic", color: "var(--gold)" }}>&amp;</em> Results
        </h1>
        <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "480px", lineHeight: 1.6 }}>
          Full schedule and recent match results for TSCL 35 2026.
        </p>
      </div>

      <div style={{ padding: "60px clamp(24px,4vw,60px)" }}>

        {/* ── UPCOMING FIXTURES ── */}
        <section style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: 3, height: 24, background: "var(--gold)", borderRadius: 2, flexShrink: 0 }} />
            <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(24px,3vw,36px)", lineHeight: 1 }}>
              2026 Fixtures
            </h2>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>
              {upcomingFixtures.length} match{upcomingFixtures.length !== 1 ? "es" : ""}
            </span>
          </div>

          {upcomingFixtures.length === 0 ? (
            <div style={{ border: "1px solid var(--border)", padding: "64px", textAlign: "center" }}>
              <p style={{ color: "var(--muted)", fontSize: "14px" }}>No upcoming fixtures.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {Object.entries(grouped).map(([month, matches]) => (
                <div key={month}>
                  {/* Month label */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)" }}>{month}</span>
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    <span style={{ fontSize: "11px", color: "var(--muted)" }}>{matches.length} match{matches.length > 1 ? "es" : ""}</span>
                  </div>

                  {/* Match rows */}
                  <div style={{ border: "1px solid var(--border)" }}>
                    {/* Header row */}
                    <div
                      className="hidden sm:grid"
                      style={{
                        gridTemplateColumns: "90px 1fr 60px 1fr 120px",
                        gap: "16px",
                        padding: "12px 20px",
                        background: "var(--bg2)",
                        borderBottom: "1px solid var(--border)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      <span>Date</span>
                      <span>Home</span>
                      <span style={{ textAlign: "center" }}>vs</span>
                      <span>Away</span>
                      <span style={{ textAlign: "right" }}>Ground</span>
                    </div>

                    {matches.map((match, idx) => {
                      const home = match.isHome ? { abbr: "DC", name: "Dcorp CC", isDcorp: true } : { abbr: match.opponent.slice(0, 2).toUpperCase(), name: match.opponent, isDcorp: false };
                      const away = match.isHome ? { abbr: match.opponent.slice(0, 2).toUpperCase(), name: match.opponent, isDcorp: false } : { abbr: "DC", name: "Dcorp CC", isDcorp: true };

                      return (
                        <div
                          key={match.id}
                          style={{
                            borderBottom: idx < matches.length - 1 ? "1px solid var(--border)" : "none",
                          }}
                        >
                          {/* Mobile */}
                          <div className="sm:hidden" style={{ padding: "16px 20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                              <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 500 }}>
                                {match.day}, {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                              </span>
                              <span style={{ fontSize: "11px", color: "var(--muted)" }}>{match.venue}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: 32, height: 32, background: home.isDcorp ? "var(--gold)" : "var(--bg3)", border: "1px solid var(--border)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 900, color: home.isDcorp ? "var(--bg)" : "var(--muted)" }}>
                                  {home.abbr}
                                </div>
                                <span style={{ fontSize: "13px", fontWeight: home.isDcorp ? 700 : 500, color: home.isDcorp ? "var(--text)" : "var(--muted)" }}>{home.name}</span>
                              </div>
                              <span style={{ fontSize: "11px", color: "var(--border)", fontWeight: 700 }}>vs</span>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: 32, height: 32, background: away.isDcorp ? "var(--gold)" : "var(--bg3)", border: "1px solid var(--border)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 900, color: away.isDcorp ? "var(--bg)" : "var(--muted)" }}>
                                  {away.abbr}
                                </div>
                                <span style={{ fontSize: "13px", fontWeight: away.isDcorp ? 700 : 500, color: away.isDcorp ? "var(--text)" : "var(--muted)" }}>{away.name}</span>
                              </div>
                            </div>
                          </div>

                          {/* Desktop */}
                          <div
                            className="hidden sm:grid"
                            style={{
                              gridTemplateColumns: "90px 1fr 60px 1fr 120px",
                              gap: "16px",
                              padding: "16px 20px",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
                                {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                              </div>
                              <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>{match.day}</div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: 40, height: 40, background: home.isDcorp ? "var(--gold)" : "var(--bg3)", border: "1px solid var(--border)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 900, color: home.isDcorp ? "var(--bg)" : "var(--muted)", flexShrink: 0 }}>
                                {home.abbr}
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: home.isDcorp ? 700 : 500, color: home.isDcorp ? "var(--text)" : "var(--muted)" }}>{home.name}</span>
                            </div>

                            <div style={{ textAlign: "center" }}>
                              <span style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 900, color: "var(--border)" }}>VS</span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: 40, height: 40, background: away.isDcorp ? "var(--gold)" : "var(--bg3)", border: "1px solid var(--border)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 900, color: away.isDcorp ? "var(--bg)" : "var(--muted)", flexShrink: 0 }}>
                                {away.abbr}
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: away.isDcorp ? 700 : 500, color: away.isDcorp ? "var(--text)" : "var(--muted)" }}>{away.name}</span>
                            </div>

                            <div style={{ textAlign: "right", fontSize: "12px", color: "var(--muted)" }}>{match.venue}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--muted)" }}>
            <div style={{ width: 16, height: 16, background: "var(--gold)", borderRadius: "2px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "9px", fontWeight: 900, color: "var(--bg)" }}>DC</div>
            Gold badge = Dcorp CC
          </div>
        </section>

        {/* ── RECENT RESULTS ── */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: 3, height: 24, background: "var(--gold)", borderRadius: 2, flexShrink: 0 }} />
            <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(24px,3vw,36px)", lineHeight: 1 }}>
              Recent Results
            </h2>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            {results && results.length > 0 && (
              <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>{results.length} matches</span>
            )}
          </div>

          {error ? (
            <div style={{ border: "1px solid var(--border)", padding: "64px", textAlign: "center" }}>
              <p style={{ color: "var(--muted)", fontSize: "14px" }}>Failed to load results. Please try again later.</p>
            </div>
          ) : !results || results.length === 0 ? (
            <div style={{ border: "1px solid var(--border)", padding: "64px", textAlign: "center" }}>
              <p style={{ color: "var(--muted)", fontSize: "14px" }}>No results yet.</p>
            </div>
          ) : (
            <div>
              {/* Table header */}
              <div
                className="hidden sm:grid"
                style={{
                  gridTemplateColumns: "40px 1fr auto 140px 90px",
                  gap: "20px",
                  padding: "12px 0 10px",
                  borderBottom: "1px solid var(--border)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                <span></span>
                <span>Match</span>
                <span>Result</span>
                <span></span>
                <span style={{ textAlign: "right" }}>Scorecard</span>
              </div>

              {(results as Result[]).map((match) => {
                const { dcorp, opponent } = parseScores(match.dcorp_score, match.opponent_score);
                const won = match.result === "won";
                const pct = runBarPct(match.result, match.margin);

                const fmtScore = (raw: string) => {
                  const m = raw.match(/^([\d/]+)\(?([^)]*)\)?/);
                  if (m) return { runs: m[1], overs: m[2] };
                  return { runs: raw, overs: "" };
                };
                const dcSc = fmtScore(dcorp);
                const opSc = fmtScore(opponent);

                return (
                  <div key={match.id}>
                    {/* Desktop */}
                    <div
                      className="hidden sm:grid"
                      style={{
                        gridTemplateColumns: "40px 1fr auto 140px 90px",
                        alignItems: "center",
                        gap: "20px",
                        padding: "18px 0",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {/* W/L badge */}
                      <div style={{
                        width: 36, height: 36, borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 900, flexShrink: 0,
                        background: won ? "oklch(62% 0.16 145 / 0.18)" : "oklch(50% 0.18 25 / 0.18)",
                        color: won ? "var(--green)" : "var(--red)",
                        border: won ? "1px solid oklch(62% 0.16 145 / 0.3)" : "1px solid oklch(50% 0.18 25 / 0.3)",
                      }}>
                        {won ? "W" : "L"}
                      </div>

                      {/* Teams + scores */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>Dcorp CC</span>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>
                          {dcSc.runs}{dcSc.overs && <span style={{ fontSize: "12px", fontWeight: 400, color: "var(--muted)" }}> ({dcSc.overs})</span>}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--border)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>vs</span>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--muted)" }}>{match.opponent}</span>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--muted)" }}>
                          {opSc.runs}{opSc.overs && <span style={{ fontSize: "12px", fontWeight: 400 }}> ({opSc.overs})</span>}
                        </span>
                      </div>

                      {/* Margin + date */}
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" }}>{match.margin ?? ""}</div>
                        <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "3px" }}>
                          {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      </div>

                      {/* Run bar */}
                      <div style={{ height: 4, background: "var(--bg3)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: won ? "var(--green)" : "var(--red)", borderRadius: 2, transition: "width 1s ease" }} />
                      </div>

                      {/* Scorecard */}
                      {match.match_id ? (
                        <a
                          href={`https://cricclubs.com/${LEAGUE}/viewScorecard.do?matchId=${match.match_id}&clubId=${CLUB_ID}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", textAlign: "right", display: "block" }}
                        >
                          Scorecard ↗
                        </a>
                      ) : <span />}
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden" style={{ padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 900, flexShrink: 0,
                          background: won ? "oklch(62% 0.16 145 / 0.18)" : "oklch(50% 0.18 25 / 0.18)",
                          color: won ? "var(--green)" : "var(--red)",
                          border: won ? "1px solid oklch(62% 0.16 145 / 0.3)" : "1px solid oklch(50% 0.18 25 / 0.3)",
                        }}>
                          {won ? "W" : "L"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "13px", fontWeight: 700 }}>Dcorp CC</span>
                            <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700 }}>{dcSc.runs}</span>
                            <span style={{ fontSize: "10px", color: "var(--border)", fontWeight: 600 }}>vs</span>
                            <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 600 }}>{match.opponent}</span>
                            <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: "var(--muted)" }}>{opSc.runs}</span>
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>
                            {match.margin} · {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </div>
                        </div>
                        {match.match_id && (
                          <a
                            href={`https://cricclubs.com/${LEAGUE}/viewScorecard.do?matchId=${match.match_id}&clubId=${CLUB_ID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", flexShrink: 0 }}
                          >
                            ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
