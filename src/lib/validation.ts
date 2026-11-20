import { collegeLocations } from "@/data/colleges";
import { courses } from "@/data/courses";

// This file is used by BOTH the browser form and the API route,
// so the rules are written once and cannot drift apart.

export const LIMITS = {
  name: 80,
  email: 120,
  college: 120,
  message: 1000,
} as const;

export interface EnquiryFormValues {
  name: string;
  mobile: string;
  email: string;
  course: string;
  location: string;
  college: string;
  message: string;
  consent: boolean;
  /** Honeypot. Real visitors never see or fill this field. */
  website: string;
}

export type EnquiryField = keyof EnquiryFormValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** The cleaned data that is safe to send on to Google Sheets. */
export interface CleanEnquiry {
  submissionId: string;
  name: string;
  mobile: string;
  email: string;
  course: string;
  location: string;
  college: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; data: CleanEnquiry }
  | { ok: false; errors: EnquiryErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Removes control characters and tidies spaces. Newlines can be kept for messages.
function cleanText(value: unknown, keepNewlines = false): string {
  if (typeof value !== "string") return "";
  const withoutControls = keepNewlines
    ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    : value.replace(/[\u0000-\u001f\u007f]/g, " ");
  const tidied = keepNewlines
    ? withoutControls.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n")
    : withoutControls.replace(/\s+/g, " ");
  return tidied.trim();
}

// Accepts "98765 43210", "+91 98765 43210" and "09876543210" as the same number.
export function normalizeMobile(value: unknown): string {
  if (typeof value !== "string") return "";
  let digits = value.replace(/[\s\-()]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function validateEnquiry(input: unknown): ValidationResult {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<
    string,
    unknown
  >;
  const errors: EnquiryErrors = {};

  const name = cleanText(raw.name);
  const mobile = normalizeMobile(raw.mobile);
  const email = cleanText(raw.email);
  const course = cleanText(raw.course);
  const location = cleanText(raw.location);
  const college = cleanText(raw.college);
  const message = cleanText(raw.message, true);
  const submissionId = typeof raw.submissionId === "string" ? raw.submissionId : "";

  if (name.length < 2) {
    errors.name = "Enter your name (at least 2 characters).";
  } else if (name.length > LIMITS.name) {
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;
  }

  if (!MOBILE_PATTERN.test(mobile)) {
    errors.mobile = "Enter a 10-digit mobile number starting with 6, 7, 8 or 9.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address, like name@example.com.";
  } else if (email.length > LIMITS.email) {
    errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
  }

  if (!courses.some((item) => item.name === course)) {
    errors.course = "Choose a preferred course.";
  }

  if (!collegeLocations.some((item) => item === location)) {
    errors.location = "Choose a preferred location.";
  }

  if (college.length > LIMITS.college) {
    errors.college = `College name must be ${LIMITS.college} characters or fewer.`;
  }

  if (message.length > LIMITS.message) {
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
  }

  if (raw.consent !== true) {
    errors.consent = "Tick the box to agree before sending your enquiry.";
  }

  if (!UUID_PATTERN.test(submissionId)) {
    errors.website = "Something went wrong. Refresh the page and try again.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { submissionId, name, mobile, email, course, location, college, message },
  };
}
