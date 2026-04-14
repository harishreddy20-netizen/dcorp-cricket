import type { Metadata } from "next";
import { players } from "@/lib/data";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Players",
  description: "Meet the Dcorp Cricket Club squad — TSCL 35 2026 registered players.",
  alternates: { canonical: "https://dcorpcc.com/players" },
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("");
}

const gradients = [
  "from-red-600 to-red-900",
  "from-rose-500 to-red-800",
  "from-red-700 to-rose-900",
  "from-red-500 to-red-800",
];

export default function PlayersPage() {
  return (
    <div>
      <PageBanner
        eyebrow="TSCL 35 2026"
        title="Our Squad"
        subtitle="Meet the 21 players representing Dcorp Cricket Club this season."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          <h2 className="font-display text-2xl font-bold text-gray-900 tracking-tight">Registered Players</h2>
          <span className="ml-auto text-xs bg-red-50 text-[#dc2626] border border-red-200 px-3 py-1.5 rounded-full font-semibold">
            {players.length} players
          </span>
        </div>

        {/* Player Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...players].sort((a, b) => a.name.localeCompare(b.name)).map((player, i) => (
            <a
              key={player.id}
              href={`https://cricclubs.com/TSCL1/viewPlayer.do?playerId=${player.ccPlayerId}&clubId=1097646`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
            >
              {/* Card header */}
              <div className={`bg-gradient-to-br ${gradients[i % gradients.length]} px-4 py-5 flex flex-col items-center gap-3`}>
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-display font-bold text-xl">
                  {initials(player.name)}
                </div>
                {player.jersey > 0 ? (
                  <div className="text-center">
                    <p className="text-white/60 text-[10px] uppercase tracking-widest leading-none mb-0.5">Jersey</p>
                    <p className="font-display text-white font-bold text-3xl leading-none">{player.jersey}</p>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white/40 text-xs">—</span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="px-4 py-3">
                <p className="text-gray-900 font-semibold text-sm leading-tight text-center">{player.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <p className="text-gray-400 text-[10px] font-mono">#{player.ccPlayerId}</p>
                  <svg className="w-3 h-3 text-gray-300 group-hover:text-[#dc2626] transition-colors duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Join CTA */}
        <div className="mt-14 bg-gray-900 rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626]" />
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#dc2626] opacity-10 blur-3xl" />
          <div className="relative">
            <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-2">Open Trials</p>
            <h2 className="font-display text-white text-3xl font-bold mb-3 tracking-tight">Want to Join the Squad?</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
              We&apos;re always looking for talented players. If you have the passion and skill, we
              want to hear from you.
            </p>
            <a
              href="/join"
              className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-red-900/30 hover:-translate-y-0.5 cursor-pointer"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
