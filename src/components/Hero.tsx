import Image from "next/image";
import Link from "next/link";
import { MessageCircle, MessageCircleText } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const stops = [
  { title: "Talk to us", text: "Share your goals and questions." },
  { title: "Pick a course", text: "Compare courses that fit you." },
  { title: "Shortlist colleges", text: "Narrow your options with our guidance." },
  { title: "Apply with help", text: "We guide you through each application." },
  { title: "Start college", text: "Begin your course on campus." },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-bg">
      {/* Background hero image — subtle, decorative */}
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        className="pointer-events-none object-cover opacity-[0.06]"
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
            <MessageCircleText size={25} aria-hidden="true" />
          </a>
        </div>

        {/* The route — step-by-step journey */}
        <div className="card relative mt-14 p-6 sm:p-8 md:mt-20">
          <span
            aria-hidden="true"
            className="absolute -left-3 top-1/2 hidden size-6 -translate-y-1/2 rounded-full bg-bg md:block"
          />
          <span
            aria-hidden="true"
            className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 rounded-full bg-bg md:block"
          />
          <h2 className="font-display text-xl font-bold text-heading">
            Your route to campus
          </h2>

          <ol className="relative mt-8 grid gap-8 md:grid-cols-5 md:gap-4">
            <div
              aria-hidden="true"
              className="animate-draw absolute left-5 top-5 h-[calc(100%-2.5rem)] w-0.5 bg-cobalt md:left-5 md:right-5 md:h-0.5 md:w-auto"
            />
            {stops.map((stop, index) => {
              const isLast = index === stops.length - 1;
              return (
                <li key={stop.title} className="relative pl-14 md:pl-0 md:pt-14">
                  <span
                    className={`absolute left-0 top-0 flex size-10 items-center justify-center rounded-full font-display text-lg font-bold ${
                      isLast
                        ? "bg-mint text-mint-deep"
                        : "bg-cobalt text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-heading">{stop.title}</h3>
                  <p className="mt-1 text-body">{stop.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
