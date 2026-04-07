"use client";

import Image from "next/image";

export default function PhotoStrip({ urls }: { urls: string[] }) {
  if (urls.length === 0) return null;

  const doubled = [...urls, ...urls];

  return (
    <div className="bg-gray-900 py-5 overflow-hidden select-none">
      {/* Row 1 — left to right */}
      <div className="mb-3 overflow-hidden">
        <div
          className="flex gap-3"
          style={{ animation: "marquee 50s linear infinite", width: "max-content" }}
        >
          {doubled.map((url, i) => (
            <div
              key={i}
              className="relative w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-white/5 shadow-lg"
            >
              <Image src={url} alt="" fill className="object-cover" sizes="192px" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="overflow-hidden">
        <div
          className="flex gap-3"
          style={{ animation: "marquee-reverse 60s linear infinite", width: "max-content" }}
        >
          {[...doubled].reverse().map((url, i) => (
            <div
              key={i}
              className="relative w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-white/5 shadow-lg"
            >
              <Image src={url} alt="" fill className="object-cover" sizes="192px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
