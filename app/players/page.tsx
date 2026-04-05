import type { Metadata } from "next";
import { players } from "@/lib/data";

export const metadata: Metadata = {
  title: "Players",
  description: "Meet the Dcorp Cricket Club squad — TSCL 35 2026 registered players.",
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

export default function PlayersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Our Squad</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          TSCL 35 2026 — Dcorp registered players.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <span className="text-xs bg-red-50 text-[#dc2626] border border-red-200 px-3 py-1.5 rounded-full font-medium">
          {players.length} players registered
        </span>
      </div>

      {/* Player Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-200 hover:shadow-sm transition-all flex items-center gap-4"
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {initials(player.name)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-gray-900 font-semibold text-sm leading-tight truncate">
                {player.name}
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                TSCL 35 2026 · Dcorp
              </p>
            </div>

            {/* Jersey / ID */}
            <div className="flex-shrink-0 text-right">
              {player.jersey > 0 ? (
                <div className="w-10 h-10 rounded-full bg-[#dc2626] flex items-center justify-center text-white font-bold text-sm">
                  {player.jersey}
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-medium">
                  —
                </div>
              )}
              <p className="text-gray-300 text-[10px] mt-1 text-center">jersey</p>
            </div>
          </div>
        ))}
      </div>

      {/* Join CTA */}
      <div className="mt-16 text-center bg-white border border-red-100 rounded-2xl p-10 shadow-sm">
        <h2 className="text-gray-900 text-2xl font-bold mb-3">Want to Join the Squad?</h2>
        <p className="text-gray-500 mb-6 max-w-lg mx-auto">
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
