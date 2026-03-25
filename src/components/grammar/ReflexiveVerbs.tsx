import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

import reflexData from "@/data/grammar/reflexiveVerbs.json";

const reflexPronouns = reflexData.reflexPronouns as [string, string, string][];
const commonReflexive = reflexData.commonReflexive;

export function ReflexiveVerbs() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="What Are Reflexive Verbs?">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>
          A <strong>reflexive verb</strong> is one where the subject and object are the same person — "I wash <em>myself</em>". In Swedish the reflexive pronoun changes by person. Once you learn the pattern, it applies to dozens of very common verbs.
        </RuleBox>
        <div className="bg-muted/50 rounded-xl p-3.5 mb-4">
          <div className="font-mono text-[11px] text-muted-foreground mb-3">REFLEXIVE PRONOUNS — tvätta sig (to wash oneself)</div>
          {reflexPronouns.map(([subj, refl, ex]) => (
            <div key={subj} className="flex gap-2 py-1.5 border-b border-border items-center flex-wrap">
              <span className={cn("font-serif text-[15px] min-w-[90px] shrink-0", C.teal)}>{subj}</span>
              <span className={cn("font-serif text-[15px] min-w-[30px] shrink-0", C.gold)}>+ {refl}</span>
              <span className="text-muted-foreground text-xs flex-1 font-serif italic">{ex}</span>
              <SpeakBtn word={ex.split(" — ")[1] || ex} small />
            </div>
          ))}
        </div>
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}>
          <strong>Key insight:</strong> <em>sig</em> covers he/she/it/they. Only <em>mig, dig, oss, er</em> change. Memorise just those 4!
        </RuleBox>
      </Section>

      <Section title="Essential Reflexive Verbs">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>
          These are among the most common verbs in everyday Swedish. Many daily routines use reflexive verbs — getting up, getting dressed, feeling something.
        </RuleBox>
        {commonReflexive.map(v => (
          <div key={v.sv} className="bg-muted/50 rounded-lg p-3.5 mb-2">
            <div className="flex gap-2.5 items-center mb-2 flex-wrap">
              <div className="flex gap-2 items-center">
                <SpeakBtn word={v.sv} />
                <span className={cn("font-serif", C.teal, isMobile ? "text-base" : "text-lg")}>{v.sv}</span>
              </div>
              <span className="text-muted-foreground text-[13px] font-serif italic">{v.en}</span>
            </div>
            {v.ex.map(([sv, en]) => (
              <div key={sv} className="flex gap-2 items-center py-1.5 border-t border-border">
                <SpeakBtn word={sv} small />
                <span className="font-serif text-sm text-foreground flex-1">{sv}</span>
                <span className="text-muted-foreground text-xs">{en}</span>
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section title="Daily Routine — Reflexive in Action">
        <RuleBox colorClass={C.sage} bgClass={C.sageBg} borderClass={C.sageBorder}>
          A typical morning in Swedish — almost every step uses a reflexive verb!
        </RuleBox>
        {(reflexData.dailyRoutine as [string,string,string][]).map(([sv, en, verb]) => <Row key={sv} sv={sv} en={en} note={verb} colorClass={C.sage} />)}
      </Section>

      <Section title="Deponent Verbs — Only Reflexive Form Exists">
        <RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}>
          Some Swedish verbs <em>look</em> reflexive (end in <strong>-s</strong>) but have no non-reflexive form. They're called deponent verbs. You just have to learn them as-is.
        </RuleBox>
        {(reflexData.deponentVerbs as [string,string,string,string][]).map(([sv, en, ex, exEn]) => (
          <div key={sv} className="bg-muted/50 rounded-lg px-3.5 py-2.5 mb-2 flex gap-2.5 items-center flex-wrap">
            <SpeakBtn word={sv} small />
            <span className={cn("font-serif text-base min-w-[80px]", C.rose)}>{sv}</span>
            <span className="text-muted-foreground text-[13px] flex-1">{en}</span>
            {ex && <span className="font-serif italic text-xs text-foreground">{ex} {exEn ? `= ${exEn}` : ""}</span>}
          </div>
        ))}
      </Section>
    </div>
  );
}
