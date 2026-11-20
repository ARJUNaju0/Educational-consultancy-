import Link from "next/link";
import { MessageCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { courses } from "@/data/courses";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Courses() {
  return (
    <section id="courses" className="bg-bg py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            title="Find the course that fits you"
            description="Pick a study area to ask about it. If yours is not listed, choose Other Professional Courses and tell us what you need."
          />
        </div>

        <ul className="space-y-3">
          {courses.map((course) => (
            <li
              key={course.id}
              className="card grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-5"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-cobalt/10 text-cobalt">
                <course.icon size={26} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-heading">{course.name}</h3>
                <p className="mt-1 text-body">{course.description}</p>
              </div>
              <div className="flex gap-2">
                <Link href="/#enquiry" className="btn-primary">
                  Enquire now
                </Link>
                <a
                  href={buildWhatsAppUrl(
                    `Hello, I would like to know more about ${course.name} courses.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask about ${course.name} on WhatsApp`}
                  className="btn-whatsapp px-3"
                >
                  <MessageCircle size={20} aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
