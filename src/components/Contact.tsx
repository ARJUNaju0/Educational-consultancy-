import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const phoneNumbers = siteConfig.phone
  .split(",")
  .map((phone) => phone.trim())
  .filter(Boolean);

function formatWhatsAppNumber(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return number.startsWith("+") ? number : `+${number}`;
}

export default function Contact() {
  const { email, whatsappNumber } = siteConfig;

  return (
    <aside className="on-dark bg-cobalt-deep p-6 text-white sm:p-8">
      <h3 className="font-display text-3xl font-bold tracking-tight">
        Let&apos;s talk about your goals
      </h3>
      <p className="mt-3 text-base text-white/80">
        Send us a message and we&apos;ll get back to you shortly.
      </p>

      <ul className="mt-8 space-y-6">
        <li className="flex items-start gap-3">
          <Phone className="mt-0.5 shrink-0 text-mint" size={20} aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="font-semibold text-white">Call Us</h3>
            <ul className="mt-1 space-y-1">
              {phoneNumbers.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="text-white/85 transition-colors hover:text-white hover:underline"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <MessageCircle className="mt-0.5 shrink-0 text-mint" size={20} aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="font-semibold text-white">WhatsApp</h3>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-white/85 transition-colors hover:text-white hover:underline"
            >
              {formatWhatsAppNumber(whatsappNumber)}
            </a>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 shrink-0 text-mint" size={20} aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="font-semibold text-white">Gmail</h3>
            <a
              href={`mailto:${email}`}
              className="mt-1 block break-all text-white/85 transition-colors hover:text-white hover:underline"
            >
              {email}
            </a>
          </div>
        </li>
      </ul>
    </aside>
  );
}
