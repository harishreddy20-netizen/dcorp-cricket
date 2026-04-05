import Link from "next/link";
import Image from "next/image";

function IconLocation() {
  return (
    <svg className="w-4 h-4 text-[#dc2626] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconEnvelope() {
  return (
    <svg className="w-4 h-4 text-[#dc2626] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="w-4 h-4 text-[#dc2626] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

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
                  src="/logo-v2.jpeg"
                  alt="Dcorp Cricket Club"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg leading-tight tracking-tight">
                  Dcorp Cricket Club
                </p>
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
                { href: "/gallery", label: "Gallery" },
                { href: "/join", label: "Join the Club" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group cursor-pointer"
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
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <IconLocation />
                <span>Oklahoma City, USA</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconEnvelope />
                <span>info@dcorpcc.club</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconClock />
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
