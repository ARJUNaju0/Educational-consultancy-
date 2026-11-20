import {
  Building2,
  ClipboardCheck,
  Compass,
  FileText,
  GraduationCap,
} from "lucide-react";

const journeySteps = [
  { icon: Compass, title: "Share your goals", text: "Tell us what you want to study." },
  { icon: GraduationCap, title: "Choose a course", text: "Find a course that fits you." },
  { icon: FileText, title: "Find a college", text: "Compare colleges with our guidance." },
  { icon: ClipboardCheck, title: "Apply", text: "Get support with your application." },
  { icon: Building2, title: "Start studying", text: "Begin your next chapter." },
];

export default function StudentJourney() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-cobalt/10 bg-bg/70 px-5 py-8 shadow-sm backdrop-blur-md sm:mt-16 sm:px-8 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-mint/15 blur-3xl"
      />

      <h2 className="relative mb-9 text-center font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
        Your student journey
      </h2>

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-[23px] top-6 w-[2px] bg-cobalt/10 md:bottom-auto md:left-[10%] md:right-[10%] md:top-6 md:h-[2px] md:w-auto"
        >
          <div className="h-full w-full bg-gradient-to-b from-cobalt to-mint md:bg-gradient-to-r" />
        </div>

        <ol className="relative grid gap-7 md:grid-cols-5 md:gap-4">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === journeySteps.length - 1;

            return (
              <li
                key={step.title}
                className="relative grid grid-cols-[48px_1fr] gap-4 md:flex md:flex-col md:items-center md:gap-0 md:text-center"
              >
                <div
                  className="journey-icon relative z-10 flex size-12 items-center justify-center rounded-2xl border border-white/80 bg-white/65 text-cobalt shadow-sm backdrop-blur-sm motion-safe:transition-transform motion-safe:hover:-translate-y-1 md:mb-5 md:size-14"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                  <span
                    className={`absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white ${
                      isLast ? "bg-mint-deep" : "bg-cobalt"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>

                <div className="pt-1 md:px-2 md:pt-0">
                  <h3 className="font-display text-base font-bold text-heading sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-body">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
