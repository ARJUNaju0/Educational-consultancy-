import { NextResponse } from "next/server";
import { saveEnquiry } from "@/lib/appsScript";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { validateEnquiry } from "@/lib/validation";

const MAX_BODY_CHARS = 10_000;

function fail(status: number, message: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, message, ...extra }, { status });
}

export async function POST(request: Request) {
  // 1. Abuse limit
  if (isRateLimited(getClientIp(request))) {
    return fail(429, "Too many requests. Please try again later.");
  }

  // 2. Read the body safely
  const bodyText = await request.text();
  if (bodyText.length > MAX_BODY_CHARS) {
    return fail(413, "Request is too large.");
  }

  let body: unknown;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return fail(400, "Invalid request.");
  }

  // 3. Honeypot: bots fill the hidden field. Pretend it worked, save nothing.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as { website?: unknown }).website === "string" &&
    (body as { website: string }).website.trim() !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  // 4. Never trust the browser: validate everything again
  const result = validateEnquiry(body);
  if (!result.ok) {
    return fail(400, "Please check the form fields.", { errors: result.errors });
  }

  // 5. Save to Google Sheets and send the email, through Apps Script
  const saved = await saveEnquiry(result.data);
  if (!saved) {
    return fail(502, "We could not save your enquiry. Please try again.");
  }

  return NextResponse.json({ ok: true });
}
