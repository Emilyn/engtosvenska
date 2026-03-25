import { useState } from "react";
import { cn } from "@/lib/utils";
import { speak } from "@/lib/speech";

interface SpeakBtnProps {
  word: string;
  small?: boolean;
}

export function SpeakBtn({ word, small }: SpeakBtnProps) {
  const [on, setOn] = useState(false);
  const [slowOn, setSlowOn] = useState(false);
  const btnBase = cn(
    "shrink-0 rounded-lg cursor-pointer text-[13px] transition-all inline-flex items-center justify-center min-w-[32px] border",
    small ? "px-2.5 py-1" : "px-3.5 py-1.5",
  );
  return (
    <span className="inline-flex gap-1">
      <button
        onClick={e => { e.stopPropagation(); setOn(true); speak(word); setTimeout(() => setOn(false), 1400); }}
        className={cn(btnBase,
          on
            ? "bg-amber-600 border-amber-600 text-white"
            : "bg-transparent border-border text-muted-foreground hover:border-amber-700/50 hover:text-amber-400/80"
        )}
      >
        {on ? "▶" : "♪"}
      </button>
      <button
        title="Play slowly"
        onClick={e => { e.stopPropagation(); setSlowOn(true); speak(word, { slow: true }); setTimeout(() => setSlowOn(false), 2400); }}
        className={cn(btnBase,
          slowOn
            ? "bg-sky-600 border-sky-600 text-white"
            : "bg-transparent border-border text-muted-foreground hover:border-sky-600/50 hover:text-sky-400/80"
        )}
      >
        {slowOn ? "▶" : "🐢"}
      </button>
    </span>
  );
}
