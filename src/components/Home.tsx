import { cn } from "@/lib/utils";
import { C, colorMap } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { DECKS } from "@/data/flashcards";

interface HomeProps {
  onNavigate: (tab: string) => void;
}

const FEATURES = [
  {
    tab: "flashcards",
    emoji: "🃏",
    label: "Flashcards",
    desc: "Practise vocabulary with spaced repetition across multiple themed decks.",
    colorKey: "gold",
    stat: `${DECKS.reduce((n, d) => n + d.cards.length, 0)} cards · ${DECKS.length} decks`,
  },
  {
    tab: "vowels",
    emoji: "🔤",
    label: "Vowels",
    desc: "Master Swedish vowel sounds — short vs long with IPA, hints and audio.",
    colorKey: "teal",
    stat: "9 vowels · short & long",
  },
  {
    tab: "grammar",
    emoji: "📖",
    label: "Grammar",
    desc: "Nouns, articles, verbs, word order, pronouns and more — all in one place.",
    colorKey: "sky",
    stat: "9 topics",
  },
  {
    tab: "content",
    emoji: "📚",
    label: "More",
    desc: "Common phrases, numbers, days & months, and consonant pronunciation.",
    colorKey: "lavender",
    stat: "4 topics",
  },
];

// Pick a deterministic "word of the day" from greetings deck based on date
const greetingsDeck = DECKS.find(d => d.id === "greetings")!;
const todayIndex = new Date().getDate() % greetingsDeck.cards.length;
const wordOfDay = greetingsDeck.cards[todayIndex];

export function Home({ onNavigate }: HomeProps) {
  const { isMobile } = useBreakpoint();

  return (
    <div className={cn("max-w-240 mx-auto pb-16", isMobile ? "px-4 pt-6" : "px-5 pt-10")}>

      {/* Hero */}
      <div className={cn("mb-8 text-center", isMobile ? "mb-6" : "mb-10")}>
        <div className="inline-block font-mono text-[9px] tracking-[0.18em] uppercase text-muted-foreground border border-border px-3.5 py-0.5 rounded-full mb-3">
          Swedish for English Speakers
        </div>
        <h1 className={cn("font-serif font-bold text-foreground mb-2", isMobile ? "text-[28px]" : "text-[clamp(28px,5vw,48px)]")}>
          Learn Svenska<span className={cn(C.gold)}>.</span>
        </h1>
        <p className="text-muted-foreground font-serif italic text-[14px] max-w-sm mx-auto leading-relaxed">
          Pronunciation, grammar, vocabulary and practice — all in your pocket.
        </p>
      </div>

      {/* Word of the day */}
      <div className={cn("mb-8 rounded-2xl border px-5 py-4 flex items-center gap-4", C.goldBg, C.goldBorder)}>
        <div className="shrink-0 text-3xl">✨</div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Word of the day</div>
          <div className={cn("font-serif text-[22px] font-bold leading-tight", C.gold)}>{wordOfDay.sv}</div>
          <div className="text-muted-foreground text-[13px] font-mono">{wordOfDay.en}</div>
        </div>
        <button
          onClick={() => onNavigate("flashcards")}
          className={cn("shrink-0 font-mono text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors hover:opacity-80", C.gold, C.goldBorder, C.goldBg)}
        >
          Practise →
        </button>
      </div>

      {/* Feature cards */}
      <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-2")}>
        {FEATURES.map(f => {
          const color = colorMap[f.colorKey] || colorMap.gold;
          return (
            <button
              key={f.tab}
              onClick={() => onNavigate(f.tab)}
              className="group text-left rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 border-border"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-3xl">{f.emoji}</span>
                <span className={cn("font-mono text-[10px] px-2 py-0.5 rounded-full border", color.text, color.bg, color.border)}>
                  {f.stat}
                </span>
              </div>
              <div className={cn("font-serif font-bold text-[17px] mb-1", color.text)}>{f.label}</div>
              <div className="text-muted-foreground text-[13px] leading-relaxed">{f.desc}</div>
              <div className={cn("mt-3 font-mono text-[11px] font-semibold transition-all group-hover:gap-2 flex items-center gap-1", color.text)}>
                Open {f.label} <span>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
