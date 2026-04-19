import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "oklch(8% 0.015 255)", borderTop: "1px solid #23263a" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ background: "#131620" }}>
                <Image src="/logo-v3.png" alt="Dcorp Cricket Club" width={40} height={40} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-display font-bold text-white uppercase" style={{ fontSize: "18px", letterSpacing: "0.05em" }}>
                  Dcorp Cricket Club
                </p>
                <p style={{ fontSize: "11px", color: "#C9A44B", letterSpacing: "0.12em" }} className="uppercase">
                  Oklahoma City
                </p>
              </div>
            </div>
            <p style={{ color: "#868ea5", fontSize: "14px", lineHeight: "1.6", maxWidth: "300px" }}>
              Est. 2014 — Building a cricketing community with passion, dedication, and the love of the game.
            </p>
          </div>

          {/* Club links */}
          <div>
            <h4 className="font-bold uppercase mb-5" style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#C9A44B" }}>
              Club
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/players", label: "Our Squad" },
                { href: "/fixtures", label: "Fixtures & Results" },
                { href: "/gallery", label: "Gallery" },
                { href: "/join", label: "Join the Club" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: "14px", color: "#868ea5" }} className="hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold uppercase mb-5" style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#C9A44B" }}>
              Contact
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "info@dcorpcc.club" },
                { label: "Oklahoma City, USA" },
                { label: "Training: Thu, 6:30 PM" },
              ].map((item) => (
                <li key={item.label} style={{ fontSize: "14px", color: "#868ea5" }}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t" style={{ borderColor: "#23263a" }}>
          <p style={{ fontSize: "12px", color: "#868ea5" }}>
            © {new Date().getFullYear()} Dcorp Cricket Club. All rights reserved.
          </p>
          <p className="font-bold uppercase" style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#C9A44B" }}>
            TSCL 35 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
