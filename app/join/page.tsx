import type { Metadata } from "next";
import JoinForm from "./JoinForm";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Apply to join Dcorp Cricket Club and become part of our cricketing community.",
};

const perks = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Competitive Cricket",
    desc: "Play in local and regional leagues against strong opposition.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Player Development",
    desc: "Access to specialist batting, bowling, and fielding coaches.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Great Community",
    desc: "A welcoming, inclusive team that supports all skill levels.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Excellent Facilities",
    desc: "Home ground with full facilities in Oklahoma City.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Regular Training",
    desc: "Structured sessions every Tuesday and Thursday evening.",
  },
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
                <h2 className="font-display text-white font-bold text-xl tracking-tight">Why Join Us?</h2>
              </div>
              <ul className="divide-y divide-gray-50">
                {perks.map((perk) => (
                  <li key={perk.title} className="flex gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-default">
                    <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {perk.icon}
                    </div>
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
