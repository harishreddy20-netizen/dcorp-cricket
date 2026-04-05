interface PageBannerProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function PageBanner({ eyebrow, title, subtitle }: PageBannerProps) {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 50%)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
      {/* Red accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626]" />
      {/* Red glow left */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#dc2626] opacity-10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-px bg-[#dc2626]" />
          <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest">{eyebrow}</p>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-none mb-3">
          {title}
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}
