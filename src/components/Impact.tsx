
const stats = [
  { number: "1000+", label: "Admissions Done" },
  { number: "07+", label: "Years of Experience" },
  { number: "59", label: "Partner Colleges" },
  { number: "07", label: "Course Streams" },
];

export default function Impact() {
  return (
    <section id="impact" className="bg-[#F7F9FC] py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Our Journey
          </p>

          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Impact in Numbers
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Experience, connections and achievements that reflect
            our commitment to student success.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-slate-200">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-3 text-center"
            >
              <p className="font-display text-4xl font-bold tracking-tight text-blue-700 sm:text-5xl">
                {stat.number}
              </p>

              <h3 className="mt-3 text-sm font-semibold text-slate-700 sm:text-base">
                {stat.label}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
