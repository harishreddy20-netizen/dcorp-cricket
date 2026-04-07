"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  name: string;
  url: string;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  function open(img: GalleryImage, idx: number) {
    setSelected(img);
    setSelectedIdx(idx);
  }

  function close() {
    setSelected(null);
    setSelectedIdx(-1);
  }

  function prev() {
    const idx = (selectedIdx - 1 + images.length) % images.length;
    setSelected(images[idx]);
    setSelectedIdx(idx);
  }

  function next() {
    const idx = (selectedIdx + 1) % images.length;
    setSelected(images[idx]);
    setSelectedIdx(idx);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  function label(name: string) {
    return name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, idx) => (
          <button
            key={img.name}
            onClick={() => open(img, idx)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:ring-offset-2"
            aria-label={`View photo: ${label(img.name)}`}
          >
            <Image
              src={img.url}
              alt={label(img.name)}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/30 transition-colors duration-200 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={close}
          onKeyDown={handleKey}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          tabIndex={0}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-150 cursor-pointer z-10"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-150 cursor-pointer z-10"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.url}
              alt={label(selected.name)}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-150 cursor-pointer z-10"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <p className="text-white/40 text-xs">{selectedIdx + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
