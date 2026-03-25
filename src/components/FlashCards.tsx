import { useState } from "react";
import { cn } from "@/lib/utils";
import { C, colorMap } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { DECKS } from "@/data/flashcards";
import { Button } from "@/components/ui/button";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

export function FlashCards() {
  const { isMobile } = useBreakpoint();
  const [deckId, setDeckId]     = useState<string | null>(null);
  const [cardIdx, setCardIdx]   = useState(0);
  const [flipped, setFlipped]   = useState(false);
  const [known, setKnown]       = useState<Record<string, boolean>>({});
  const [sessionDone, setSessionDone] = useState(false);

  const deck = DECKS.find(d => d.id === deckId);
  const cards = deck ? deck.cards : [];
  const card  = cards[cardIdx] || null;
  const cardKey = deck ? `${deck.id}-${cardIdx}` : null;
  const dc = deck ? colorMap[deck.colorKey] || colorMap.gold : colorMap.gold;

  const knownCount   = Object.values(known).filter(Boolean).length;
  const unknownCount = Object.values(known).filter(v => !v).length;

  function startDeck(id: string) {
    setDeckId(id); setCardIdx(0); setFlipped(false);
    setKnown({}); setSessionDone(false);
  }

  function handleFlip() { setFlipped(f => !f); }

  function handleAnswer(wasKnown: boolean) {
    if (!cardKey) return;
    setKnown(prev => ({ ...prev, [cardKey]: wasKnown }));
    const next = cardIdx + 1;
    if (next >= cards.length) { setSessionDone(true); }
    else { setCardIdx(next); setFlipped(false); }
  }

  function restart() {
    setCardIdx(0); setFlipped(false);
    setKnown({}); setSessionDone(false);
  }

  function reviewMissed() {
    if (!deck) return;
    const missed = cards.filter((_, i) => known[`${deck.id}-${i}`] === false);
    if (!missed.length) return;
    setKnown({}); setCardIdx(0); setFlipped(false); setSessionDone(false);
  }

  // ── Deck picker ──
  if (!deckId) return (
    <div>
      <div className="text-center mb-7">
        <h2 className="font-serif text-[22px] text-foreground mb-1.5">Flashcard Decks</h2>
        <p className="text-muted-foreground font-serif italic text-[13px]">Pick a deck to practise</p>
      </div>
      <div className={cn("grid gap-3", isMobile ? "grid-cols-2" : "grid-cols-3")}>
        {DECKS.map(d => {
          const c = colorMap[d.colorKey] || colorMap.gold;
          return (
            <button key={d.id} onClick={() => startDeck(d.id)}
              className={cn("bg-card border-2 rounded-xl p-5 cursor-pointer text-left transition-all flex flex-col gap-2.5 hover:shadow-md", c.border, "hover:border-current")}>
              <span className="text-[28px]">{d.emoji}</span>
              <div>
                <div className={cn("font-serif text-base mb-0.5", c.text)}>{d.label}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{d.cards.length} cards</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // ── Session complete ──
  if (sessionDone && deck) {
    const pct = Math.round((knownCount / cards.length) * 100);
    const missedCards = cards.filter((_, i) => known[`${deck.id}-${i}`] === false);
    return (
      <div className="max-w-[480px] mx-auto text-center">
        <div className="text-[52px] mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
        <h2 className="font-serif text-[26px] text-foreground mb-1.5">Session Complete!</h2>
        <p className="text-muted-foreground font-serif italic mb-6">{deck.label} · {cards.length} cards</p>

        <div className="flex justify-center gap-5 mb-7">
          {[{label:"Knew it", count:knownCount, text:C.sage, bg:C.sageBg, border:C.sageBorder},{label:"Review", count:unknownCount, text:C.rose, bg:C.roseBg, border:C.roseBorder}].map(s => (
            <div key={s.label} className={cn("rounded-xl px-6 py-4 text-center border", s.bg, s.border)}>
              <div className={cn("font-serif text-[34px] font-bold", s.text)}>{s.count}</div>
              <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {missedCards.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left">
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-2.5">To review</div>
            {missedCards.map(c => (
              <div key={c.sv} className="flex justify-between py-1.5 border-b border-border items-center gap-2">
                <div className="flex gap-2 items-center">
                  <SpeakBtn word={c.sv} small />
                  <span className={cn("font-serif text-base", C.rose)}>{c.sv}</span>
                </div>
                <span className="text-muted-foreground text-[13px]">{c.en}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2.5 justify-center flex-wrap">
          {missedCards.length > 0 && (
            <Button variant="outline" onClick={reviewMissed} className={cn("font-mono text-xs", C.rose, C.roseBorder)}>
              Review {missedCards.length} missed
            </Button>
          )}
          <Button variant="outline" onClick={restart} className={cn("font-mono text-xs", C.gold, C.goldBorder)}>
            Restart deck
          </Button>
          <Button variant="ghost" onClick={() => setDeckId(null)} className="font-mono text-xs text-muted-foreground">
            All decks
          </Button>
        </div>
      </div>
    );
  }

  // ── Active card ──
  if (!card) return null;
  const progress = cards.length > 0 ? ((cardIdx) / cards.length) * 100 : 0;

  return (
    <div className="max-w-[520px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setDeckId(null)} className="font-mono text-[11px] text-muted-foreground">
          ← Decks
        </Button>
        <div className="flex-1">
          <div className="flex justify-between mb-1.5">
            <span className={cn("font-mono text-[11px]", dc.text)}>{deck?.emoji} {deck?.label}</span>
            <span className="font-mono text-[11px] text-muted-foreground">{cardIdx + 1} / {cards.length}</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-[width] duration-300 ease-out bg-primary" style={{ width:`${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Session mini stats */}
      <div className="flex gap-2 mb-4">
        {[{label:"✓ Knew it", count:knownCount, text:C.sage},{label:"✗ Review", count:unknownCount, text:C.rose}].map(s => (
          <div key={s.label} className="flex-1 bg-muted/50 rounded-lg px-3 py-1.5 flex justify-between items-center">
            <span className="font-mono text-[10px] text-muted-foreground">{s.label}</span>
            <span className={cn("font-serif text-lg font-bold", s.text)}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Card */}
      <div
        onClick={handleFlip}
        className={cn(
          "rounded-2xl cursor-pointer text-center min-h-[220px] flex flex-col items-center justify-center transition-all relative overflow-hidden select-none border-2",
          isMobile ? "px-6 py-10" : "px-9 py-13",
          flipped ? "bg-muted/80 border-primary shadow-lg" : "bg-card border-border"
        )}>
        <div className="absolute inset-0 flex items-center justify-center text-[130px] opacity-[0.04] font-serif font-bold text-muted-foreground pointer-events-none">
          {flipped ? "EN" : "SV"}
        </div>

        {!flipped ? (
          <>
            <div className={cn("font-mono text-[10px] tracking-[0.15em] uppercase mb-4", dc.text)}>Swedish</div>
            <div className={cn("font-serif font-bold mb-3.5 leading-tight text-foreground", isMobile ? "text-[28px]" : "text-4xl")}>{card.sv}</div>
            <SpeakBtn word={card.sv} />
            <div className="mt-4 font-mono text-[11px] text-muted-foreground">tap to reveal →</div>
          </>
        ) : (
          <>
            <div className={cn("font-mono text-[10px] tracking-[0.15em] uppercase mb-3", C.gold)}>English</div>
            <div className={cn("font-serif font-semibold mb-2.5", C.gold, isMobile ? "text-[22px]" : "text-[28px]")}>{card.en}</div>
            <div className={cn("font-serif text-muted-foreground mb-3.5", isMobile ? "text-base" : "text-xl")}>{card.sv}</div>
            <SpeakBtn word={card.sv} />
          </>
        )}
      </div>

      {/* Answer buttons */}
      {flipped ? (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline" onClick={() => handleAnswer(false)} className={cn("py-3.5 rounded-xl font-mono text-[13px] font-bold", C.rose, C.roseBorder, C.roseBg)}>
            ✗ Review again
          </Button>
          <Button variant="outline" onClick={() => handleAnswer(true)} className={cn("py-3.5 rounded-xl font-mono text-[13px] font-bold", C.sage, C.sageBorder, C.sageBg)}>
            ✓ Got it!
          </Button>
        </div>
      ) : (
        <div className="flex gap-2.5 mt-4 justify-center">
          <Button variant="outline" onClick={handleFlip} className={cn("font-mono text-xs font-semibold", dc.text, dc.border, dc.bg)}>
            Flip card
          </Button>
        </div>
      )}

      <p className="text-center mt-3 text-muted-foreground/60 font-mono text-[10px]">
        tap the card or press the button to flip
      </p>
    </div>
  );
}
