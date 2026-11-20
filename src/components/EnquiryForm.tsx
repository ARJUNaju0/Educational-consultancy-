"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { collegeLocations, colleges } from "@/data/colleges";
import { courses } from "@/data/courses";
import { submitEnquiry } from "@/lib/enquiry";
import {
  LIMITS,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryFormValues,
} from "@/lib/validation";
import Contact from "./Contact";

const emptyValues: EnquiryFormValues = {
  name: "",
  mobile: "",
  email: "",
  course: "",
  location: "",
  college: "",
  message: "",
  consent: false,
  website: "",
};

const fieldOrder: EnquiryField[] = [
  "name",
  "mobile",
  "email",
  "course",
  "location",
  "college",
  "message",
  "consent",
];

type Status = "idle" | "submitting" | "success" | "error";

const collegeSuggestions = colleges.filter((college) => !college.isSample);

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-error">
      {message}
    </p>
  );
}

export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryFormValues>(emptyValues);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submissionId = useRef<string | null>(null);

  function setField(field: EnquiryField, value: string | boolean) {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setField(event.target.name as EnquiryField, event.target.value);
  }

  function focusFirstError(found: EnquiryErrors) {
    const first = fieldOrder.find((field) => found[field]);
    if (first) document.getElementById(`enquiry-${first}`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    submissionId.current ??= crypto.randomUUID();

    const check = validateEnquiry({ ...values, submissionId: submissionId.current });
    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      setErrorMessage("");
      focusFirstError(check.errors);
      return;
    }

    setErrors({});
    setErrorMessage("");
    setStatus("submitting");

    const result = await submitEnquiry(values, submissionId.current);

    if (result.ok) {
      setValues(emptyValues);
      submissionId.current = null;
      setStatus("success");
      return;
    }

    if (result.errors) {
      setErrors(result.errors);
      focusFirstError(result.errors);
    }
    setErrorMessage(result.message);
    setStatus("error");
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" className="bg-bg py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <h2 className="mb-5 font-display text-3xl font-bold tracking-tight text-heading">
          Contact Us
        </h2>
        <div className="card grid overflow-hidden md:grid-cols-[17rem_1fr]">
          <Contact />

          <div
            id="enquiry"
            className="relative scroll-mt-20 border-t border-dashed border-border p-5 sm:p-8 md:border-l md:border-t-0"
          >
            <span
              aria-hidden="true"
              className="absolute -left-3 -top-3 size-6 rounded-full bg-bg"
            />
            <span
              aria-hidden="true"
              className="absolute -right-3 -top-3 size-6 rounded-full bg-bg md:-bottom-3 md:-left-3 md:right-auto md:top-auto"
            />

            <h3 className="font-display text-2xl font-bold tracking-tight text-heading">
              Send us a message
            </h3>

            {status === "success" ? (
              <div role="status" className="py-8 text-center">
                <CheckCircle2
                  className="mx-auto text-success"
                  size={48}
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-2xl font-bold text-heading">
                  Enquiry sent
                </h3>
                <p className="mx-auto mt-2 max-w-md text-lg text-body">
                  Thank you. We have your details and will contact you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-outline mt-6"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enquiry-name" className="mb-1.5 block font-semibold text-heading">
                    Full name
                  </label>
                  <input
                    id="enquiry-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={LIMITS.name}
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "enquiry-name-error" : undefined}
                    className="field"
                  />
                  <ErrorText id="enquiry-name-error" message={errors.name} />
                </div>

                <div>
                  <label htmlFor="enquiry-mobile" className="mb-1.5 block font-semibold text-heading">
                    Phone
                  </label>
                  <input
                    id="enquiry-mobile"
                    name="mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.mobile}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.mobile)}
                    aria-describedby={errors.mobile ? "enquiry-mobile-error" : undefined}
                    className="field"
                  />
                  <ErrorText id="enquiry-mobile-error" message={errors.mobile} />
                </div>

                <div>
                  <label htmlFor="enquiry-email" className="mb-1.5 block font-semibold text-heading">
                    Email address
                  </label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={LIMITS.email}
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "enquiry-email-error" : undefined}
                    className="field"
                  />
                  <ErrorText id="enquiry-email-error" message={errors.email} />
                </div>

                <div>
                  <label htmlFor="enquiry-course" className="mb-1.5 block font-semibold text-heading">
                    Preferred course
                  </label>
                  <select
                    id="enquiry-course"
                    name="course"
                    value={values.course}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.course)}
                    aria-describedby={errors.course ? "enquiry-course-error" : undefined}
                    className="field"
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                  <ErrorText id="enquiry-course-error" message={errors.course} />
                </div>

                <div>
                  <label htmlFor="enquiry-location" className="mb-1.5 block font-semibold text-heading">
                    Preferred location
                  </label>
                  <select
                    id="enquiry-location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? "enquiry-location-error" : undefined}
                    className="field"
                  >
                    <option value="">Choose a location</option>
                    {collegeLocations.map((place) => (
                      <option key={place} value={place}>
                        {place}
                      </option>
                    ))}
                  </select>
                  <ErrorText id="enquiry-location-error" message={errors.location} />
                </div>

                <div>
                  <label htmlFor="enquiry-college" className="mb-1.5 block font-semibold text-heading">
                    Preferred college <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input
                    id="enquiry-college"
                    name="college"
                    type="text"
                    list="enquiry-college-list"
                    maxLength={LIMITS.college}
                    value={values.college}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.college)}
                    aria-describedby={errors.college ? "enquiry-college-error" : undefined}
                    className="field"
                  />
                  <datalist id="enquiry-college-list">
                    {collegeSuggestions.map((college) => (
                      <option key={college.id} value={college.name} />
                    ))}
                  </datalist>
                  <ErrorText id="enquiry-college-error" message={errors.college} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="enquiry-message" className="mb-1.5 block font-semibold text-heading">
                    How can we help?
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={3}
                    maxLength={LIMITS.message}
                    value={values.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "enquiry-message-error" : undefined}
                    className="field"
                  />
                  <ErrorText id="enquiry-message-error" message={errors.message} />
                </div>

                {/* Honeypot */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="enquiry-website">Leave this field empty</label>
                  <input
                    id="enquiry-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3">
                    <input
                      id="enquiry-consent"
                      name="consent"
                      type="checkbox"
                      checked={values.consent}
                      onChange={(event) => setField("consent", event.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? "enquiry-consent-error" : undefined}
                      className="mt-1 size-5 shrink-0 accent-cobalt"
                    />
                    <span className="text-body">
                      I agree that you may store my details and contact me about my enquiry.
                    </span>
                  </label>
                  <ErrorText id="enquiry-consent-error" message={errors.consent} />
                </div>

                {errors.website && (
                  <p role="alert" className="text-sm font-semibold text-error sm:col-span-2">
                    {errors.website}
                  </p>
                )}

                {status === "error" && errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-error/30 bg-red-50 p-4 text-error sm:col-span-2"
                  >
                    <TriangleAlert className="mt-0.5 shrink-0" size={20} aria-hidden="true" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                    className="btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-48"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} aria-hidden="true" />
                        Sending
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
