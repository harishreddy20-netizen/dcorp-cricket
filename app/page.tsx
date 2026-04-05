import Link from "next/link";
import { fixtures, results, news } from "@/lib/data";

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-[#dc2626]">{value}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const nextMatch = fixtures[0];
  const latestResult = results[0];
  const latestNews = news.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f0f0f]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[#dc2626]/10 border border-[#dc2626]/30 rounded-full px-4 py-1.5 text-sm text-[#dc2626] font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
            Now Recruiting — Season 2026
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Dcorp{" "}
            <span className="text-[#dc2626]">Cricket</span>{" "}
            Club
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Passionate cricket. Serious competition. A community built for
            players who love the game. Join us and make your mark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm"
            >
              Join the Club
            </Link>
            <Link
              href="/fixtures"
              className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm hover:bg-white/5"
            >
              View Fixtures
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1a1a1a] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <StatCard value="20+" label="Squad Members" />
            <StatCard value="8+" label="Seasons Active" />
            <StatCard value="75%" label="Win Rate 2025" />
            <StatCard value="3" label="League Titles" />
          </div>
        </div>
      </section>

      {/* Next Match + Latest Result */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Next Match */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">Next Match</h2>
              <span className="text-xs bg-[#dc2626]/20 text-[#dc2626] px-2.5 py-1 rounded-full font-medium">
                {nextMatch.type}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-center flex-1">
                <div className="w-14 h-14 rounded-full bg-[#dc2626] flex items-center justify-center font-bold text-white text-sm mx-auto mb-2">
                  DC
                </div>
                <p className="text-white font-semibold text-sm">Dcorp CC</p>
              </div>
              <div className="text-center">
                <p className="text-[#dc2626] font-bold text-xl">VS</p>
              </div>
              <div className="text-center flex-1">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm mx-auto mb-2">
                  {nextMatch.opponent.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-white font-semibold text-sm">{nextMatch.opponent}</p>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-white/10 space-y-1.5 text-sm text-gray-400">
              <p>
                <span className="text-gray-500">Date:</span>{" "}
                {new Date(nextMatch.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="text-gray-500">Time:</span> {nextMatch.time}
              </p>
              <p>
                <span className="text-gray-500">Venue:</span> {nextMatch.venue}
              </p>
            </div>
          </div>

          {/* Latest Result */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">Latest Result</h2>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  latestResult.result === "won"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {latestResult.result === "won" ? "Victory" : "Defeat"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-center flex-1">
                <div className="w-14 h-14 rounded-full bg-[#dc2626] flex items-center justify-center font-bold text-white text-sm mx-auto mb-2">
                  DC
                </div>
                <p className="text-white font-semibold text-sm">Dcorp CC</p>
                <p className="text-[#dc2626] font-bold text-lg mt-1">{latestResult.dcorpScore}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 font-bold text-xl">VS</p>
              </div>
              <div className="text-center flex-1">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm mx-auto mb-2">
                  {latestResult.opponent.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-white font-semibold text-sm">{latestResult.opponent}</p>
                <p className="text-gray-400 font-bold text-lg mt-1">{latestResult.opponentScore}</p>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-white/10 text-sm text-gray-400">
              <p>
                <span className="text-gray-500">MOTM:</span> {latestResult.motm}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-2xl font-bold">Latest News</h2>
          <Link
            href="/news"
            className="text-[#dc2626] text-sm font-medium hover:text-[#b91c1c] transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <article
              key={item.id}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 hover:border-[#dc2626]/40 transition-colors"
            >
              <span className="text-xs bg-[#dc2626]/20 text-[#dc2626] px-2.5 py-1 rounded-full font-medium">
                {item.category}
              </span>
              <h3 className="text-white font-semibold text-base mt-3 mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
              <p className="text-gray-600 text-xs mt-4">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#dc2626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Play for Dcorp?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Whether you&apos;re an experienced cricketer or just starting out,
            there&apos;s a place for you at Dcorp Cricket Club.
          </p>
          <Link
            href="/join"
            className="bg-white text-[#dc2626] font-bold px-8 py-3.5 rounded-lg hover:bg-red-50 transition-colors text-sm inline-block"
          >
            Apply to Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
