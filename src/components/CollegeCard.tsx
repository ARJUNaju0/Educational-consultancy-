import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { locationCodes } from "@/data/colleges";
import { getCourseName } from "@/data/courses";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { College } from "@/types";

export default function CollegeCard({ college }: { college: College }) {
  return (
    <article className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-4 border-t border-white/15 py-6 md:grid-cols-[5.5rem_1.2fr_1.4fr_auto] md:items-center">
      <p
        aria-hidden="true"
        className="font-mono text-2xl font-semibold text-mint"
      >
        {locationCodes[college.location]}
      </p>

      <div>
        <h3 className="font-display text-xl font-bold text-white">{college.name}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-white/80">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={16} aria-hidden="true" />
            {college.location}
          </span>
          {college.isSample && (
            <span className="rounded bg-mint/20 px-2 py-0.5 text-xs font-semibold text-mint">
              Sample data
            </span>
          )}
        </p>
      </div>

      <div className="col-span-2 md:col-span-1">
        <ul className="flex flex-wrap gap-2" aria-label="Available courses">
          {college.courseIds.map((id) => (
            <li
              key={id}
              className="rounded-full border border-white/30 px-3 py-1 text-sm text-white"
            >
              {getCourseName(id)}
            </li>
          ))}
        </ul>
        {college.description && (
          <p className="mt-3 text-white/80">{college.description}</p>
        )}
      </div>

      <div className="col-span-2 flex gap-2 md:col-span-1">
        <Link href="/#enquiry" className="btn bg-white/10 text-white hover:bg-white/20" style={{ borderRadius: "var(--radius-btn)" }}>
          Enquire now
        </Link>
        <a
          href={buildWhatsAppUrl(`Hello, I would like to enquire about ${college.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about ${college.name} on WhatsApp`}
          className="btn-whatsapp px-3"
        >
          <MessageCircle size={20} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
