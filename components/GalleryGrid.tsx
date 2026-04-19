"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const LABELS = ["Match Day", "TSCL 2026", "In the Field", "The Squad", "April 2026", "Training", "Game On", "OKC Cricket"];

// Span pattern matching the design
const SPANS: { col?: number; row?: number }[] = [
  { col: 2 },        // wide
  {},                // normal
  {},                // normal
  { row: 2 },        // tall
  {},                // normal
  {},                // normal
  { col: 2 },        // wide
  {},                // normal
];

export default function GalleryGrid({ urls }: { urls: string[] }) {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const images = urls.slice(0, 8);

  const open = (i: number) => { setLbIndex(i); setLbOpen(true); };
  const close = useCallback(() => setLbOpen(false), []);
  const nav = useCallback((dir: number) => setLbIndex(i => (i + dir + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!lbOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "ArrowRight") nav(1);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [lbOpen, close, nav]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "220px",
          gap: "6px",
        }}
      >
        {images.map((url, i) => {
          const span = SPANS[i] ?? {};
          return (
            <div
              key={i}
              onClick={() => open(i)}
              className="group"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                background: "var(--bg3)",
                gridColumn: span.col ? `span ${span.col}` : undefined,
                gridRow: span.row ? `span ${span.row}` : undefined,
              }}
            >
              <Image
                src={url}
                alt={LABELS[i] ?? "Dcorp CC"}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-[1.07] group-hover:brightness-100 group-hover:saturate-110"
                style={{ filter: "brightness(0.8) saturate(0.9)" }}
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                style={{
                  background: "linear-gradient(to top, oklch(11% 0.018 255 / 0.85) 0%, transparent 50%)",
                  padding: "16px 18px",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)" }}>
                  {LABELS[i] ?? "View"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lbOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "oklch(5% 0.01 255 / 0.97)", backdropFilter: "blur(8px)" }}
          onClick={e => { if (e.target === e.currentTarget) close(); }}
        >
          <button
            onClick={close}
            className="absolute top-6 right-7 flex items-center justify-center text-lg transition-colors hover:text-white"
            style={{ border: "1px solid var(--border)", color: "var(--muted)", width: 44, height: 44, background: "none", cursor: "pointer", borderRadius: 2 }}
          >
            ✕
          </button>
          <button
            onClick={() => nav(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center text-3xl transition-colors hover:border-[var(--gold)]"
            style={{ border: "1px solid var(--border)", color: "var(--text)", width: 52, height: 52, background: "none", cursor: "pointer", borderRadius: 2 }}
          >
            ‹
          </button>
          <div style={{ maxWidth: "88vw", maxHeight: "88vh", position: "relative", minWidth: 200, minHeight: 150 }}>
            <Image
              src={images[lbIndex]}
              alt="Gallery"
              width={1200}
              height={800}
              className="object-contain"
              style={{ maxWidth: "88vw", maxHeight: "88vh", border: "1px solid var(--border)" }}
            />
          </div>
          <button
            onClick={() => nav(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center text-3xl transition-colors hover:border-[var(--gold)]"
            style={{ border: "1px solid var(--border)", color: "var(--text)", width: 52, height: 52, background: "none", cursor: "pointer", borderRadius: 2 }}
          >
            ›
          </button>
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}
          >
            {lbIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
