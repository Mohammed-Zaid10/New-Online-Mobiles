import { useState, useRef, useEffect } from "react";
import { Send, User, X, Loader2, Sparkles } from "lucide-react";
import { chatWithGemini } from "@/lib/gemini";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = { role: "user" | "model"; text: string };

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hi there! I'm the AI assistant for Online Mobiles. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message immediately
    const newMessages: Message[] = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Format history for the Gemini API
      const history = messages
        .filter(m => m.role === "model" || m.role === "user")
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      const res = await chatWithGemini({ data: { message: userMessage, history } });
      
      setMessages(prev => [...prev, { role: "model", text: res.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", text: "Sorry, I am having trouble connecting to the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[350px] max-h-[75vh] flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl transition-all animate-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#5D4037] p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#5D4037] shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold leading-none text-white">Meta AI Assistant</h3>
            <p className="mt-1 text-[11px] text-white/80">Online Mobiles Expert</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors" aria-label="Close Chat">
          <X className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex h-[400px] flex-col overflow-y-auto p-4 bg-background/50 backdrop-blur-sm">
        <div className="flex-1 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
              {m.role === "model" && (
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#5D4037]/10 text-[#5D4037]">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card border border-border/70 rounded-tl-sm"
                }`}
              >
                {/* Basic formatting for bold text if gemini returns it */}
                {m.text.split("**").map((part, index) => 
                  index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                )}
              </div>
              {m.role === "user" && (
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start gap-2">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#5D4037]/10 text-[#5D4037]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex items-center rounded-2xl rounded-tl-sm bg-card border border-border/70 p-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-border/70 bg-card p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a phone..."
            className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
