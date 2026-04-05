interface PageBannerProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function PageBanner({ eyebrow, title, subtitle }: PageBannerProps) {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 50%)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Red accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#dc2626]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
        <p className="text-gray-400 mt-2 text-base max-w-xl">{subtitle}</p>
      </div>
    </div>
  );
}
