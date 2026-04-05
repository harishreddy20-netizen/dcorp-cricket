import type { Metadata } from "next";
import { fixtures, results } from "@/lib/data";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Fixtures & Results",
  description: "Upcoming fixtures and past match results for Dcorp Cricket Club.",
};

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

export default function FixturesPage() {
  const grouped = groupByMonth(fixtures);

  return (
    <div>
      <PageBanner
        eyebrow="Season 2026"
        title="Fixtures & Results"
        subtitle="Full schedule and recent match results for TSCL 35 2026."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Fixtures */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">2026 Fixtures</h2>
          </div>

          <div className="space-y-8">
            {Object.entries(grouped).map(([month, matches]) => (
              <div key={month}>
                {/* Month header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-[#dc2626] uppercase tracking-widest">{month}</span>
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400">{matches.length} match{matches.length > 1 ? "es" : ""}</span>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  {/* Desktop header */}
                  <div className="hidden sm:grid grid-cols-[100px_1fr_80px_1fr_130px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span>Date</span>
                    <span>Home</span>
                    <span className="text-center">vs</span>
                    <span>Away</span>
                    <span className="text-right">Ground</span>
                  </div>

                  {matches.map((match, idx) => {
                    const home = match.isHome ? "D CORP" : match.opponent;
                    const away = match.isHome ? match.opponent : "D CORP";
                    return (
                      <div
                        key={match.id}
                        className={`px-5 py-4 hover:bg-red-50/50 transition-colors duration-150 ${idx < matches.length - 1 ? "border-b border-gray-50" : ""}`}
                      >
                        {/* Mobile */}
                        <div className="sm:hidden">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-gray-500 text-xs font-medium">
                              {match.day}, {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </span>
                            <span className="text-gray-400 text-xs">{match.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-sm ${match.isHome ? "text-[#dc2626]" : "text-gray-800"}`}>{home}</span>
                            <span className="text-gray-300 text-xs font-bold">vs</span>
                            <span className={`font-bold text-sm ${!match.isHome ? "text-[#dc2626]" : "text-gray-800"}`}>{away}</span>
                          </div>
                        </div>

                        {/* Desktop */}
                        <div className="hidden sm:grid grid-cols-[100px_1fr_80px_1fr_130px] gap-4 items-center">
                          <div>
                            <p className="text-gray-900 text-sm font-semibold">
                              {new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </p>
                            <p className="text-gray-400 text-xs">{match.day}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {match.isHome && <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] flex-shrink-0" />}
                            <span className={`font-semibold text-sm ${match.isHome ? "text-[#dc2626]" : "text-gray-800"}`}>{home}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-300 text-xs font-bold bg-gray-50 px-2 py-1 rounded-lg">vs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {!match.isHome && <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] flex-shrink-0" />}
                            <span className={`font-semibold text-sm ${!match.isHome ? "text-[#dc2626]" : "text-gray-800"}`}>{away}</span>
                          </div>
                          <span className="text-gray-400 text-xs text-right">{match.venue}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-gray-400 text-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] inline-block" />
            Red = D Corp (home or away)
          </p>
        </section>

        {/* Results */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recent Results</h2>
          </div>

          <div className="space-y-4">
            {results.map((match) => (
              <div
                key={match.id}
                className={`bg-white border rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${match.result === "won" ? "border-green-100" : "border-red-100"}`}
              >
                <div className={`h-1 ${match.result === "won" ? "bg-green-400" : "bg-red-400"}`} />
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Teams + Scores */}
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col items-center gap-1 min-w-[80px]">
                        <div className="w-11 h-11 rounded-xl bg-[#dc2626] flex items-center justify-center text-white text-xs font-bold">DC</div>
                        <span className="text-gray-900 text-xs font-semibold">Dcorp CC</span>
                        <span className="text-[#dc2626] font-extrabold text-base">{match.dcorpScore}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border tracking-wide ${match.result === "won" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                          {match.result === "won" ? "WON" : "LOST"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1 min-w-[80px]">
                        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold">
                          {match.opponent.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-gray-900 text-xs font-semibold">{match.opponent}</span>
                        <span className="text-gray-400 font-extrabold text-base">{match.opponentScore}</span>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500 space-y-1.5 sm:text-right sm:min-w-[180px]">
                      <div className="flex sm:justify-end items-center gap-2">
                        <span className="bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{match.type}</span>
                        <span>{new Date(match.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <p className="text-gray-400">{match.margin}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
