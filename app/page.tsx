import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { fixtures } from "@/lib/data";
import HeroSlideshow from "@/components/HeroSlideshow";
import PhotoStrip from "@/components/PhotoStrip";

const BUCKET = "Dcorp-cricket";

const stats = [
  { value: "20+", label: "Squad Members" },
  { value: "10+", label: "Seasons Active" },
  { value: "75%", label: "Win Rate 2025" },
  { value: "2",   label: "League Titles" },
];

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dcorp Cricket Club | Oklahoma City",
  description:
    "Dcorp Cricket Club — Oklahoma City's competitive cricket club in TSCL since 2014. View fixtures, results, squad and join the club.",
  alternates: { canonical: "https://dcorpcc.com" },
  openGraph: {
    title: "Dcorp Cricket Club | Oklahoma City",
    description:
      "Oklahoma City's competitive cricket club playing in TSCL since 2014. View fixtures, results, squad and join the club.",
    url: "https://dcorpcc.com",
  },
};

export default async function HomePage() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const [{ data: results }, { data: files }] = await Promise.all([
    supabase.from("results").select("*").order("date", { ascending: false }).limit(1),
    supabase.storage.from(BUCKET).list("", { limit: 50, sortBy: { column: "created_at", order: "desc" } }),
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextMatch = fixtures.find((f) => new Date(f.date + "T00:00:00") >= today) ?? null;
  const latestResult = results?.[0] ?? null;

  const imageUrls =
    files
      ?.filter((f) => f.name !== ".emptyFolderPlaceholder" && /\.(jpe?g|png|webp|gif|avif)$/i.test(f.name))
      .map((f) => supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl) ?? [];

  const heroImages = imageUrls.slice(0, 6);
  const previewImages = imageUrls.slice(0, 6);

  const D = "#0d0f18";
  const D2 = "#131620";
  const GOLD = "#C9A44B";
  const MUTED = "#868ea5";
  const BORDER = "#23263a";
  const GREEN = "#2ea86b";

  return (
    <div style={{ background: D, color: "#eef0f5" }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ minHeight: "calc(100vh - 4rem)", paddingBottom: "80px", paddingLeft: "clamp(24px,4vw,64px)", paddingRight: "clamp(24px,4vw,64px)" }}
      >
        <HeroSlideshow images={heroImages} />

        {/* Content */}
        <div className="relative z-10" style={{ maxWidth: "780px" }}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-5 font-bold uppercase"
            style={{ background: GOLD, color: D, padding: "5px 14px", fontSize: "11px", letterSpacing: "0.14em" }}
          >
            <span className="rounded-full animate-pulse" style={{ width: "6px", height: "6px", background: D, flexShrink: 0 }} />
            Now Recruiting — TSCL 35 2026
          </div>

          <p className="font-semibold uppercase mb-4" style={{ fontSize: "13px", letterSpacing: "0.2em", color: GOLD }}>
            Est. 2014 · Oklahoma City
          </p>

          <h1
            className="font-display font-black uppercase leading-[0.92] text-white mb-6"
            style={{ fontSize: "clamp(56px, 8vw, 108px)", letterSpacing: "-0.01em" }}
          >
            Passionate<br />Cricket.<br />
            <span style={{ color: GOLD, fontStyle: "italic" }}>Serious</span><br />
            Competition.
          </h1>

          <p style={{ fontSize: "17px", color: MUTED, maxWidth: "480px", lineHeight: "1.6", marginBottom: "36px" }}>
            Oklahoma City&apos;s premier cricket club — competing at the highest level since 2014.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/join"
              className="font-bold uppercase transition-opacity hover:opacity-80"
              style={{ background: GOLD, color: D, padding: "14px 32px", fontSize: "13px", letterSpacing: "0.1em" }}
            >
              Join the Club
            </Link>
            <Link
              href="/fixtures"
              className="font-semibold uppercase transition-colors"
              style={{ border: `1px solid ${BORDER}`, color: "#eef0f5", padding: "14px 32px", fontSize: "13px", letterSpacing: "0.1em" }}
            >
              View Fixtures →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4"
        style={{ background: D2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "32px 40px",
              borderRight: i < 3 ? `1px solid ${BORDER}` : "none",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div className="font-display font-black leading-none" style={{ fontSize: "52px", color: GOLD }}>
              {s.value}
            </div>
            <div className="font-semibold uppercase" style={{ fontSize: "12px", letterSpacing: "0.12em", color: MUTED }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── PHOTO TICKER ── */}
      <PhotoStrip urls={imageUrls} />

      {/* ── MATCH SECTION ── */}
      <section style={{ background: D, padding: "80px clamp(24px,4vw,64px)" }}>
        <p className="font-bold uppercase mb-3" style={{ fontSize: "11px", letterSpacing: "0.2em", color: GOLD }}>
          On the Pitch
        </p>
        <h2
          className="font-display font-extrabold uppercase text-white leading-none mb-12"
          style={{ fontSize: "clamp(36px,5vw,64px)" }}
        >
          Latest <span style={{ color: GOLD }}>&amp;</span> Next
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2px" }}>
          {/* Next Match */}
          <div className="relative" style={{ background: D2, padding: "40px" }}>
            <div className="absolute top-0 left-0 right-0" style={{ height: "3px", background: GOLD }} />
            <div className="font-bold uppercase mb-7 flex items-center gap-2" style={{ fontSize: "10px", letterSpacing: "0.18em", color: MUTED }}>
              Next Match — <span style={{ color: GOLD }}>Upcoming</span>
            </div>
            {!nextMatch ? (
              <p style={{ color: MUTED, fontSize: "14px", padding: "16px 0" }}>No upcoming fixtures.</p>
            ) : (
              <>
                <div className="flex items-center mb-7" style={{ gap: "20px" }}>
                  <div style={{ flex: 1 }}>
                    <div className="font-display font-black text-white leading-none" style={{ fontSize: "42px" }}>DC</div>
                    <div style={{ fontSize: "12px", color: MUTED, fontWeight: 500, marginTop: "4px" }}>Dcorp CC</div>
                  </div>
                  <div className="font-display font-bold" style={{ fontSize: "18px", color: BORDER }}>VS</div>
                  <div style={{ flex: 1 }}>
                    <div className="font-display font-black text-white leading-none" style={{ fontSize: "42px" }}>
                      {nextMatch.opponent.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ fontSize: "12px", color: MUTED, fontWeight: 500, marginTop: "4px" }}>{nextMatch.opponent}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { key: "Date", val: `${nextMatch.day}, ${new Date(nextMatch.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long" })}` },
                    { key: "Venue", val: nextMatch.venue },
                    { key: "Location", val: nextMatch.isHome ? "Home" : "Away" },
                  ].map((row) => (
                    <div key={row.key} className="flex justify-between" style={{ fontSize: "13px" }}>
                      <span style={{ color: MUTED, fontWeight: 500 }}>{row.key}</span>
                      <span style={{ color: "#eef0f5", fontWeight: 600 }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/fixtures"
                  className="font-bold uppercase transition-opacity hover:opacity-70"
                  style={{ display: "inline-block", marginTop: "20px", fontSize: "12px", letterSpacing: "0.1em", color: GOLD }}
                >
                  View All Fixtures →
                </Link>
              </>
            )}
          </div>

          {/* Latest Result */}
          <div className="relative" style={{ background: D2, padding: "40px" }}>
            <div
              className="absolute top-0 left-0 right-0"
              style={{ height: "3px", background: latestResult?.result === "won" ? GREEN : latestResult ? "#e74c3c" : BORDER }}
            />
            <div className="font-bold uppercase mb-7 flex items-center gap-2" style={{ fontSize: "10px", letterSpacing: "0.18em", color: MUTED }}>
              Latest Result —{" "}
              <span style={{ color: latestResult?.result === "won" ? GREEN : latestResult?.result === "lost" ? "#e74c3c" : MUTED }}>
                {latestResult?.result === "won" ? "Victory" : latestResult?.result === "lost" ? "Defeat" : "—"}
              </span>
            </div>
            {!latestResult ? (
              <p style={{ color: MUTED, fontSize: "14px", padding: "16px 0" }}>No results yet.</p>
            ) : (
              <>
                <div className="flex items-center mb-7" style={{ gap: "20px" }}>
                  <div style={{ flex: 1 }}>
                    <div className="font-display font-black text-white leading-none" style={{ fontSize: "42px" }}>DC</div>
                    <div style={{ fontSize: "12px", color: MUTED, fontWeight: 500, marginTop: "4px" }}>Dcorp CC</div>
                    <div
                      className="font-display font-bold leading-none"
                      style={{ fontSize: "24px", marginTop: "6px", color: latestResult.result === "won" ? GREEN : "#eef0f5" }}
                    >
                      {latestResult.dcorp_score || "—"}
                    </div>
                  </div>
                  <div className="font-display font-bold" style={{ fontSize: "18px", color: BORDER }}>VS</div>
                  <div style={{ flex: 1, textAlign: "right" }}>
                    <div className="font-display font-black text-white leading-none" style={{ fontSize: "42px" }}>
                      {latestResult.opponent.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ fontSize: "12px", color: MUTED, fontWeight: 500, marginTop: "4px" }}>{latestResult.opponent}</div>
                    <div className="font-display font-bold leading-none" style={{ fontSize: "24px", marginTop: "6px", color: "#eef0f5" }}>
                      {latestResult.opponent_score || "—"}
                    </div>
                  </div>
                </div>
                <div
                  className="inline-block font-bold uppercase"
                  style={{
                    background: latestResult.result === "won" ? `${GREEN}22` : "rgba(255,255,255,0.05)",
                    color: latestResult.result === "won" ? GREEN : MUTED,
                    border: `1px solid ${latestResult.result === "won" ? `${GREEN}44` : BORDER}`,
                    padding: "6px 16px",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    marginBottom: "16px",
                  }}
                >
                  {latestResult.margin}
                </div>
                {latestResult.match_id && (
                  <a
                    href={`https://cricclubs.com/TSCL1/viewScorecard.do?matchId=${latestResult.match_id}&clubId=1097646`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold uppercase transition-opacity hover:opacity-70"
                    style={{ display: "block", fontSize: "12px", letterSpacing: "0.1em", color: GOLD }}
                  >
                    View Scorecard →
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── HONOURS BOARD ── */}
      <section style={{ background: D2, borderTop: `1px solid ${BORDER}`, padding: "80px clamp(24px,4vw,64px)" }}>
        <p className="font-bold uppercase mb-3" style={{ fontSize: "11px", letterSpacing: "0.2em", color: GOLD }}>
          Club History
        </p>
        <h2
          className="font-display font-extrabold uppercase text-white leading-none mb-12"
          style={{ fontSize: "clamp(36px,5vw,64px)" }}
        >
          Honours <span style={{ color: GOLD }}>Board</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2px" }}>
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
            <div key={group.title} style={{ background: D, padding: "36px" }}>
              <div
                className="font-bold uppercase mb-6 pb-4"
                style={{ fontSize: "11px", letterSpacing: "0.16em", color: MUTED, borderBottom: `1px solid ${BORDER}` }}
              >
                {group.title}
              </div>
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4"
                  style={{ padding: "14px 0", borderBottom: i < group.items.length - 1 ? `1px solid ${BORDER}` : "none" }}
                >
                  <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#eef0f5" }}>{item.title}</div>
                    <div style={{ fontSize: "12px", color: GOLD, fontWeight: 600, marginTop: "2px" }}>{item.year}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section style={{ background: D, borderTop: `1px solid ${BORDER}`, padding: "80px clamp(24px,4vw,64px)" }}>
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-bold uppercase mb-2" style={{ fontSize: "11px", letterSpacing: "0.2em", color: GOLD }}>
              Club Media
            </p>
            <h2
              className="font-display font-extrabold uppercase text-white leading-none"
              style={{ fontSize: "clamp(36px,5vw,64px)" }}
            >
              Gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-bold uppercase transition-opacity hover:opacity-70"
            style={{ fontSize: "12px", letterSpacing: "0.1em", color: GOLD }}
          >
            View All →
          </Link>
        </div>

        {previewImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: "2px" }}>
            {previewImages.map((url, i) => (
              <Link
                key={i}
                href="/gallery"
                className="group relative aspect-square overflow-hidden"
                style={{ display: "block" }}
              >
                <Image
                  src={url}
                  alt="Dcorp Cricket Club gallery photo"
                  fill
                  className="object-cover transition-all duration-500"
                  style={{ filter: "brightness(0.75)" }}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                />
                {i === 0 && (
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="font-bold uppercase"
                      style={{ background: GOLD, color: D, fontSize: "11px", letterSpacing: "0.12em", padding: "6px 14px" }}
                    >
                      View Gallery →
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ border: `1px solid ${BORDER}`, padding: "64px", textAlign: "center" }}>
            <p style={{ color: MUTED, fontSize: "14px" }}>No photos yet.</p>
          </div>
        )}
      </section>

      {/* ── JOIN CTA ── */}
      <section
        className="relative text-center overflow-hidden"
        style={{ background: D2, borderTop: `1px solid ${BORDER}`, padding: "100px clamp(24px,4vw,64px)" }}
      >
        {imageUrls[2] && (
          <div className="absolute inset-0">
            <Image src={imageUrls[2]} alt="" fill className="object-cover" style={{ opacity: 0.08 }} sizes="100vw" />
          </div>
        )}
        <div className="relative z-10">
          <p className="font-bold uppercase mb-4" style={{ fontSize: "11px", letterSpacing: "0.2em", color: GOLD }}>
            Now Recruiting
          </p>
          <h2
            className="font-display font-black uppercase text-white leading-[0.95] mb-6"
            style={{ fontSize: "clamp(48px,7vw,96px)" }}
          >
            Ready to<br />Play for <span style={{ color: GOLD }}>Dcorp?</span>
          </h2>
          <p style={{ fontSize: "17px", color: MUTED, maxWidth: "500px", margin: "0 auto 40px", lineHeight: "1.6" }}>
            Whether you&apos;re an experienced cricketer or just starting out, there&apos;s a place for you at Dcorp Cricket Club.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/join"
              className="font-bold uppercase transition-opacity hover:opacity-80"
              style={{ background: GOLD, color: D, padding: "16px 40px", fontSize: "13px", letterSpacing: "0.1em" }}
            >
              Apply to Join Now
            </Link>
            <Link
              href="/players"
              className="font-semibold uppercase transition-colors"
              style={{ border: `1px solid ${BORDER}`, color: "#eef0f5", padding: "16px 40px", fontSize: "13px", letterSpacing: "0.1em" }}
            >
              Meet the Squad →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
