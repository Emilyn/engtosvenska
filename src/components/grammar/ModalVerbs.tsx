import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { Tag } from "@/components/shared/Tag";

const modals = [
  { sv:"kan",    en:"can / be able to",        past:"kunde",   note:"ability or possibility",          tc:C.teal,    bg:C.tealBg,    bc:C.tealBorder,
    examples:[["Jag kan simma","I can swim"],["Kan du hjälpa mig?","Can you help me?"],["Det kan vara sant","It might be true"]] },
  { sv:"ska",    en:"shall / will / going to",  past:"skulle",  note:"future plans, intention",         tc:C.gold,    bg:C.goldBg,    bc:C.goldBorder,
    examples:[["Jag ska resa imorgon","I'm going to travel tomorrow"],["Ska vi gå?","Shall we go?"],["Det ska bli bra","It will be fine"]] },
  { sv:"vill",   en:"want to",                  past:"ville",   note:"desire or wish",                  tc:C.lavender,bg:C.lavenderBg,bc:C.lavenderBorder,
    examples:[["Jag vill lära mig svenska","I want to learn Swedish"],["Vill du ha kaffe?","Do you want coffee?"],["Jag ville stanna","I wanted to stay"]] },
  { sv:"måste",  en:"must / have to",           past:"måste",   note:"necessity — same in past!",       tc:C.rose,    bg:C.roseBg,    bc:C.roseBorder,
    examples:[["Jag måste gå nu","I have to go now"],["Du måste äta","You must eat"],["Vi måste ta bussen","We have to take the bus"]] },
  { sv:"får",    en:"may / get to / is allowed",past:"fick",    note:"permission or acquisition",       tc:C.sky,     bg:C.skyBg,     bc:C.skyBorder,
    examples:[["Får jag fråga?","May I ask?"],["Jag fick en present","I got a gift"],["Du får inte röka här","You're not allowed to smoke here"]] },
  { sv:"borde",  en:"should / ought to",        past:"borde",   note:"recommendation — same in past!",  tc:C.sage,    bg:C.sageBg,    bc:C.sageBorder,
    examples:[["Du borde vila","You should rest"],["Jag borde studera mer","I ought to study more"],["Vi borde fråga","We should ask"]] },
  { sv:"behöver",en:"need to",                  past:"behövde", note:"necessity / need",                tc:C.gold,    bg:C.goldBg,    bc:C.goldBorder,
    examples:[["Jag behöver hjälp","I need help"],["Du behöver inte komma","You don't need to come"],["Vi behövde vänta","We needed to wait"]] },
];

export function ModalVerbs() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="Modal Verbs Overview">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>
          Modal verbs come <strong>before the main verb</strong>, which stays in its infinitive form (no ending). Like English: "I <em>can</em> swim" → <em>jag kan simma</em>. Same form for all persons!
        </RuleBox>
        <div className="bg-muted/50 rounded-xl p-3.5 mb-4">
          <div className="font-mono text-[11px] text-muted-foreground mb-2.5">PATTERN</div>
          <div className="flex gap-2 flex-wrap items-center">
            {([["Subject",C.teal,C.tealBg,"jag"],["Modal verb",C.gold,C.goldBg,"kan"],["Infinitive",C.lavender,C.lavenderBg,"simma"]] as [string,string,string,string][]).map(([label, tc, bg, ex], i) => (
              <div key={i} className="text-center">
                <div className={cn("font-serif px-3 py-1 rounded-lg", isMobile ? "text-base" : "text-xl", tc, bg)}>{ex}</div>
                <div className={cn("font-mono text-[9px] opacity-70 mt-0.5", tc)}>{label}</div>
              </div>
            ))}
            <span className="text-muted-foreground text-xl">=</span>
            <span className="text-muted-foreground text-sm font-serif italic">I can swim</span>
          </div>
        </div>
      </Section>

      {modals.map(m => (
        <Section key={m.sv} title={`${m.sv} — ${m.en}`}>
          <div className="flex gap-2 items-center mb-3 flex-wrap">
            <Tag colorClass={m.tc} bgClass={m.bg} borderClass={m.bc}>{m.note}</Tag>
            <span className="font-mono text-[11px] text-muted-foreground">past: <span className={m.tc}>{m.past}</span></span>
          </div>
          {m.examples.map(([sv, en]) => <Row key={sv} sv={sv} en={en} colorClass={m.tc} />)}
        </Section>
      ))}

      <Section title="Negation with Modals">
        <RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}>
          Place <strong>inte</strong> after the modal verb: <em>jag kan inte simma</em> (I can't swim). With <em>behöver</em>, "don't need to" → <em>behöver inte</em>.
        </RuleBox>
        {[
          ["Jag kan inte komma","I can't come","kan + inte"],
          ["Hon vill inte äta","She doesn't want to eat","vill + inte"],
          ["Vi måste inte betala","We don't have to pay","måste + inte"],
          ["Du behöver inte ringa","You don't need to call","behöver + inte"],
          ["Jag ska inte gå dit","I'm not going there","ska + inte"],
        ].map(([sv, en, note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>

      <Section title="Conditional: skulle (would)">
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}>
          <strong>skulle</strong> is the past of <em>ska</em> and also means "would". Use it for polite requests, hypotheticals and reported speech.
        </RuleBox>
        {[
          ["Jag skulle vilja ha kaffe","I would like to have coffee","polite request"],
          ["Skulle du kunna hjälpa mig?","Could you help me?","polite question"],
          ["Om jag hade tid, skulle jag resa","If I had time, I would travel","conditional"],
          ["Han sa att han skulle komma","He said he would come","reported speech"],
        ].map(([sv, en, note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>
    </div>
  );
}
