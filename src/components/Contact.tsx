import { ExternalLink, MessageCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const notSet = "To be added";

export default function Contact() {
  const { phone, email, address, whatsappNumber, socialLinks } = siteConfig;
  const valueClass = "mt-1 block font-display text-2xl font-bold text-white";

  return (
    <section id="contact" className="on-dark bg-cobalt-deep py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <SectionHeading
          tone="dark"
          title="Talk to us"
          description="Call, email or message us. We will help you work out the next step."
        />

        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <dt className="text-white/80">Phone</dt>
            <dd>
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className={`${valueClass} hover:underline`}>
                  {phone}
                </a>
              ) : (
                <span className={`${valueClass} text-white/70`}>{notSet}</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-white/80">Email</dt>
            <dd>
              {email ? (
                <a href={`mailto:${email}`} className={`${valueClass} break-all hover:underline`}>
                  {email}
                </a>
              ) : (
                <span className={`${valueClass} text-white/70`}>{notSet}</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-white/80">Address</dt>
            <dd className={`${valueClass} ${address ? "" : "text-white/70"}`}>
              {address || notSet}
            </dd>
          </div>

          <div>
            <dt className="text-white/80">WhatsApp</dt>
            <dd>
              <span className={`${valueClass} ${whatsappNumber ? "" : "text-white/70"}`}>
                {whatsappNumber ? `+${whatsappNumber}` : notSet}
              </span>
              <a
                href={buildWhatsAppUrl("Hello, I would like to know more about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light mt-3"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </dd>
          </div>

          {socialLinks.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="text-white/80">Follow us</dt>
              <dd className="mt-2 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border-2 border-white/60 px-4 font-semibold text-white transition-colors hover:bg-white hover:text-cobalt-deep"
                  >
                    {link.label}
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
