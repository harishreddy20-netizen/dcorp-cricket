import type { Metadata } from "next";
import JoinForm from "./JoinForm";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Apply to join Dcorp Cricket Club and become part of our cricketing community.",
};

export default function JoinPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Join Dcorp CC</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Passionate about cricket? We&apos;re always looking for talented players and enthusiastic
          members to grow our club.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <JoinForm />

        {/* Why join */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-gray-900 font-bold text-xl mb-5">Why Join Dcorp CC?</h2>
            <ul className="space-y-4">
              {[
                {
                  icon: "🏏",
                  title: "Competitive Cricket",
                  desc: "Play in local and regional leagues against strong opposition.",
                },
                {
                  icon: "📈",
                  title: "Player Development",
                  desc: "Access to specialist batting, bowling, and fielding coaches.",
                },
                {
                  icon: "🤝",
                  title: "Great Community",
                  desc: "A welcoming, inclusive team that supports all skill levels.",
                },
                {
                  icon: "🏟️",
                  title: "Excellent Facilities",
                  desc: "Newly upgraded home ground at Greenfield Park.",
                },
                {
                  icon: "📅",
                  title: "Regular Training",
                  desc: "Structured sessions every Tuesday and Thursday evening.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-[#dc2626] font-bold mb-2">Talent Trials</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Next open trials: <strong className="text-gray-900">5th April 2026</strong> at Greenfield
              Park Ground, 10:00 AM. All skill levels welcome. Register via this form to secure your
              spot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
