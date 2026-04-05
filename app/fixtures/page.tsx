import type { Metadata } from "next";
import { fixtures, results } from "@/lib/data";

export const metadata: Metadata = {
  title: "Fixtures & Results",
  description: "Upcoming fixtures and past match results for Dcorp Cricket Club.",
};

export default function FixturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">Fixtures &amp; Results</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Keep up with all upcoming matches and recent results.
        </p>
      </div>

      {/* Upcoming Fixtures */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full inline-block" />
          Upcoming Fixtures
        </h2>
        <div className="space-y-4">
          {fixtures.map((match) => (
            <div
              key={match.id}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 hover:border-[#dc2626]/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Teams */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#dc2626] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      DC
                    </div>
                    <span className="text-white font-semibold">Dcorp CC</span>
                  </div>
                  <span className="text-[#dc2626] font-bold">VS</span>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {match.opponent.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-white font-semibold">{match.opponent}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span className="bg-[#dc2626]/15 text-[#dc2626] text-xs px-2.5 py-1 rounded-full font-medium">
                    {match.type}
                  </span>
                  <span>
                    {new Date(match.date).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span>{match.time}</span>
                  <span className="text-gray-500">{match.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full inline-block" />
          Recent Results
        </h2>
        <div className="space-y-4">
          {results.map((match) => (
            <div
              key={match.id}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Teams + Scores */}
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-1 min-w-[80px]">
                    <div className="w-10 h-10 rounded-full bg-[#dc2626] flex items-center justify-center text-white text-xs font-bold">
                      DC
                    </div>
                    <span className="text-white text-xs font-medium">Dcorp CC</span>
                    <span className="text-[#dc2626] font-bold text-sm">{match.dcorpScore}</span>
                  </div>
                  <div className="text-center">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        match.result === "won"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {match.result === "won" ? "WON" : "LOST"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[80px]">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                      {match.opponent.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-white text-xs font-medium">{match.opponent}</span>
                    <span className="text-gray-400 font-bold text-sm">{match.opponentScore}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1.5 text-sm text-gray-400 sm:text-right">
                  <div className="flex sm:justify-end gap-2 items-center">
                    <span className="bg-white/10 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                      {match.type}
                    </span>
                    <span>
                      {new Date(match.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">MOTM: {match.motm}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
