import type { LucideIcon } from "lucide-react";

export type CollegeLocation =
  | "Bengaluru"
  | "Mysuru"
  | "Mangaluru"
  | "Tamil Nadu"
  | "Other";

export interface NavLink {
  label: string;
  href: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface College {
  id: string;
  name: string;
  location: CollegeLocation;
  /** Ids from src/data/courses.ts */
  courseIds: string[];
  description?: string;
  /** Show on the homepage "Partner Colleges" section */
  featured?: boolean;
  /** Set to true for placeholder entries. Remove once verified details are added. */
  isSample?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
}
