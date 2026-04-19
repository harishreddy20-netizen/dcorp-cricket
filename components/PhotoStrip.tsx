"use client";

import Image from "next/image";
import { useRef } from "react";

export default function PhotoStrip({ urls }: { urls: string[] }) {
  if (urls.length === 0) return null;
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...urls, ...urls];

  return (
    <div style={{ background: "#0d0f18", padding: "56px 0", overflow: "hidden" }} className="select-none">
      <p
        className="font-bold uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#C9A44B", marginBottom: "24px", paddingLeft: "clamp(24px, 4vw, 64px)" }}
      >
        Match Gallery
      </p>
      <div style={{ overflow: "hidden" }}>
        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: "8px",
            width: "max-content",
            animation: "ticker 40s linear infinite",
          }}
          onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; }}
          onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; }}
        >
          {doubled.map((url, i) => (
            <div
              key={i}
              className="relative flex-shrink-0"
              style={{ width: "280px", height: "180px" }}
            >
              <Image
                src={url}
                alt="Dcorp Cricket Club match action"
                fill
                className="object-cover transition-all duration-300"
                style={{ filter: "brightness(0.85)" }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(0.85)")}
                sizes="280px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
