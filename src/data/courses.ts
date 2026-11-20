import {
  BookOpen,
  Briefcase,
  Calculator,
  Cog,
  GraduationCap,
  Laptop,
  Stethoscope,
} from "lucide-react";
import type { Course } from "@/types";

// Edit this file to change the courses shown on the website.
export const courses: Course[] = [
  {
    id: "engineering",
    name: "Engineering",
    description:
      "Explore engineering streams and find colleges that match your interests and marks.",
    icon: Cog,
  },
  {
    id: "medical",
    name: "Medical and Allied Health Sciences",
    description:
      "Guidance on nursing, pharmacy, physiotherapy and other health science programmes.",
    icon: Stethoscope,
  },
  {
    id: "management",
    name: "Management",
    description:
      "Options for BBA, MBA and other management programmes at the right colleges.",
    icon: Briefcase,
  },
  {
    id: "arts-science",
    name: "Arts and Science",
    description:
      "Undergraduate and postgraduate choices across arts, humanities and sciences.",
    icon: BookOpen,
  },
  {
    id: "computer-applications",
    name: "Computer Applications",
    description:
      "BCA, MCA and related computing courses for students who want a career in IT.",
    icon: Laptop,
  },
  {
    id: "commerce",
    name: "Commerce",
    description:
      "B.Com, M.Com and professional commerce pathways, with help choosing a college.",
    icon: Calculator,
  },
  {
    id: "other-professional",
    name: "Other Professional Courses",
    description:
      "Tell us what you are looking for and we will help you find suitable options.",
    icon: GraduationCap,
  },
];

export function getCourseName(id: string): string {
  return courses.find((course) => course.id === id)?.name ?? id;
}
