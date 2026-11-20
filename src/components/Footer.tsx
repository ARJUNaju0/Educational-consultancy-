import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-cobalt-deep text-white/80">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div>
          <p className="flex items-center gap-2.5 font-display text-xl font-bold text-white">
            <GraduationCap size={24} aria-hidden="true" />
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm">{siteConfig.description}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Extra bottom space so the floating WhatsApp button never covers footer text */}
      <div className="border-t border-white/15 px-4 pb-24 pt-5 text-center text-sm">
        © {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
