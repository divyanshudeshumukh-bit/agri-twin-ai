import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, User, Leaf } from "lucide-react";
import { useFarm } from "@/lib/farm-context";

export const Route = createFileRoute("/_app/chat")({
  head: () => ({ meta: [{ title: "AI Assistant · AgriTwin AI" }] }),
  component: Chat,
});

interface Msg { role: "user" | "assistant"; text: string }

const suggestions = [
  "Why should I water today?",
  "What fertilizer should I use?",
  "Why is this plant unhealthy?",
  "When will harvest be ready?",
  "How can I improve yield?",
];

function replyFor(q: string, scenarioKey: string): string {
  const dry = scenarioKey === "dry";
  const disease = scenarioKey === "disease";
  if (/water/i.test(q))
    return dry
      ? "Soil moisture is at 22% in the west quadrant — well below the 45% target. I recommend a 45-minute drip cycle in the next 3 hours."
      : "Moisture is healthy at 68%. You can safely skip today; next optimal window is tomorrow at 6:00 AM.";
  if (/fertilizer/i.test(q))
    return disease
      ? "Given the fungal outbreak, apply potassium silicate this evening — it strengthens cell walls and reduces spread."
      : "Your NPK profile looks balanced. Consider a light foliar potassium spray (0.5%) next week to support flowering.";
  if (/unhealthy|disease/i.test(q))
    return disease
      ? "Zone NE shows Blight symptoms: dark lesions + high humidity (84%). Deploy a copper-based spray tonight and isolate affected rows."
      : "Most plants are healthy (94%). The 42 flagged plants show minor nutrient stress — check pH in row 7.";
  if (/harvest/i.test(q))
    return `Predicted harvest window: ${dry ? "32-36 days" : disease ? "38-42 days" : "22-26 days"} based on current growth rate.`;
  if (/yield/i.test(q))
    return "Top three yield levers right now: (1) irrigation timing to sunrise, (2) NPK top-up on rows 3-5, (3) trellis adjustment for canopy exposure.";
  return "Great question. Based on your live twin telemetry, I'd recommend monitoring for the next 24h and re-checking sensor deltas.";
}

function Chat() {
  const { scenarioKey } = useFarm();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi 👋 I'm your AgriTwin AI assistant. Ask me anything about your farm." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: replyFor(text, scenarioKey) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-9rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="text-muted-foreground text-sm">Powered by Fireworks AI · Llama 3 70B</p>
      </div>

      <div ref={scrollRef} className="glass rounded-2xl flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`h-8 w-8 shrink-0 rounded-xl grid place-items-center ${
              m.role === "user" ? "bg-primary/10 text-primary" : "gradient-primary text-primary-foreground shadow-glow"
            }`}>
              {m.role === "user" ? <User className="h-4 w-4" /> : <Leaf className="h-4 w-4" />}
            </div>
            <div className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm ${
              m.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-background/70 border border-border/50"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-xl gradient-primary grid place-items-center">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="rounded-2xl px-4 py-3 bg-background/70 border border-border/50 flex gap-1">
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="glass rounded-full px-3 py-1.5 text-xs hover:bg-accent transition-colors inline-flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3 text-primary" /> {s}
          </button>
        ))}
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about irrigation, disease, harvest..."
          className="rounded-xl h-12 bg-background/70"
        />
        <Button type="submit" className="rounded-xl h-12 px-5 gradient-primary text-primary-foreground shadow-glow">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
