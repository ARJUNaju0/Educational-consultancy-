import "server-only";
import type { CleanEnquiry } from "./validation";

// Sends a validated enquiry to the Google Apps Script Web App.
// Apps Script saves it to Google Sheets and sends the email notification.
// This file only runs on the server, so the URL and secret stay private.

const TIMEOUT_MS = 20_000;

export async function saveEnquiry(data: CleanEnquiry): Promise<boolean> {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!url) {
    console.error("GOOGLE_APPS_SCRIPT_URL is not set.");
    return false;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      // text/plain avoids a CORS preflight; Apps Script reads the raw body
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...data, secret: process.env.APPS_SCRIPT_SECRET ?? "" }),
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`Apps Script responded with HTTP ${response.status}.`);
      return false;
    }

    const result = await response.json();
    if (result?.ok !== true) {
      console.error(`Apps Script reported an error: ${String(result?.error ?? "unknown")}`);
      return false;
    }
    return true;
  } catch (error) {
    // Log the reason only, never the student's details
    console.error("Apps Script request failed:", error instanceof Error ? error.message : error);
    return false;
  } finally {
    clearTimeout(timer);
  }
}
