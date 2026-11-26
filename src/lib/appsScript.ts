import "server-only";
import type { CleanEnquiry } from "./validation";

const TIMEOUT_MS = 20_000;

export async function saveEnquiry(data: CleanEnquiry): Promise<boolean> {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;

  if (!url || !secret) {
    console.error("Google Apps Script environment variables are missing.");
    return false;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        ...data,
        secret,
      }),
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
    });

    const responseText = await response.text();

    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      console.error("Apps Script returned a non-JSON response.");
      return false;
    }

    if (!response.ok) {
      console.error("Apps Script HTTP error:", response.status);
      return false;
    }

    if (result?.ok !== true) {
      console.error(
        "Apps Script reported an error:",
        String(result?.error ?? "Unknown error")
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "Apps Script request failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return false;
  } finally {
    clearTimeout(timer);
  }
}