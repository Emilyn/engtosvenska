import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { SpeakBtn } from "@/components/shared/SpeakBtn";
import soundsData from "@/data/content/consonants.json";

const colorMap: Record<string, { tc: string; bg: string; bc: string }> = {
  teal:     { tc: C.teal,     bg: C.tealBg,     bc: C.tealBorder },
  gold:     { tc: C.gold,     bg: C.goldBg,     bc: C.goldBorder },
  sky:      { tc: C.sky,      bg: C.skyBg,      bc: C.skyBorder },
  rose:     { tc: C.rose,     bg: C.roseBg,     bc: C.roseBorder },
  sage:     { tc: C.sage,     bg: C.sageBg,     bc: C.sageBorder },
  lavender: { tc: C.lavender, bg: C.lavenderBg, bc: C.lavenderBorder },
};

const sounds = soundsData.map(s => ({ ...s, ...colorMap[s.colorKey] }));

export function Consonants() {
  return (
    <div>
      <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>Swedish consonants are generally consistent — but a few combinations create sounds that don't exist in English. These are the ones worth focusing on.</RuleBox>
      {sounds.map(s => (
        <Section key={s.sound} title={s.sound}>
          <RuleBox colorClass={s.tc} bgClass={s.bg} borderClass={s.bc}>{s.desc}</RuleBox>
          <div className="grid grid-cols-2 gap-2">
            {s.words.map(([sv, en, pron]) => (
              <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5">
                <div className="flex gap-2 items-center mb-1">
                  <SpeakBtn word={sv} small />
                  <span className={cn("font-serif text-[17px]", s.tc)}>{sv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">{en}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/50">"{pron}"</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
