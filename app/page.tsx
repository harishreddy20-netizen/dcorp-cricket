import Link from "next/link";
import Image from "next/image";
import { fixtures, results, news } from "@/lib/data";

const stats = [
  { value: "20+", label: "Squad Members", icon: "👥" },
  { value: "8+",  label: "Seasons Active", icon: "🏆" },
  { value: "75%", label: "Win Rate 2025",  icon: "📈" },
  { value: "3",   label: "League Titles",  icon: "🥇" },
];

export default function HomePage() {
  const nextMatch = fixtures[0];
  const latestResult = results[0];
  const latestNews = news.slice(0, 3);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        {/* Diagonal background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-white" />
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="w-40 h-40 mb-6 drop-shadow-xl">
              <Image
                src="/logo-v2.jpeg"
                alt="Dcorp Cricket Club"
                width={160}
                height={160}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-[#dc2626]" />
              <span className="text-[#dc2626] text-xs font-bold uppercase tracking-widest">
                Est. 2014 · Oklahoma City
              </span>
              <span className="w-8 h-px bg-[#dc2626]" />
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-5">
              Dcorp{" "}
              <span className="text-[#dc2626]">Cricket</span>
              <br />
              Club
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed mb-8">
              Passionate cricket. Serious competition. A community built for players who love the
              game.
            </p>

            {/* Recruiting badge */}
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 text-sm text-[#dc2626] font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
              Now Recruiting — TSCL 35 2026
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/join"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-150 text-sm shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5"
              >
                Join the Club
              </Link>
              <Link
                href="/fixtures"
                className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-8 py-3.5 rounded-xl transition-all duration-150 text-sm hover:bg-gray-50 hover:-translate-y-0.5"
              >
                View Fixtures →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gray-900 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-800">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-6 py-2 first:pl-0 last:pr-0">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-3xl font-extrabold text-white tracking-tight">{s.value}</div>
                <div className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next Match + Latest Result ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">On The Pitch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Next Match */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="bg-gray-900 px-5 py-3 flex items-center justify-between">
              <span className="text-white text-xs font-bold uppercase tracking-widest">Next Match</span>
              <span className="text-xs bg-[#dc2626]/20 text-[#dc2626] px-2.5 py-1 rounded-full font-medium border border-[#dc2626]/30">
                {nextMatch.isHome ? "Home" : "Away"}
              </span>
            </div>
            <div className="p-6">
              {(() => {
                const homeTeam = nextMatch.isHome ? "Dcorp CC" : nextMatch.opponent;
                const awayTeam = nextMatch.isHome ? nextMatch.opponent : "Dcorp CC";
                const homeInitials = nextMatch.isHome ? "DC" : nextMatch.opponent.slice(0, 2).toUpperCase();
                const awayInitials = nextMatch.isHome ? nextMatch.opponent.slice(0, 2).toUpperCase() : "DC";
                return (
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="text-center flex-1">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-base mx-auto mb-2 ${nextMatch.isHome ? "bg-[#dc2626] text-white" : "bg-gray-100 text-gray-600"}`}>
                        {homeInitials}
                      </div>
                      <p className="text-gray-900 font-semibold text-sm">{homeTeam}</p>
                      <p className="text-gray-400 text-xs mt-0.5">Home</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-50 rounded-xl px-3 py-2">
                        <p className="text-[#dc2626] font-extrabold text-lg tracking-widest">VS</p>
                      </div>
                    </div>
                    <div className="text-center flex-1">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-base mx-auto mb-2 ${!nextMatch.isHome ? "bg-[#dc2626] text-white" : "bg-gray-100 text-gray-600"}`}>
                        {awayInitials}
                      </div>
                      <p className="text-gray-900 font-semibold text-sm">{awayTeam}</p>
                      <p className="text-gray-400 text-xs mt-0.5">Away</p>
                    </div>
                  </div>
                );
              })()}
              <div className="bg-gray-50 rounded-xl px-4 py-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="text-gray-900 font-medium">
                    {nextMatch.day}, {new Date(nextMatch.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
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
              <span className="text-white text-xs font-bold uppercase tracking-widest">Latest Result</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${latestResult.result === "won" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>
                {latestResult.result === "won" ? "Victory" : "Defeat"}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-[#dc2626] flex items-center justify-center font-bold text-white text-base mx-auto mb-2">DC</div>
                  <p className="text-gray-900 font-semibold text-sm">Dcorp CC</p>
                  <p className="text-[#dc2626] font-extrabold text-xl mt-1">{latestResult.dcorpScore}</p>
                </div>
                <div className="text-center">
                  <div className={`text-xs font-bold px-3 py-1.5 rounded-xl ${latestResult.result === "won" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {latestResult.result === "won" ? "WON" : "LOST"}
                  </div>
                </div>
                <div className="text-center flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-base mx-auto mb-2">
                    {latestResult.opponent.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-gray-900 font-semibold text-sm">{latestResult.opponent}</p>
                  <p className="text-gray-400 font-extrabold text-xl mt-1">{latestResult.opponentScore}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Result</span>
                  <span className="text-gray-900 font-medium">{latestResult.margin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Latest News</h2>
            </div>
            <Link href="/news" className="text-[#dc2626] text-sm font-semibold hover:text-[#b91c1c] transition-colors flex items-center gap-1">
              All news <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestNews.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div className="h-1 bg-[#dc2626]" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-red-50 text-[#dc2626] border border-red-100 px-2.5 py-1 rounded-full font-semibold">
                      {item.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-sm leading-snug mb-2 flex-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[#dc2626] opacity-10" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-3">Now Recruiting</p>
          <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Ready to Play for Dcorp?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re an experienced cricketer or just starting out, there&apos;s a place
            for you at Dcorp Cricket Club.
          </p>
          <Link
            href="/join"
            className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-10 py-4 rounded-xl transition-all duration-150 text-sm shadow-lg shadow-red-900/30 hover:-translate-y-0.5"
          >
            Apply to Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
