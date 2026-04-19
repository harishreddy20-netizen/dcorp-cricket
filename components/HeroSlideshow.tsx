"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Slides */}
      {images.map((url, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={url}
            alt="Dcorp Cricket Club"
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay: dark at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #0d0f18 0%, rgba(13,15,24,0.65) 50%, rgba(13,15,24,0.25) 100%)" }}
      />

      {/* Navigation dots */}
      {images.length > 1 && (
        <div className="absolute bottom-8 right-16 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: "6px",
                height: "6px",
                background: i === current ? "#C9A44B" : "#868ea5",
                transform: i === current ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
