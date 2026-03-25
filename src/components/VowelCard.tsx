import { useState } from "react";
import { cn } from "@/lib/utils";
import { colorMap } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { type VowelData } from "@/data/vowels";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

interface VowelCardProps {
  vowel: VowelData;
  isActive: boolean;
  onClick: () => void;
}

export function VowelCard({ vowel, isActive, onClick }: VowelCardProps) {
  const [mode, setMode] = useState<"short" | "long">("short");
  const { isMobile } = useBreakpoint();
  const d = mode === "short" ? vowel.short : vowel.long;
  const vc = colorMap[vowel.colorKey] || colorMap.gold;
  return (
    <div onClick={onClick} className={cn(
      "rounded-xl cursor-pointer transition-all relative overflow-hidden border-2",
      isMobile ? "p-3.5" : "p-4",
      isActive ? cn("bg-muted/80 -translate-y-0.5 shadow-lg", vc.border) : "bg-card border-border"
    )}>
      <div className={cn("absolute -right-1.5 -top-2.5 text-[86px] font-serif font-bold opacity-[0.06] select-none pointer-events-none", vc.text)}>{vowel.letter}</div>
      <div className="flex items-center gap-2 mb-2.5">
        <span className={cn("font-serif font-bold leading-none", vc.text, isMobile ? "text-[30px]" : "text-4xl")}>{vowel.letter}</span>
        <span className={cn("font-mono text-[11px] px-2 py-0.5 rounded-md", vc.text, vc.bg)}>{d.ipa}</span>
        <div className="ml-auto"><SpeakBtn word={d.word} /></div>
      </div>
      <div className="flex gap-1.5 mb-2.5">
        {(["short", "long"] as const).map(m => (
          <button key={m} onClick={e => { e.stopPropagation(); setMode(m); }}
            className={cn(
              "px-3 py-0.5 rounded-full border-none text-[10px] font-bold tracking-wider uppercase cursor-pointer font-mono transition-all",
              mode === m ? cn("text-white", vowel.colorKey === "gold" ? "bg-amber-600" : vowel.colorKey === "teal" ? "bg-teal-600" : vowel.colorKey === "sky" ? "bg-sky-600" : vowel.colorKey === "sage" ? "bg-emerald-600" : vowel.colorKey === "lavender" ? "bg-violet-600" : "bg-amber-600") : "bg-muted text-muted-foreground"
            )}>{m}</button>
        ))}
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed font-serif italic mb-3">{d.hint}</p>
      <div className="bg-muted rounded-lg px-3 py-2 flex justify-between items-center gap-1.5 flex-wrap">
        <span className="font-serif text-[19px] text-foreground font-semibold">{d.word}</span>
        <span className="text-[11px] text-muted-foreground font-mono">= {d.meaning}</span>
        <span className="font-mono text-[11px] text-muted-foreground/50">"{d.pron}"</span>
      </div>
    </div>
  );
}
