import type { Metadata } from "next";
import JoinForm from "./JoinForm";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Apply to join Dcorp Cricket Club and become part of our cricketing community.",
};

const perks = [
  { icon: "🏏", title: "Competitive Cricket",   desc: "Play in local and regional leagues against strong opposition." },
  { icon: "📈", title: "Player Development",     desc: "Access to specialist batting, bowling, and fielding coaches." },
  { icon: "🤝", title: "Great Community",        desc: "A welcoming, inclusive team that supports all skill levels." },
  { icon: "🏟️", title: "Excellent Facilities",  desc: "Home ground with full facilities in Oklahoma City." },
  { icon: "📅", title: "Regular Training",       desc: "Structured sessions every Tuesday and Thursday evening." },
];

export default function JoinPage() {
  return (
    <div>
      <PageBanner
        eyebrow="Now Recruiting"
        title="Join Dcorp CC"
        subtitle="Passionate about cricket? There's a place for you in our squad."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form — wider */}
          <div className="lg:col-span-3">
            <JoinForm />
          </div>

          {/* Why join */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gray-900 px-6 py-4">
                <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-1">Dcorp CC</p>
                <h2 className="text-white font-extrabold text-lg tracking-tight">Why Join Us?</h2>
              </div>
              <ul className="divide-y divide-gray-50">
                {perks.map((perk) => (
                  <li key={perk.title} className="flex gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                    <span className="text-xl flex-shrink-0 mt-0.5">{perk.icon}</span>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">{perk.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{perk.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <p className="text-[#dc2626] font-bold text-sm mb-1">Questions?</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Reach us at{" "}
                <span className="font-semibold text-gray-900">info@dcorpcc.club</span> or come to
                training on Tuesday or Thursday at 6:30 PM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
