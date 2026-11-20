import type { NavLink, SocialLink } from "@/types";

// Agency details come from environment variables so nothing is invented.
// Set them in .env.local (local) or in the Netlify dashboard (production).
// NEXT_PUBLIC_ values are visible in the browser, so only put public contact
// details here, never secrets.
const socialLinks: SocialLink[] = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
  { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "" },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "" },
].filter((link) => link.href !== "");

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_AGENCY_NAME || "Your Consultancy Name",
  tagline: "Education Consultancy",
  description:
    "Guidance for students who want to find the right college and course for higher education.",
  // On Netlify, the URL variable is set automatically at build time.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",
  // Country code + number, digits only. Example format: 919876543210
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  socialLinks,
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Colleges", href: "/colleges" },
  { label: "Contact Us", href: "/#contact" },
];
