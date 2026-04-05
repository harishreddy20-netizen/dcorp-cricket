import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#dc2626] flex items-center justify-center font-bold text-white text-sm">
                DC
              </div>
              <span className="font-bold text-white text-lg">
                Dcorp <span className="text-[#dc2626]">Cricket Club</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building a cricketing community with passion, dedication, and the
              love of the game. Join us on the pitch.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/players", label: "Player Profiles" },
                { href: "/fixtures", label: "Fixtures & Results" },
                { href: "/news", label: "News & Updates" },
                { href: "/join", label: "Join the Club" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#dc2626] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Greenfield Park Ground</li>
              <li>info@dcorpcc.club</li>
              <li>Training: Tue & Thu, 6:30 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Dcorp Cricket Club. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
