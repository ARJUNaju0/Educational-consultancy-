"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Menu, MessageCircle, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 max-md:h-[66px]"
      >
        <Link
          href="/#home"
          className="flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex size-10 items-center justify-center rounded-[10px] bg-cobalt text-white">
            <GraduationCap size={22} aria-hidden="true" />
          </span>
          <span className="max-w-[10rem] truncate font-display text-xl font-bold tracking-tight text-cobalt sm:max-w-none">
            {siteConfig.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="py-2 text-[15px] font-medium text-heading transition-colors duration-200 hover:text-cobalt"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppUrl("Hello, I would like to know more about your services.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden size-11 items-center justify-center rounded-lg text-green-700 transition-colors hover:bg-green-50 md:inline-flex"
          >
            <MessageCircle size={22} aria-hidden="true" />
          </a>
          <Link href="/#enquiry" className="btn-primary hidden sm:inline-flex">
            Enquire now
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-lg text-heading transition-colors hover:bg-cobalt/5 md:hidden"
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
