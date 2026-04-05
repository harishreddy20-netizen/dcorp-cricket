import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-auto">
      {/* Top red accent */}
      <div className="h-1 bg-[#dc2626]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Dcorp Cricket Club"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-white text-base leading-tight">Dcorp Cricket Club</p>
                <p className="text-gray-500 text-xs tracking-widest uppercase">Oklahoma City</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Est. 2014 — Building a cricketing community with passion, dedication, and the love of
              the game.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">
              Club
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/players", label: "Our Squad" },
                { href: "/fixtures", label: "Fixtures & Results" },
                { href: "/news", label: "News & Updates" },
                { href: "/join", label: "Join the Club" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#dc2626] transition-all duration-200 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#dc2626] mt-0.5">📍</span>
                <span>Oklahoma City, USA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#dc2626] mt-0.5">✉️</span>
                <span>info@dcorpcc.club</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#dc2626] mt-0.5">🏏</span>
                <span>Training: Tue &amp; Thu, 6:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Dcorp Cricket Club. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            <p className="text-gray-600 text-xs">TSCL 35 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
