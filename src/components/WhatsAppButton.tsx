import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl("Hello, I would like to know more about your services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-10 rounded-full items-center justify-center  text-white shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 boarder-mint square-full bg-mint"
    >
      <Image src="/whatsapp.png" alt="WhatsApp" width={50} height={50} aria-hidden="true" />
    </a>
  );
}
