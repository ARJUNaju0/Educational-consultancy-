import { ClipboardList, Compass, FileText, HeartHandshake, School } from "lucide-react";
import SectionHeading from "./SectionHeading";

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
    <section id="why-us" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
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
    </section>
  );
}
