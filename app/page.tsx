import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { fixtures } from "@/lib/data";
import PhotoStrip from "@/components/PhotoStrip";

const BUCKET = "Dcorp-cricket";

const stats = [
  {
    value: "20+",
    label: "Squad Members",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: "10+",
    label: "Seasons Active",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    value: "75%",
    label: "Win Rate 2025",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    value: "2",
    label: "League Titles",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
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

  const nextMatch = fixtures[0];
  const latestResult = results?.[0] ?? null;

  const imageUrls =
    files
      ?.filter((f) => f.name !== ".emptyFolderPlaceholder" && /\.(jpe?g|png|webp|gif|avif)$/i.test(f.name))
      .map((f) => supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl) ?? [];

  const heroImages = imageUrls.slice(0, 4);
  const previewImages = imageUrls.slice(0, 6);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gray-900 min-h-[80vh] flex items-center">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-800" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#dc2626] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#dc2626] opacity-5 blur-3xl" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 mb-7 drop-shadow-2xl">
                <Image
                  src="/logo-v3.png"
                  alt="Dcorp Cricket Club"
                  width={112}
                  height={112}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-[#dc2626]" />
                <span className="text-[#dc2626] text-xs font-bold uppercase tracking-widest">
                  Est. 2014 · Oklahoma City
                </span>
                <span className="w-8 h-px bg-[#dc2626]" />
              </div>

              <h1 className="font-display text-6xl sm:text-7xl font-bold text-white tracking-tight leading-none mb-5">
                Dcorp{" "}
                <span className="text-[#dc2626]">Cricket</span>
                <br />
                Club
              </h1>

              <p className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed mb-7">
                Passionate cricket. Serious competition. A community built for players who love the game.
              </p>

              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300 font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
                Now Recruiting — TSCL 35 2026
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/join"
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-red-900/40 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  Join the Club
                </Link>
                <Link
                  href="/fixtures"
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm hover:-translate-y-0.5 cursor-pointer"
                >
                  View Fixtures →
                </Link>
              </div>
            </div>

            {/* Right: Photo mosaic */}
            {heroImages.length >= 2 && (
              <div className="hidden lg:grid grid-cols-2 gap-3 h-[420px]">
                {heroImages.slice(0, 2).map((url, i) => (
                  <div
                    key={i}
                    className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${i === 0 ? "row-span-2" : ""}`}
                    style={{ transform: i % 2 === 1 ? "translateY(20px)" : undefined }}
                  >
                    <Image src={url} alt="Dcorp Cricket Club match photo" fill className="object-cover" sizes="300px" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                  </div>
                ))}
                {heroImages.slice(2, 4).map((url, i) => (
                  <div
                    key={i + 2}
                    className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                    style={{ transform: i % 2 === 0 ? "translateY(-10px)" : "translateY(10px)" }}
                  >
                    <Image src={url} alt="Dcorp Cricket Club match photo" fill className="object-cover" sizes="300px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8fafc] to-transparent" />
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center px-6 py-8 gap-2">
                <div className="text-[#dc2626] mb-1">{s.icon}</div>
                <div className="font-display text-4xl font-bold text-gray-900 tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-wider font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Strip ── */}
      <PhotoStrip urls={imageUrls} />

      {/* ── Next Match + Latest Result ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          <h2 className="font-display text-2xl font-bold text-gray-900 tracking-tight">On The Pitch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Next Match */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="bg-gray-900 px-5 py-3 flex items-center justify-between">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Next Match</span>
              <span className="text-[#dc2626] text-xs font-bold uppercase tracking-widest">Upcoming</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col items-center flex-1 gap-1.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#dc2626] flex items-center justify-center text-white text-sm font-bold shadow-md shadow-red-200">
                    DC
                  </div>
                  <p className="text-gray-900 font-semibold text-sm">Dcorp CC</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-gray-300 font-bold text-lg">vs</span>
                  <span className="text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                    {nextMatch.isHome ? "Home" : "Away"}
                  </span>
                </div>
                <div className="flex flex-col items-center flex-1 gap-1.5">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-bold">
                    {nextMatch.opponent.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-gray-900 font-semibold text-sm">{nextMatch.opponent}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="text-gray-900 font-medium">
                    {nextMatch.day},{" "}
                    {new Date(nextMatch.date + "T00:00:00").toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Venue</span>
                  <span className="text-gray-900 font-medium">{nextMatch.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Result */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="bg-gray-900 px-5 py-3 flex items-center justify-between">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Latest Result</span>
              {latestResult && (
                <span className={`text-xs font-bold uppercase tracking-widest ${latestResult.result === "won" ? "text-green-400" : "text-red-400"}`}>
                  {latestResult.result === "won" ? "Victory" : "Defeat"}
                </span>
              )}
            </div>
            <div className="p-5">
              {!latestResult ? (
                <p className="text-gray-400 text-sm text-center py-4">No results yet.</p>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col items-center flex-1 gap-1.5">
                      <div className="w-14 h-14 rounded-2xl bg-[#dc2626] flex items-center justify-center text-white text-sm font-bold shadow-md shadow-red-200">
                        DC
                      </div>
                      <p className="text-gray-900 font-semibold text-sm">Dcorp CC</p>
                      <p className="text-[#dc2626] font-bold text-lg leading-none">{latestResult.dcorp_score}</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${latestResult.result === "won" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                        {latestResult.result === "won" ? "WON" : "LOST"}
                      </div>
                    </div>
                    <div className="flex flex-col items-center flex-1 gap-1.5">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm">
                        {latestResult.opponent.slice(0, 2).toUpperCase()}
                      </div>
                      <p className="text-gray-900 font-semibold text-sm">{latestResult.opponent}</p>
                      <p className="text-gray-400 font-bold text-lg leading-none">{latestResult.opponent_score}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Result</span>
                      <span className="text-gray-900 font-medium">{latestResult.margin}</span>
                    </div>
                    {latestResult.match_id && (
                      <div className="flex justify-end">
                        <a
                          href={`https://cricclubs.com/TSCL1/viewScorecard.do?matchId=${latestResult.match_id}&clubId=1097646`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#dc2626] hover:underline font-semibold text-xs"
                        >
                          View Scorecard
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06l5.69-5.69H6.75a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-5.69 5.69a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Honours Board ── */}
      <section className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">Honours Board</h2>
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-xs font-bold text-[#dc2626] uppercase tracking-widest mb-4">League Trophies</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { year: "2018", title: "35-over Winners", icon: "🏆", highlight: true },
                  { year: "2024", title: "T20 Winners", icon: "🏆", highlight: true },
                  { year: "2017", title: "T20 Runner-up", icon: "🥈", highlight: false },
                  { year: "2018", title: "T20 Runner-up", icon: "🥈", highlight: false },
                  { year: "2017", title: "35-over Semi-Finals", icon: "🏅", highlight: false },
                  { year: "2024", title: "35-over Runner-up", icon: "🥈", highlight: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl border ${item.highlight ? "bg-[#dc2626]/10 border-[#dc2626]/30" : "bg-white/5 border-white/10"}`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className={`font-bold text-sm ${item.highlight ? "text-white" : "text-gray-300"}`}>{item.title}</p>
                      <p className="text-gray-500 text-xs">{item.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#dc2626] uppercase tracking-widest mb-4">Club Records</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { label: "Playoff appearances", value: "Every season 2017–2026" },
                  { label: "Best final chase", value: "2024 T20 — Won by 10 Wickets" },
                  { label: "Back-to-back T20 hundreds", value: "2024 Semis & Final — Rohit" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                    <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#dc2626] uppercase tracking-widest mb-4">Individual Awards</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { year: "2017", award: "Best Wicket Keeper T20", player: "Bhargav Meda" },
                  { year: "2021", award: "Best Bowler T20", player: "Aditya Teekayagari" },
                  { year: "2025", award: "Best Bowler T20", player: "Vivek Terapalli" },
                  { year: "2025", award: "Best Wicket Keeper", player: "Jayadeep Reddy" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                    <p className="text-[#dc2626] text-xs font-bold mb-1">{item.year}</p>
                    <p className="text-white font-semibold text-sm leading-snug">{item.award}</p>
                    <p className="text-gray-400 text-xs mt-1">{item.player}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
              <h2 className="font-display text-2xl font-bold text-gray-900 tracking-tight">Gallery</h2>
            </div>
            <Link
              href="/gallery"
              className="text-[#dc2626] text-sm font-semibold hover:text-[#b91c1c] transition-colors flex items-center gap-1 cursor-pointer"
            >
              View all →
            </Link>
          </div>

          {previewImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {previewImages.map((url, i) => (
                <Link
                  key={i}
                  href="/gallery"
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <Image
                    src={url}
                    alt="Dcorp Cricket Club gallery photo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-colors duration-200" />
                  {i === 0 && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                        View Gallery →
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-12 text-center">
              <p className="text-gray-400 text-sm">No photos yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#dc2626] opacity-10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-4">Now Recruiting</p>
          <h2 className="font-display text-white text-4xl sm:text-6xl font-bold tracking-tight mb-4 leading-tight">
            Ready to Play for Dcorp?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re an experienced cricketer or just starting out, there&apos;s a place
            for you at Dcorp Cricket Club.
          </p>
          <Link
            href="/join"
            className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-red-900/40 hover:-translate-y-0.5 cursor-pointer"
          >
            Apply to Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
