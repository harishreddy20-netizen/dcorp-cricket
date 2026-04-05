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
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Fixtures &amp; Results</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Keep up with all upcoming matches and recent results.
        </p>
      </div>

      {/* Upcoming Fixtures */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full inline-block" />
          2026 Fixtures
        </h2>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[90px_1fr_60px_1fr_120px] gap-4 px-5 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <span>Date</span>
          <span>Home</span>
          <span />
          <span>Away</span>
          <span className="text-right">Ground</span>
        </div>

        <div className="space-y-3">
          {fixtures.map((match) => {
            const home = match.isHome ? "D CORP" : match.opponent;
            const away = match.isHome ? match.opponent : "D CORP";
            const dcorpIsHome = match.isHome;

            return (
              <div
                key={match.id}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-red-200 hover:shadow-sm transition-all"
              >
                {/* Mobile layout */}
                <div className="sm:hidden flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">
                      {match.day},{" "}
                      {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="text-gray-400 text-xs">{match.venue}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-sm ${dcorpIsHome ? "text-[#dc2626]" : "text-gray-900"}`}>
                      {home}
                    </span>
                    <span className="text-gray-400 text-xs font-bold">vs</span>
                    <span className={`font-bold text-sm ${!dcorpIsHome ? "text-[#dc2626]" : "text-gray-900"}`}>
                      {away}
                    </span>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:grid grid-cols-[90px_1fr_60px_1fr_120px] gap-4 items-center">
                  <div>
                    <p className="text-gray-900 text-sm font-medium">
                      {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                    <p className="text-gray-400 text-xs">{match.day}</p>
                  </div>
                  <span className={`font-semibold text-sm ${dcorpIsHome ? "text-[#dc2626]" : "text-gray-900"}`}>
                    {home}
                  </span>
                  <span className="text-gray-400 text-xs font-bold text-center">vs</span>
                  <span className={`font-semibold text-sm ${!dcorpIsHome ? "text-[#dc2626]" : "text-gray-900"}`}>
                    {away}
                  </span>
                  <span className="text-gray-400 text-xs text-right">{match.venue}</span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-gray-400 text-xs">
          <span className="text-[#dc2626]">Red</span> = D Corp team (home or away)
        </p>
      </section>

      {/* Results */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full inline-block" />
          Recent Results
        </h2>
        <div className="space-y-4">
          {results.map((match) => (
            <div
              key={match.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Teams + Scores */}
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-1 min-w-[80px]">
                    <div className="w-10 h-10 rounded-full bg-[#dc2626] flex items-center justify-center text-white text-xs font-bold">
                      DC
                    </div>
                    <span className="text-gray-900 text-xs font-medium">Dcorp CC</span>
                    <span className="text-[#dc2626] font-bold text-sm">{match.dcorpScore}</span>
                  </div>
                  <div className="text-center">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                        match.result === "won"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {match.result === "won" ? "WON" : "LOST"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[80px]">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
                      {match.opponent.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-gray-900 text-xs font-medium">{match.opponent}</span>
                    <span className="text-gray-500 font-bold text-sm">{match.opponentScore}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1.5 text-sm text-gray-500 sm:text-right">
                  <div className="flex sm:justify-end gap-2 items-center">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                      {match.type}
                    </span>
                    <span>
                      {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">MOTM: {match.motm}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
