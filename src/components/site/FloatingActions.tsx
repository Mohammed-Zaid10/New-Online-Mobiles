import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone, Bot, Plus, X } from "lucide-react";
import { SHOP, wa } from "@/lib/shop";
import { ChatBot } from "./ChatBot";

export function FloatingActions() {
  const [top, setTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex items-center justify-center">
        {/* Back to top button (kept separate from radial menu, placed above) */}
        <div
          className={`absolute transition-all duration-300 ${
            top ? "translate-y-[-70px] opacity-100" : "translate-y-0 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-luxe hover:opacity-90"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        {/* Radial Menu Items */}
        <div className="relative">
          {/* AI Chat Button */}
          <button
            onClick={() => {
              setIsChatOpen(true);
              setIsOpen(false);
            }}
            className={`absolute grid h-12 w-12 place-items-center rounded-full bg-violet-600 text-white shadow-luxe transition-all duration-300 hover:scale-110 ${
              isOpen ? "-translate-y-[130px] opacity-100 scale-100" : "translate-y-0 opacity-0 scale-50 pointer-events-none"
            }`}
            aria-label="AI Assistant"
            style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
          >
            <Bot className="h-6 w-6" />
          </button>

          {/* Call Button */}
          <a
            href={`tel:${SHOP.phone}`}
            className={`absolute grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-luxe transition-all duration-300 hover:scale-110 ${
              isOpen ? "-translate-x-[70px] -translate-y-[100px] opacity-100 scale-100" : "translate-x-0 translate-y-0 opacity-0 scale-50 pointer-events-none"
            }`}
            aria-label="Call the shop"
            style={{ transitionDelay: isOpen ? "50ms" : "50ms" }}
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* WhatsApp Button */}
          <a
            href={wa("Hi Online Mobiles! I'd like to know more.")}
            target="_blank"
            rel="noreferrer"
            className={`absolute grid h-12 w-12 place-items-center rounded-full bg-success text-white shadow-luxe transition-all duration-300 hover:scale-110 ${
              isOpen ? "-translate-x-[110px] -translate-y-[40px] opacity-100 scale-100" : "translate-x-0 translate-y-0 opacity-0 scale-50 pointer-events-none"
            }`}
            aria-label="Chat on WhatsApp"
            style={{ transitionDelay: isOpen ? "0ms" : "100ms" }}
          >
            <MessageCircle className="h-6 w-6" />
          </a>

          {/* Main Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-10 grid h-14 w-14 place-items-center rounded-full shadow-luxe transition-all duration-300 hover:scale-105 ${
              isOpen ? "bg-destructive text-white rotate-45" : "bg-primary text-primary-foreground"
            }`}
            aria-label="Toggle menu"
          >
            <Plus className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* AI Chat Bot Overlay */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
