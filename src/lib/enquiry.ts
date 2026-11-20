import type { EnquiryErrors, EnquiryFormValues } from "./validation";

// Browser-side helper that sends the enquiry to our own API route.
// The API route then talks to Google Apps Script, so the Apps Script URL
// and secret never reach the browser.

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; errors?: EnquiryErrors };

const WHATSAPP_HINT = "You can also message us on WhatsApp.";

export async function submitEnquiry(
  values: EnquiryFormValues,
  submissionId: string,
): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, submissionId }),
    });
    const data = await response.json().catch(() => null);

    if (response.ok && data?.ok === true) {
      return { ok: true };
    }

    if (response.status === 400 && data?.errors) {
      return {
        ok: false,
        message: "Check the highlighted fields and send again.",
        errors: data.errors,
      };
    }

    if (response.status === 429) {
      return {
        ok: false,
        message: `Too many enquiries from this connection. Wait a few minutes and try again. ${WHATSAPP_HINT}`,
      };
    }

    return {
      ok: false,
      message: `We could not send your enquiry. Try again in a moment. ${WHATSAPP_HINT}`,
    };
  } catch {
    return {
      ok: false,
      message: `Could not reach the server. Check your internet connection and try again. ${WHATSAPP_HINT}`,
    };
  }
}
