import { siteConfig } from "@/data/site";

const about = {
  intro: `${siteConfig.name} helps students and parents make confident decisions about higher education. We explain the options, answer questions and support you through the admission process.`,
  mission:
    "To give every student clear, honest guidance so they can choose a course and college that fit them.",
  vision:
    "To be a trusted partner for students and families planning their education.",
  support:
    "Our team supports students with course selection, college shortlisting, counselling and application guidance.",
};

export default function About() {
  return (
    <section id="about" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl font-bold tracking-tight text-heading sm:text-5xl">
            Honest guidance for one of the biggest choices you will make.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-body">{about.intro}</p>
          <p className="mt-4 max-w-2xl text-lg text-body">{about.support}</p>
        </div>

        <dl className="space-y-8 lg:col-span-5 lg:pt-3">
          <div className="border-l-4 border-cobalt pl-5">
            <dt className="font-display text-xl font-bold text-heading">Our mission</dt>
            <dd className="mt-2 text-lg text-body">{about.mission}</dd>
          </div>
          <div className="border-l-4 border-mint pl-5">
            <dt className="font-display text-xl font-bold text-heading">Our vision</dt>
            <dd className="mt-2 text-lg text-body">{about.vision}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
