import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

import numbersData from "@/data/content/numbers.json";

const nums1to20 = numbersData.nums1to20 as [string, string][];
const tens = numbersData.tens as [string, string][];
const ordinals = numbersData.ordinals as [string, string][];

export function Numbers() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="1 – 20">
        <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-4")}>
          {nums1to20.map(([sv, en]) => (
            <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5 flex items-center gap-2">
              <SpeakBtn word={sv.split(" ")[0]} small />
              <div className="min-w-0">
                <div className={cn("font-serif text-[14px] leading-tight truncate", C.sky)}>{sv}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{en}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Tens & Large Numbers">
        <RuleBox colorClass={C.sky} bgClass={C.skyBg} borderClass={C.skyBorder}><strong>Compound numbers:</strong> tjugo + ett = tjugoett (21), hundra + femtio + tre = hundrafemtitre (153)</RuleBox>
        <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-3")}>
          {tens.map(([sv, en]) => (
            <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5 flex items-center gap-2">
              <SpeakBtn word={sv} small />
              <div className="min-w-0">
                <div className={cn("font-serif text-[14px] leading-tight truncate", C.gold)}>{sv}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{en}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Ordinal Numbers">
        {ordinals.map(([sv, en]) => <Row key={sv} sv={sv} en={en} colorClass={C.lavender} />)}
      </Section>
      <Section title="Useful Number Phrases">
        {(numbersData.phrases as [string, string][]).map(([sv, en]) => <Row key={sv} sv={sv} en={en} />)}
      </Section>
    </div>
  );
}
