import Image from "next/image";
import { ClipboardList, Compass, FileText, HeartHandshake, School } from "lucide-react";
import SectionHeading from "./SectionHeading";
import StudentJourney from "./StudentJourney";

const reasons = [
  {
    icon: Compass,
    title: "Student guidance",
    text: "Clear advice on your options so you can plan your next step.",
  },
  {
    icon: ClipboardList,
    title: "Course selection assistance",
    text: "Help comparing courses and choosing one that suits your interests.",
  },
  {
    icon: School,
    title: "College admission support",
    text: "Support through the admission process at your chosen colleges.",
  },
  {
    icon: HeartHandshake,
    title: "Personalised counselling",
    text: "One-to-one discussions about your goals, questions and concerns.",
  },
  {
    icon: FileText,
    title: "Application guidance",
    text: "Help preparing and submitting your application correctly.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative isolate overflow-hidden bg-surface py-16 sm:py-24">
      <Image
        src="/support.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-[1]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-surface/80" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeading
            title="How we support you"
            description="Practical help at each stage of your admission journey."
          />

          <ul className="grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li key={reason.title} className="card flex gap-4 p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mint-pale text-mint-deep">
                  <reason.icon size={24} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-heading">{reason.title}</h3>
                  <p className="mt-1 text-body">{reason.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <StudentJourney />
      </div>
    </section>
  );
}
