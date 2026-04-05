import type { Metadata } from "next";
import { players } from "@/lib/data";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Players",
  description: "Meet the Dcorp Cricket Club squad — TSCL 35 2026 registered players.",
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("");
}

const gradients = [
  "from-red-500 to-red-800",
  "from-rose-500 to-red-700",
  "from-red-600 to-rose-900",
  "from-red-700 to-red-900",
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
        {/* Count pill */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Registered Players</h2>
          <span className="ml-auto text-xs bg-red-50 text-[#dc2626] border border-red-200 px-3 py-1.5 rounded-full font-semibold">
            {players.length} players
          </span>
        </div>

        {/* Player Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map((player, i) => (
            <div
              key={player.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Card header gradient */}
              <div className={`bg-gradient-to-r ${gradients[i % gradients.length]} px-5 py-4 flex items-center justify-between`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-extrabold text-lg">
                  {initials(player.name)}
                </div>
                {player.jersey > 0 ? (
                  <div className="text-right">
                    <p className="text-white/60 text-[10px] uppercase tracking-widest">Jersey</p>
                    <p className="text-white font-extrabold text-2xl leading-none">{player.jersey}</p>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white/40 text-xs">—</span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="px-5 py-4">
                <p className="text-gray-900 font-semibold text-sm leading-tight">{player.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400 text-xs">TSCL 35 2026 · Dcorp</span>
                  <span className="text-gray-300 text-[10px] font-mono">#{player.ccPlayerId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="mt-14 bg-gray-900 rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626]" />
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-2">Open Trials</p>
          <h2 className="text-white text-2xl font-extrabold mb-3 tracking-tight">Want to Join the Squad?</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            We&apos;re always looking for talented players. If you have the passion and skill, we
            want to hear from you.
          </p>
          <a
            href="/join"
            className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-150 text-sm shadow-lg shadow-red-900/30 hover:-translate-y-0.5"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
