import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl("Hello, I would like to know more about your services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-green-700 text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
    >
      <MessageCircle size={28} aria-hidden="true" />
    </a>
  );
}
