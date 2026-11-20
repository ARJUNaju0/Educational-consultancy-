import { siteConfig } from "@/data/site";

/**
 * Builds a WhatsApp click-to-chat link with an optional prefilled message.
 * If no number is configured yet, WhatsApp still opens with the message ready
 * to send to a contact of the student's choice.
 */
export function buildWhatsAppUrl(message?: string): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
