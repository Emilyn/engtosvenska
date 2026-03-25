import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

export function DaysMonths() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="Days of the Week">
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}>Days are <strong>not capitalised</strong> in Swedish. The week starts on Monday.</RuleBox>
        <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-4")}>
          {[["måndag","Monday","mån"],["tisdag","Tuesday","tis"],["onsdag","Wednesday","ons"],["torsdag","Thursday","tor"],["fredag","Friday","fre"],["lördag","Saturday","lör"],["söndag","Sunday","sön"]].map(([sv, en, abbr]) => (
            <div key={sv} className="bg-muted/50 rounded-lg px-3.5 py-3 border border-border">
              <div className="flex justify-between items-center mb-1">
                <span className={cn("font-serif text-base", C.lavender)}>{sv}</span>
                <SpeakBtn word={sv} small />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-xs">{en}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{abbr}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Months of the Year">
        <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-4")}>
          {[["januari","January"],["februari","February"],["mars","March"],["april","April"],["maj","May"],["juni","June"],["juli","July"],["augusti","August"],["september","September"],["oktober","October"],["november","November"],["december","December"]].map(([sv, en]) => (
            <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5 flex justify-between items-center gap-1.5">
              <div className="flex gap-1.5 items-center"><SpeakBtn word={sv} small /><span className={cn("font-serif text-[15px]", C.sage)}>{sv}</span></div>
              <span className="font-mono text-[11px] text-muted-foreground">{en}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Useful Time Phrases">
        {[["idag","today"],["igår","yesterday"],["imorgon","tomorrow"],["i veckan","this week"],["förra veckan","last week"],["nästa vecka","next week"],["i år","this year"],["förra året","last year"],["på måndag","on Monday"],["varje dag","every day"]].map(([sv, en]) => <Row key={sv} sv={sv} en={en} colorClass={C.lavender} />)}
      </Section>
    </div>
  );
}
