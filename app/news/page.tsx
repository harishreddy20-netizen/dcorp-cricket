import type { Metadata } from "next";
import { news } from "@/lib/data";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, match reports, and club updates from Dcorp Cricket Club.",
};

const categoryStyle: Record<string, { badge: string; bar: string }> = {
  "Match Report": { badge: "bg-blue-50 text-blue-700 border-blue-200",   bar: "bg-blue-500"   },
  "Club News":    { badge: "bg-amber-50 text-amber-700 border-amber-200", bar: "bg-amber-400"  },
  "Recruitment":  { badge: "bg-green-50 text-green-700 border-green-200", bar: "bg-green-500"  },
};

const defaultStyle = { badge: "bg-red-50 text-[#dc2626] border-red-200", bar: "bg-[#dc2626]" };

export default function NewsPage() {
  const [featured, ...rest] = news;
  const featuredStyle = categoryStyle[featured.category] ?? defaultStyle;

  return (
    <div>
      <PageBanner
        eyebrow="Dcorp CC"
        title="News & Updates"
        subtitle="Match reports, club announcements, and everything happening at Dcorp CC."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Featured</h2>
        </div>

        <article className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-12 hover:shadow-md transition-all duration-200">
          <div className={`h-1.5 ${featuredStyle.bar}`} />
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${featuredStyle.badge}`}>
                {featured.category}
              </span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-gray-400 text-xs">
                {new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="ml-auto text-[#dc2626] text-xs font-bold uppercase tracking-widest">Featured</span>
            </div>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-4">
              {featured.title}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-3 font-medium">{featured.excerpt}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{featured.content}</p>
          </div>
        </article>

        {/* More articles */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">More Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((item) => {
            const style = categoryStyle[item.category] ?? defaultStyle;
            return (
              <article
                key={item.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div className={`h-1 ${style.bar}`} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${style.badge}`}>
                      {item.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="text-gray-900 font-bold text-sm leading-snug mb-3 flex-1">{item.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.excerpt}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
