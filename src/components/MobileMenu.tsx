"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { navLinks } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div id="mobile-menu" className="border-t border-border bg-white md:hidden">
      <ul className="mx-auto max-w-[1200px] space-y-1 px-4 py-4">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block rounded-lg px-3 py-3 text-lg font-medium text-heading transition-colors hover:bg-cobalt/5 hover:text-cobalt"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="grid gap-2 pt-3">
          <Link href="/#enquiry" onClick={onClose} className="btn-primary">
            Enquire now
          </Link>
          <a
            href={buildWhatsAppUrl("Hello, I would like to know more about your services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </li>
      </ul>
    </div>
  );
}
