"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/players", label: "Players" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: "rgba(13,15,24,0.9)", backdropFilter: "blur(16px)", borderColor: "#23263a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ height: "4rem" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden" style={{ background: "#1a1d2a" }}>
              <Image src="/logo-v3.png" alt="Dcorp Cricket Club" width={36} height={36} className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-display font-bold text-white leading-tight uppercase" style={{ fontSize: "17px", letterSpacing: "0.04em" }}>
                Dcorp CC
              </p>
              <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#C9A44B" }} className="uppercase leading-none">
                Oklahoma City
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold uppercase transition-colors duration-150"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  color: pathname === link.href ? "#eef0f5" : "#868ea5",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex">
            <Link
              href="/join"
              className="font-bold uppercase transition-opacity hover:opacity-80"
              style={{ background: "#C9A44B", color: "#0d0f18", padding: "8px 20px", fontSize: "12px", letterSpacing: "0.1em" }}
            >
              Join the Club
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 transition-colors"
            style={{ color: "#868ea5" }}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t" style={{ background: "#0d0f18", borderColor: "#23263a" }}>
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 font-semibold uppercase transition-colors"
                style={{ fontSize: "13px", letterSpacing: "0.08em", color: pathname === link.href ? "#C9A44B" : "#868ea5" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/join"
                onClick={() => setOpen(false)}
                className="block text-center font-bold uppercase"
                style={{ background: "#C9A44B", color: "#0d0f18", padding: "10px 16px", fontSize: "12px", letterSpacing: "0.1em" }}
              >
                Join the Club
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
