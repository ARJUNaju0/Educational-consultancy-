"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import CollegeCard from "./CollegeCard";
import { collegeLocations, colleges } from "@/data/colleges";
import { courses } from "@/data/courses";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CollegesExplorer() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [courseId, setCourseId] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    return colleges.filter(
      (college) =>
        (search === "" || college.name.toLowerCase().includes(search)) &&
        (location === "" || college.location === location) &&
        (courseId === "" || college.courseIds.includes(courseId)),
    );
  }, [query, location, courseId]);

  const hasFilters = query !== "" || location !== "" || courseId !== "";

  function clearFilters() {
    setQuery("");
    setLocation("");
    setCourseId("");
  }

  return (
    <section className="pb-16 sm:pb-24" aria-label="College search">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end"
        >
          <div>
            <label htmlFor="college-search" className="mb-1.5 block font-semibold text-heading">
              Search by college name
            </label>
            <input
              id="college-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a college name"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="college-location" className="mb-1.5 block font-semibold text-heading">
              Location
            </label>
            <select
              id="college-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="field"
            >
              <option value="">All locations</option>
              {collegeLocations.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="college-course" className="mb-1.5 block font-semibold text-heading">
              Course
            </label>
            <select
              id="college-course"
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              className="field"
            >
              <option value="">All courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="btn-outline disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-cobalt"
          >
            Clear filters
          </button>
        </form>

        <p role="status" aria-live="polite" className="mt-6 font-semibold text-heading">
          {results.length === 1 ? "1 college found" : `${results.length} colleges found`}
        </p>

        <div className="on-dark mt-4 overflow-hidden rounded-2xl bg-cobalt-deep px-5 py-4 sm:px-10" style={{ borderRadius: "var(--radius-card)" }}>
          {results.length > 0 ? (
            results.map((college, index) => (
              <div key={college.id} className={index === 0 ? "[&>article]:border-t-0" : ""}>
                <CollegeCard college={college} />
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="font-display text-2xl font-bold text-white">
                No colleges match these filters
              </p>
              <p className="mx-auto mt-2 max-w-md text-white/80">
                Clear the filters to see every college, or ask us on WhatsApp and
                we will help you find an option.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={clearFilters} className="btn bg-mint text-mint-deep hover:bg-mint/80" style={{ borderRadius: "var(--radius-btn)" }}>
                  Clear filters
                </button>
                <a
                  href={buildWhatsAppUrl("Hello, I could not find a college I was looking for.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white/15 text-white hover:bg-white/25"
                  style={{ borderRadius: "var(--radius-btn)" }}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
