import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone, Sparkles } from "lucide-react";
import { SHOP, wa } from "@/lib/shop";
import { ChatBot } from "./ChatBot";

export function FloatingActions() {
  const [top, setTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-4">
        {/* Back to top button */}
        <div
          className={`transition-all duration-300 ${
            top ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-luxe hover:opacity-90"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Widget Pill */}
        <div className="flex flex-col items-center gap-3 rounded-full border border-border/40 bg-card/80 p-2.5 shadow-luxe backdrop-blur-md">
          {/* AI Chat Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="grid h-12 w-12 place-items-center rounded-full bg-[#5D4037] text-white shadow-sm hover:scale-105 transition-transform"
            aria-label="Meta AI Assistant"
            title="Meta AI Assistant"
          >
            <Sparkles className="h-6 w-6" />
          </button>

          {/* Call Button */}
          <a
            href={`tel:${SHOP.phone}`}
            className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-sm hover:scale-105 transition-transform"
            aria-label="Call the shop"
            title="Call Us"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* WhatsApp Button */}
          <a
            href={wa("Hi Online Mobiles! I'd like to know more.")}
            target="_blank"
            rel="noreferrer"
            className="grid h-12 w-12 place-items-center rounded-full bg-success text-white shadow-sm hover:scale-105 transition-transform"
            aria-label="Chat on WhatsApp"
            title="WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* AI Chat Bot Overlay */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
