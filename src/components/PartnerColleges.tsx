import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CollegeCard from "./CollegeCard";
import SectionHeading from "./SectionHeading";
import { colleges } from "@/data/colleges";

export default function PartnerColleges() {
  const featured = colleges.filter((college) => college.featured).slice(0, 3);

  return (
    <section id="partner-colleges" className="bg-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="on-dark overflow-hidden rounded-2xl bg-cobalt-deep px-5 py-10 sm:px-10 sm:py-14" style={{ borderRadius: "var(--radius-card)" }}>
          <SectionHeading
            tone="dark"
            title="Partner colleges"
            description="A few of the colleges we can guide you to. The full list has search and filters."
          />

          <div className="mt-8">
            {featured.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          <div className="mt-8 border-t border-white/15 pt-8">
            <Link href="/colleges" className="btn bg-mint text-mint-deep hover:bg-mint/80 shadow-sm" style={{ borderRadius: "var(--radius-btn)" }}>
              View all colleges
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
