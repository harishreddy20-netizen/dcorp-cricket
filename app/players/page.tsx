import type { Metadata } from "next";
import { players } from "@/lib/data";

export const metadata: Metadata = {
  title: "Players",
  description: "Meet the Dcorp Cricket Club squad — player profiles and statistics.",
};

export default function PlayersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">Our Squad</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Meet the talented players who represent Dcorp Cricket Club on the field.
        </p>
      </div>

      {/* Player Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 hover:border-[#dc2626]/40 transition-colors"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">{player.name}</h2>
                <span className="text-[#dc2626] text-sm font-medium">{player.role}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{player.bio}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              <div className="text-center">
                <p className="text-white font-bold text-lg">{player.matches}</p>
                <p className="text-gray-500 text-xs mt-0.5">Matches</p>
              </div>
              {"runs" in player ? (
                <>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{player.runs}</p>
                    <p className="text-gray-500 text-xs mt-0.5">Runs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">
                      {"average" in player ? player.average : ("dismissals" in player ? player.dismissals : "—")}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {"average" in player ? "Average" : "Dismissals"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{("wickets" in player) ? player.wickets : "—"}</p>
                    <p className="text-gray-500 text-xs mt-0.5">Wickets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{("economy" in player) ? player.economy : "—"}</p>
                    <p className="text-gray-500 text-xs mt-0.5">Economy</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Join CTA */}
      <div className="mt-16 text-center bg-[#1a1a1a] border border-[#dc2626]/30 rounded-2xl p-10">
        <h2 className="text-white text-2xl font-bold mb-3">Want to Join the Squad?</h2>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          We&apos;re always looking for talented players. If you have the passion and skill, we want
          to hear from you.
        </p>
        <a
          href="/join"
          className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm inline-block"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
