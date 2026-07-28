import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { SHOP, wa } from "@/lib/shop";

export function FloatingActions() {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {top && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-luxe hover:opacity-90"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      <a
        href={`tel:${SHOP.phone}`}
        aria-label="Call the shop"
        className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-luxe hover:opacity-90"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={wa("Hi Online Mobiles! I'd like to know more.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-success text-white shadow-luxe hover:opacity-90"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
