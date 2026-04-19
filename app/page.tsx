import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import HeroSlideshow from "@/components/HeroSlideshow";
import PhotoStrip from "@/components/PhotoStrip";
import Countdown from "@/components/Countdown";
import GalleryGrid from "@/components/GalleryGrid";
import StatBar from "@/components/StatBar";

const BUCKET = "Dcorp-cricket";
const CLUB_ID = "1097646";
const LEAGUE  = "TSCL1";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dcorp Cricket Club | Oklahoma City",
  description:
    "Dcorp Cricket Club — Oklahoma City's premier cricket team since 2014. Competing in TSCL 35-over and T20 leagues. Now recruiting for TSCL 35 2026.",
  alternates: { canonical: "https://dcorpcc.com" },
  openGraph: {
    title: "Dcorp Cricket Club | Oklahoma City",
    description:
      "Oklahoma City's premier cricket club — competing at the highest level since 2014.",
    url: "https://dcorpcc.com",
  },
};

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

export default async function HomePage() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  const [{ data: results }, { data: fixturesData }, { data: files }] = await Promise.all([
    supabase.from("results").select("*").order("date", { ascending: false }).limit(5),
    supabase.from("fixtures").select("*").gte("date", todayStr).order("date", { ascending: true }).limit(1),
    supabase.storage.from(BUCKET).list("", { limit: 50, sortBy: { column: "created_at", order: "desc" } }),
  ]);

  const nextMatch = fixturesData?.[0] ?? null;

  const imageUrls =
    files
      ?.filter((f) => f.name !== ".emptyFolderPlaceholder" && /\.(jpe?g|png|webp|gif|avif)$/i.test(f.name))
      .map((f) => supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl) ?? [];

  const heroImages    = imageUrls.slice(0, 6);
  const galleryImages = imageUrls.slice(0, 8);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)" }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ minHeight: "calc(100vh - 4rem)", paddingBottom: "80px", paddingLeft: "clamp(24px,4vw,60px)", paddingRight: "clamp(24px,4vw,60px)" }}
      >
        <HeroSlideshow images={heroImages} />
        <div className="relative z-10" style={{ maxWidth: "780px" }}>
          <div
            className="inline-flex items-center gap-2 mb-5 font-bold uppercase"
            style={{ background: "var(--gold)", color: "var(--bg)", padding: "5px 14px", fontSize: "11px", letterSpacing: "0.14em", borderRadius: "2px" }}
          >
            <span className="rounded-full animate-pulse" style={{ width: 6, height: 6, background: "var(--bg)", flexShrink: 0 }} />
            Now Recruiting — TSCL 35 2026
          </div>
          <p className="font-semibold uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.2em", color: "var(--gold)" }}>
            Est. 2014 · Oklahoma City
          </p>
          <h1
            className="font-display font-black uppercase text-white"
            style={{ fontSize: "clamp(56px, 8vw, 112px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.01em", marginBottom: "24px" }}
          >
            Passionate<br />Cricket.<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Serious</em><br />
            Competition.
          </h1>
          <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "500px", lineHeight: "1.6", marginBottom: "36px" }}>
            Oklahoma City&apos;s premier cricket club — competing at the highest level since 2014.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="/join"
              style={{ background: "var(--gold)", color: "var(--bg)", padding: "14px 32px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", textDecoration: "none" }}
            >
              Join the Club
            </Link>
            <Link
              href="/fixtures"
              style={{ border: "1px solid var(--border)", color: "var(--text)", padding: "14px 32px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", textDecoration: "none" }}
            >
              View Fixtures →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <StatBar />

      {/* ── PHOTO TICKER ── */}
      <PhotoStrip urls={imageUrls} />

      {/* ── FIXTURES & RESULTS ── */}
      <section style={{ padding: "80px clamp(24px,4vw,60px)" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "10px" }}>
          On the Pitch
        </div>
        <h2
          className="font-display font-extrabold uppercase"
          style={{ fontSize: "clamp(36px,5vw,64px)", lineHeight: 1, marginBottom: "48px" }}
        >
          Fixtures <em style={{ fontStyle: "italic", color: "var(--gold)" }}>&amp;</em> Results
        </h2>

        {/* Featured Next Match */}
        {nextMatch && (
          <div className="relative overflow-hidden" style={{ border: "1px solid var(--border)", marginBottom: "32px" }}>
            {/* bg image */}
            {heroImages[0] && (
              <div className="absolute inset-0">
                <Image src={heroImages[0]} alt="" fill className="object-cover" style={{ objectPosition: "center 30%", opacity: 0.07 }} sizes="100vw" />
              </div>
            )}
            <div
              className="relative z-10"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "40px",
                padding: "48px",
                alignItems: "center",
              }}
            >
              {/* Left */}
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "32px" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", animation: "blink 1.4s infinite", flexShrink: 0, display: "inline-block" }} />
                  Next Match · TSCL 35-Over
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "32px", marginBottom: "32px" }}>
                  {/* Dcorp */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div
                      style={{ width: 72, height: 72, borderRadius: "4px", background: "var(--bg3)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 900, color: "var(--gold)", letterSpacing: "0.04em" }}
                    >
                      DC
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 700 }}>Dcorp CC</div>
                    <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", background: "var(--gold)", color: "var(--bg)", padding: "2px 8px", borderRadius: "2px", width: "fit-content" }}>
                      {nextMatch.is_home ? "Home" : "Away"}
                    </div>
                  </div>
                  {/* VS */}
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 900, color: "var(--border)", flexShrink: 0 }}>VS</div>
                  {/* Opponent */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div
                      style={{ width: 72, height: 72, borderRadius: "4px", background: "var(--bg3)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 900, color: "var(--muted)", letterSpacing: "0.04em" }}
                    >
                      {nextMatch.opponent.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 700 }}>{nextMatch.opponent}</div>
                    <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", background: "var(--bg3)", color: "var(--muted)", padding: "2px 8px", borderRadius: "2px", width: "fit-content" }}>
                      {nextMatch.is_home ? "Away" : "Home"}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", marginBottom: "28px" }}>
                  {[
                    { icon: "📅", val: `${nextMatch.day}, ${new Date(nextMatch.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}` },
                    { icon: "📍", val: nextMatch.venue },
                    { icon: "🏏", val: "35-Over League" },
                  ].map((d) => (
                    <div key={d.val} style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 500, display: "flex", alignItems: "center", gap: "7px" }}>
                      <span>{d.icon}</span> {d.val}
                    </div>
                  ))}
                </div>

                <Link
                  href="/fixtures"
                  style={{ background: "var(--gold)", color: "var(--bg)", padding: "14px 28px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", textDecoration: "none", display: "inline-block" }}
                >
                  View All Fixtures →
                </Link>
              </div>

              {/* Right: Countdown */}
              <div style={{ textAlign: "center", minWidth: "260px" }}>
                <Countdown targetDate={nextMatch.date} />
              </div>
            </div>
          </div>
        )}

        {/* Recent Results table */}
        {results && results.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0 12px", borderBottom: "1px solid var(--border)", marginBottom: 0 }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>Recent Results</span>
              <Link href="/fixtures" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none" }}>Full Fixture List →</Link>
            </div>

            {(results as Result[]).map((match) => {
              const { dcorp, opponent } = parseScores(match.dcorp_score, match.opponent_score);
              const won = match.result === "won";
              const pct = runBarPct(match.result, match.margin);

              // parse individual score parts for display
              const fmtScore = (raw: string) => {
                const m = raw.match(/^([\d/]+)\(?([^)]*)\)?/);
                if (m) return { runs: m[1], overs: m[2] };
                return { runs: raw, overs: "" };
              };
              const dcSc = fmtScore(dcorp);
              const opSc = fmtScore(opponent);

              return (
                <div
                  key={match.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr auto 120px 90px",
                    alignItems: "center",
                    gap: "20px",
                    padding: "18px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {/* W/L badge */}
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 900, flexShrink: 0,
                      background: won ? "oklch(62% 0.16 145 / 0.18)" : "oklch(50% 0.18 25 / 0.18)",
                      color: won ? "var(--green)" : "var(--red)",
                      border: won ? "1px solid oklch(62% 0.16 145 / 0.3)" : "1px solid oklch(50% 0.18 25 / 0.3)",
                    }}
                  >
                    {won ? "W" : "L"}
                  </div>

                  {/* Teams + scores */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>Dcorp CC</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>
                      {dcSc.runs} {dcSc.overs && <span style={{ fontSize: "12px", fontWeight: 400, color: "var(--muted)" }}>({dcSc.overs})</span>}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--border)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>vs</span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--muted)" }}>{match.opponent}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--muted)" }}>
                      {opSc.runs} {opSc.overs && <span style={{ fontSize: "12px", fontWeight: 400 }}>({opSc.overs})</span>}
                    </span>
                  </div>

                  {/* Margin */}
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" }}>
                    {match.margin ?? ""}
                  </div>

                  {/* Run bar */}
                  <div style={{ height: "4px", background: "var(--bg3)", borderRadius: "2px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: won ? "var(--green)" : "var(--red)",
                        borderRadius: "2px",
                        transition: "width 1s ease",
                      }}
                    />
                  </div>

                  {/* Scorecard link */}
                  {match.match_id ? (
                    <a
                      href={`https://cricclubs.com/${LEAGUE}/viewScorecard.do?matchId=${match.match_id}&clubId=${CLUB_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", textAlign: "right", display: "block" }}
                    >
                      Scorecard ↗
                    </a>
                  ) : (
                    <span />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: "80px clamp(24px,4vw,60px)", background: "var(--bg)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "10px" }}>
              Photography
            </div>
            <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(36px,5vw,64px)", lineHeight: 1 }}>
              Match <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Gallery</em>
            </h2>
          </div>
          <Link
            href="/gallery"
            style={{ border: "1px solid var(--border)", color: "var(--text)", padding: "14px 28px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", textDecoration: "none" }}
          >
            View Full Gallery →
          </Link>
        </div>

        {galleryImages.length > 0 ? (
          <GalleryGrid urls={galleryImages} />
        ) : (
          <div style={{ border: "1px solid var(--border)", padding: "64px", textAlign: "center" }}>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>No photos yet.</p>
          </div>
        )}
      </section>

      {/* ── HONOURS BOARD ── */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "80px clamp(24px,4vw,60px)" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "10px" }}>
          Club History
        </div>
        <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(36px,5vw,64px)", lineHeight: 1, marginBottom: "48px" }}>
          Honours <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Board</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {[
            {
              title: "League Trophies",
              items: [
                { icon: "🏆", title: "35-Over Winners", year: "2018" },
                { icon: "🏆", title: "T20 Winners", year: "2024" },
                { icon: "🥈", title: "T20 Runner-up", year: "2017 & 2018" },
                { icon: "🥈", title: "35-Over Runner-up", year: "2024" },
              ],
            },
            {
              title: "Club Records",
              items: [
                { icon: "🏅", title: "Playoff Appearances", year: "Every season 2017–2026" },
                { icon: "🏅", title: "Best Final Chase", year: "2024 T20 — Won by 10 Wickets" },
                { icon: "🏅", title: "Back-to-Back T20 Hundreds", year: "2024 Semis & Final — Rohit" },
              ],
            },
            {
              title: "Individual Awards",
              items: [
                { icon: "⭐", title: "Best Wicket Keeper T20", year: "2017 — Bhargav Meda" },
                { icon: "⭐", title: "Best Bowler T20", year: "2021 — Aditya Teekayagari" },
                { icon: "⭐", title: "Best Bowler T20", year: "2025 — Vivek Terapalli" },
                { icon: "⭐", title: "Best Wicket Keeper", year: "2025 — Jayadeep Reddy" },
              ],
            },
          ].map((group) => (
            <div key={group.title} style={{ background: "var(--bg)", padding: "36px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
                {group.title}
              </div>
              {group.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "14px 0", borderBottom: i < group.items.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{item.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 600, marginTop: "2px" }}>{item.year}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section
        className="relative text-center overflow-hidden"
        style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "100px clamp(24px,4vw,60px)" }}
      >
        {imageUrls[2] && (
          <div className="absolute inset-0">
            <Image src={imageUrls[2]} alt="" fill className="object-cover" style={{ opacity: 0.08 }} sizes="100vw" />
          </div>
        )}
        <div className="relative z-10">
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px" }}>
            Now Recruiting
          </div>
          <h2 className="font-display font-black uppercase" style={{ fontSize: "clamp(48px,7vw,96px)", lineHeight: 0.95, marginBottom: "24px" }}>
            Ready to<br />Play for <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Dcorp?</em>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "500px", margin: "0 auto 40px", lineHeight: "1.6" }}>
            Whether you&apos;re an experienced cricketer or just starting out, there&apos;s a place for you at Dcorp Cricket Club.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/join"
              style={{ background: "var(--gold)", color: "var(--bg)", padding: "16px 40px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", textDecoration: "none" }}
            >
              Apply to Join Now
            </Link>
            <Link
              href="/players"
              style={{ border: "1px solid var(--border)", color: "var(--text)", padding: "16px 40px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", textDecoration: "none" }}
            >
              Meet the Squad →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
