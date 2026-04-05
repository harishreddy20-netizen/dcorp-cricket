import type { Metadata } from "next";
import { news } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, match reports, and club updates from Dcorp Cricket Club.",
};

const categoryColors: Record<string, string> = {
  "Match Report": "bg-blue-500/20 text-blue-400",
  "Club News": "bg-yellow-500/20 text-yellow-400",
  Recruitment: "bg-green-500/20 text-green-400",
};

export default function NewsPage() {
  const [featured, ...rest] = news;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">News &amp; Updates</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Match reports, club announcements, and everything happening at Dcorp CC.
        </p>
      </div>

      {/* Featured Article */}
      <article className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 mb-8 hover:border-[#dc2626]/40 transition-colors">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              categoryColors[featured.category] ?? "bg-[#dc2626]/20 text-[#dc2626]"
            }`}
          >
            {featured.category}
          </span>
          <span className="text-gray-500 text-xs">
            {new Date(featured.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-[#dc2626] text-xs font-medium uppercase tracking-wide">
            Featured
          </span>
        </div>
        <h2 className="text-white text-2xl font-bold mb-4 leading-snug">{featured.title}</h2>
        <p className="text-gray-300 text-base leading-relaxed mb-4">{featured.excerpt}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{featured.content}</p>
      </article>

      {/* Rest of articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rest.map((item) => (
          <article
            key={item.id}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 hover:border-[#dc2626]/40 transition-colors flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  categoryColors[item.category] ?? "bg-[#dc2626]/20 text-[#dc2626]"
                }`}
              >
                {item.category}
              </span>
              <span className="text-gray-600 text-xs">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="text-white font-semibold text-base mb-3 leading-snug flex-1">
              {item.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
