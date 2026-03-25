import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

export function WordOrder() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="The V2 Rule">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>The finite verb is always the <strong>second element</strong>. If something other than the subject comes first, subject and verb swap (<em>inversion</em>).</RuleBox>
        {[
          {label:"Normal (Subject first)", parts:[{t:"Jag",r:"subject",c:C.teal,bg:C.tealBg},{t:"äter",r:"verb (2nd)",c:C.gold,bg:C.goldBg},{t:"äpplet",r:"object",c:"text-foreground",bg:"bg-muted"}], en:"I eat the apple"},
          {label:"Inverted (Adverb first)", parts:[{t:"Idag",r:"adverb",c:C.lavender,bg:C.lavenderBg},{t:"äter",r:"verb (2nd)",c:C.gold,bg:C.goldBg},{t:"jag",r:"subject",c:C.teal,bg:C.tealBg},{t:"äpplet",r:"object",c:"text-foreground",bg:"bg-muted"}], en:"Today I eat the apple"},
          {label:"Inverted (Object first)", parts:[{t:"Äpplet",r:"object",c:C.rose,bg:C.roseBg},{t:"äter",r:"verb (2nd)",c:C.gold,bg:C.goldBg},{t:"jag",r:"subject",c:C.teal,bg:C.tealBg}], en:"The apple — I eat (it)"},
        ].map(ex => (
          <div key={ex.label} className="bg-muted/50 rounded-xl p-3.5 mb-2.5">
            <div className="flex justify-between items-center mb-3 gap-2 flex-wrap">
              <span className="text-muted-foreground font-mono text-[11px]">{ex.label}</span>
              <SpeakBtn word={ex.parts.map(p => p.t).join(" ")} />
            </div>
            <div className="flex gap-2 flex-wrap mb-2">{ex.parts.map((p, i) => <div key={i} className="text-center"><div className={cn("font-serif px-3 py-1 rounded-lg", isMobile ? "text-[17px]" : "text-xl", p.c, p.bg)}>{p.t}</div><div className={cn("font-mono text-[9px] opacity-70 mt-0.5", p.c)}>{p.r}</div></div>)}</div>
            <div className="text-muted-foreground font-serif italic text-[13px]">"{ex.en}"</div>
          </div>
        ))}
      </Section>
      <Section title="Negation with 'inte'">
        <RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}><strong>inte</strong> = "not". After verb in main clauses, before verb in sub-clauses.</RuleBox>
        {[["Jag förstår inte.","I don't understand.","after verb"],["Han kommer inte idag.","He's not coming today.","after verb"],["Jag vet att hon inte kommer.","I know she's not coming.","before verb (sub-clause)"]].map(([sv, en, note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>
      <Section title="Questions">
        <RuleBox colorClass={C.sky} bgClass={C.skyBg} borderClass={C.skyBorder}><strong>Yes/no:</strong> Verb first. <strong>Wh:</strong> Question word → verb → subject.</RuleBox>
        {[["Talar du svenska?","Do you speak Swedish?","verb first"],["Vad heter du?","What is your name?","vad + verb + subject"],["Var bor du?","Where do you live?","var + verb + subject"],["Hur mår du?","How are you?","hur + verb + subject"]].map(([sv, en, note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>
    </div>
  );
}
