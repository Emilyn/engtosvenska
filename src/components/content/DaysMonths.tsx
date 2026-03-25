import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { SpeakBtn } from "@/components/shared/SpeakBtn";
import daysData from "@/data/content/daysMonths.json";

export function DaysMonths() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="Days of the Week">
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}>Days are <strong>not capitalised</strong> in Swedish. The week starts on Monday.</RuleBox>
        <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-4")}>
          {(daysData.days as [string,string,string][]).map(([sv, en, abbr]) => (
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
          {(daysData.months as [string,string][]).map(([sv, en]) => (
            <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5 flex justify-between items-center gap-1.5">
              <div className="flex gap-1.5 items-center"><SpeakBtn word={sv} small /><span className={cn("font-serif text-[15px]", C.sage)}>{sv}</span></div>
              <span className="font-mono text-[11px] text-muted-foreground">{en}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Useful Time Phrases">
        {(daysData.timePhrases as [string,string][]).map(([sv, en]) => <Row key={sv} sv={sv} en={en} colorClass={C.lavender} />)}
      </Section>
    </div>
  );
}
