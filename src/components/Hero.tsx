import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircleText } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-bg">
      {/* Background hero image — subtle, decorative */}
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        className="pointer-events-none object-cover opacity-[0.25]"
        sizes="100vw"
      />

      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cobalt/5 via-transparent to-mint/5" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-24">
        <span className="mb-4 inline-block rounded-full bg-mint-pale px-4 py-1.5 text-sm font-semibold text-mint-deep">
          Trusted by students across South India
        </span>
        <h1 className="max-w-4xl font-display text-[2.75rem] font-bold leading-[1.1] tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Choose your course.{" "}
          <span className="text-cobalt">We help you get to campus.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-body sm:text-xl">
          We help students compare courses, shortlist colleges and complete
          admission applications.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/#enquiry" className="btn-secondary">
            Get Free Admission Guidance
          </Link>
          <Link href="/#courses" className="btn-primary">
            Explore courses
          </Link>

          <a
            href={buildWhatsAppUrl("Hello, I would like to know more about your services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <MessageCircleText size={20} aria-hidden="true" />
            WhatsApp us
          </a>
        </div>

      </div>
    </section>
  );
}
