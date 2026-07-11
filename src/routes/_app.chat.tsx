import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, User, Leaf } from "lucide-react";
import { useFarm } from "@/lib/farm-context";
import type { Scenario } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/chat")({
  head: () => ({ meta: [{ title: "AI Brain · AgriTwin AI" }] }),
  component: Chat,
});

interface Msg { role: "user" | "assistant"; text: string }

const suggestions = [
  "Hi",
  "What can you do?",
  "Summarize today's farm condition",
  "Why should I water today?",
  "Explain soil moisture",
  "What fertilizer should I use?",
  "When will harvest begin?",
  "Generate a farm report",
];

// --- Intent detection (small local NLU) ---

type Intent =
  | "greet" | "howareyou" | "aboutself" | "capabilities" | "thanks" | "bye"
  | "moisture" | "water" | "fertilizer" | "disease" | "harvest" | "weather"
  | "growth" | "yield" | "explain" | "next" | "summary" | "report" | "nonfarm" | "generic";

function detectIntent(q: string, memory: Msg[]): Intent {
  const t = q.trim().toLowerCase();
  if (!t) return "generic";
  if (/^(hi|hello|hey|yo|hola|good\s?(morning|afternoon|evening))\b/.test(t)) return "greet";
  if (/how\s+are\s+you|how'?s\s+it\s+going|how\s+r\s+u/.test(t)) return "howareyou";
  if (/(about\s+yourself|who\s+are\s+you|tell\s+me\s+about\s+you)/.test(t)) return "aboutself";
  if (/(what\s+can\s+you\s+do|capabilities|help\s+me|features)/.test(t)) return "capabilities";
  if (/(thanks|thank\s+you|thx|appreciate)/.test(t)) return "thanks";
  if (/(bye|goodbye|see\s+you|cya)/.test(t)) return "bye";
  if (/(summar(y|ize)|today'?s\s+(farm|condition)|overview)/.test(t)) return "summary";
  if (/(report|pdf|export)/.test(t)) return "report";
  if (/(soil\s*moisture|moisture)/.test(t)) return "moisture";
  if (/(water|irriga|watering)/.test(t)) return "water";
  if (/(fertili[sz]er|npk|nitrogen|phosphorus|potassium|nutri)/.test(t)) return "fertilizer";
  if (/(disease|blight|mildew|rust|unhealthy|sick|pest)/.test(t)) return "disease";
  if (/(harvest|ready|yield)/.test(t)) return "harvest";
  if (/(weather|rain|temperature|humidity|wind)/.test(t)) return "weather";
  if (/(growth|grow)/.test(t)) return "growth";
  if (/(explain|why|reason)/.test(t)) return "explain";
  if (/(what\s+should\s+i\s+do|next\s+step|action)/.test(t)) return "next";
  // detect non-farming topic (sports, jokes, politics, code, math)
  if (/(joke|movie|football|cricket|politic|python|javascript|math|weather in [a-z])/.test(t)) return "nonfarm";
  // Fall through: use recent memory to disambiguate follow-ups
  const last = memory.filter(m => m.role === "assistant").slice(-1)[0]?.text.toLowerCase() ?? "";
  if (/moisture/.test(last)) return "moisture";
  if (/fertilizer/.test(last)) return "fertilizer";
  return "generic";
}

function reply(intent: Intent, q: string, s: Scenario, memory: Msg[]): string {
  const sn = s.sensors;
  const f = s.farm;
  const name = s.name;
  const userTurns = memory.filter(m => m.role === "user").length;
  const firstTime = userTurns <= 1;

  switch (intent) {
    case "greet":
      return `${firstTime ? "Hello! " : "Hey again! "}I'm **AgriTwin AI**, developed by **Team Tech Wizards**. I can help monitor crop health, recommend irrigation and fertilizer schedules, explain disease risks, and answer farming-related questions. Right now I'm watching over your **${name}** in real time.`;
    case "howareyou":
      return `I'm running smoothly. More importantly, your farm is at **${s.healthScore}/100** health — ${s.description.toLowerCase()}.`;
    case "aboutself":
      return "I'm **AgriTwin AI** — an agriculture-focused assistant built by **Team Tech Wizards**. I combine live sensor telemetry with plant physiology and weather models to give grounded recommendations for your farm.";
    case "capabilities":
      return [
        "Here's what I can help you with:",
        "• Explain any sensor value (moisture, pH, NPK, humidity…)",
        "• Diagnose plant disease and suggest treatment",
        "• Recommend irrigation and fertilizer schedules",
        "• Predict harvest timing and yield",
        "• Interpret weather impact on your crop",
        "• Generate a full farm report",
        "• Answer 'what should I do next?' with a prioritized action list",
      ].join("\n");
    case "thanks":
      return "Anytime 🌾. I'll keep the twin humming — just ask if anything else comes up.";
    case "bye":
      return "Take care! I'll keep monitoring the farm in the background.";
    case "moisture":
      return `Soil moisture is currently **${sn.soilMoisture}%**. ${sn.soilMoisture < 30 ? "That's below the 45% comfort band — the crop is water-stressed and I recommend irrigating within the next 3 hours." : sn.soilMoisture > 75 ? "That's above optimal — hold off on irrigation to avoid root rot and encourage deeper roots." : "That's inside the healthy 55–75% band, so no immediate irrigation needed."}`;
    case "water":
      return s.key === "dry"
        ? `Your west quadrant is at ${sn.soilMoisture}% — well below target. Run a **45-minute drip cycle** in the next 3 hours delivering roughly **4.5 L per plant**. Skip east rows.`
        : s.key === "disease"
        ? `Given the fungal pressure and ${sn.humidity}% humidity, **reduce irrigation ~20%** and shift watering to early morning to let the canopy dry out.`
        : `Moisture is healthy at ${sn.soilMoisture}%. You can safely skip today; the next optimal window is **tomorrow around 06:00**.`;
    case "fertilizer":
      return s.key === "disease"
        ? `Apply **potassium silicate** this evening — it strengthens cell walls and slows fungal spread. Delay nitrogen for 5 days.`
        : s.key === "dry"
        ? `Hold fertilizer until moisture recovers to avoid root burn. In ~48h, resume with **NPK 10-10-10** at half rate.`
        : `Your NPK profile (N ${sn.nitrogen} · P ${sn.phosphorus} · K ${sn.potassium}) is balanced. A light foliar potassium spray (0.5%) next week will support flowering.`;
    case "disease":
      return s.key === "disease"
        ? `NE quadrant shows **Late Blight** — dark expanding lesions with 84% humidity. ${s.disease.confirmed} plants confirmed, ${s.disease.suspected} suspected. Apply **copper hydroxide tonight**, isolate the rows, and remove infected leaves into sealed bags.`
        : `Most plants (${f.healthy}) are healthy. Only ${f.diseased} confirmed cases. Continue weekly scouting and keep humidity below 70%.`;
    case "harvest":
      return `Predicted harvest in **~${sn.harvestDays} days** (crop age vs growth curve). Current growth index: ${sn.growth}%.`;
    case "weather":
      return `Right now: **${s.weather.temp}°C · ${s.weather.condition}**, humidity ${sn.humidity}%, wind ${sn.windSpeed} km/h, rain probability ${sn.rainProb}%. ${sn.rainProb > 60 ? "Rain expected — pause irrigation." : sn.airTemp > 32 ? "Heat stress risk — consider shade netting." : "Conditions look supportive for growth."}`;
    case "growth":
      return `Growth is tracking at **${sn.growth}%** of the seasonal curve. ${sn.growth < 60 ? "Below baseline — likely water or nutrient limited." : "On or above schedule."}`;
    case "yield":
    case "next":
      return [
        "Top three actions right now:",
        s.key === "dry" ? "1. Irrigate the west quadrant (4.5 L/plant) within 3 hours" : s.key === "disease" ? "1. Apply copper hydroxide to NE quadrant tonight" : "1. Hold irrigation — moisture healthy",
        `2. ${s.key === "disease" ? "Isolate infected rows and prune affected leaves" : "Foliar potassium 0.5% within 7 days"}`,
        `3. Recheck sensors in 6 hours — I'll flag anything drifting`,
      ].join("\n");
    case "explain":
      return "My recommendations combine four inputs: live sensor telemetry, the 30-day weather forecast, a plant-physiology model calibrated to your crop, and historical yield curves. The digital twin weighs each signal and translates the result into plain English.";
    case "summary":
      return [
        `**Today at ${name}**`,
        `• Health score **${s.healthScore}/100** — ${s.description}`,
        `• Plants: ${f.healthy} healthy · ${f.warning} warning · ${f.diseased} diseased`,
        `• Soil moisture ${sn.soilMoisture}% · humidity ${sn.humidity}% · air ${sn.airTemp}°C`,
        `• Weather: ${s.weather.condition}, rain ${sn.rainProb}%`,
        `• Harvest window: ~${sn.harvestDays} days`,
      ].join("\n");
    case "report":
      return `Farm report drafted 📄 — includes health score, sensor readouts, plant distribution, disease breakdown, and prioritized actions. Head to the **Reports** page to print or download.`;
    case "nonfarm":
      return "I'm designed to assist with agriculture, crop monitoring, and smart farming. For unrelated topics, I may have limited information. But happy to help — would you like a farm summary or a specific recommendation?";
    default:
      return "Good question. Based on the current twin telemetry, I'd monitor for the next 24 hours and re-check any sensor whose values drift by more than 10%. Want me to explain a specific reading?";
  }
}

function Chat() {
  const { scenario } = useFarm();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hello! 🌱 I'm **AgriTwin AI**, developed by **Team Tech Wizards**. I can help you monitor crop health, plan irrigation and fertilizer, explain disease risks, and guide you around the platform. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => {
        const memory = [...prev, userMsg];
        const intent = detectIntent(text, memory);
        const answer = reply(intent, text, scenario, memory);
        return [...prev, { role: "assistant", text: answer }];
      });
      setTyping(false);
    }, 650);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-9rem)]">
      <div className="mb-4">
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Assistant</div>
        <h1 className="text-3xl font-bold tracking-tight mt-1">AI Assistant</h1>
        <p className="text-muted-foreground text-sm">Conversational memory · agriculture-tuned · built by Team Tech Wizards</p>
      </div>

      <div ref={scrollRef} className="glass rounded-2xl flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`h-8 w-8 shrink-0 rounded-xl grid place-items-center ${
              m.role === "user" ? "bg-primary/10 text-primary" : "gradient-primary text-primary-foreground shadow-glow"
            }`}>
              {m.role === "user" ? <User className="h-4 w-4" /> : <Leaf className="h-4 w-4" />}
            </div>
            <div className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm whitespace-pre-wrap leading-relaxed ${
              m.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-background/70 border border-border/50"
            }`}
              dangerouslySetInnerHTML={{ __html: formatMd(m.text) }}
            />
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
          placeholder="Ask me anything — greetings, farm advice, or 'what should I do next?'"
          className="rounded-xl h-12 bg-background/70"
        />
        <Button type="submit" className="rounded-xl h-12 px-5 gradient-primary text-primary-foreground shadow-glow">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

// Tiny markdown escape/format for **bold** and newlines
function formatMd(s: string) {
  const esc = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return esc
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}
