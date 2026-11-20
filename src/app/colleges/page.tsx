import type { Metadata } from "next";
import CollegesExplorer from "@/components/CollegesExplorer";

export const metadata: Metadata = {
  title: "Partner colleges",
  description:
    "Search partner colleges by name, location and course, then enquire about the ones that interest you.",
};

export default function CollegesPage() {
  return (
    <>
      <section className="bg-bg">
        <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-12 sm:px-6 md:pb-14 md:pt-20">
          <h1 className="font-display text-[2.75rem] font-bold leading-[1.1] tracking-tight text-heading sm:text-5xl">
            Partner colleges
          </h1>
          <p className="mt-5 max-w-xl text-lg text-body sm:text-xl">
            Search by name, or filter by location and course to narrow the list.
          </p>
        </div>
      </section>
      <CollegesExplorer />
    </>
  );
}
