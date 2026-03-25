import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

const nums1to20: [string, string][] = [["noll","0"],["ett / en","1"],["två","2"],["tre","3"],["fyra","4"],["fem","5"],["sex","6"],["sju","7"],["åtta","8"],["nio","9"],["tio","10"],["elva","11"],["tolv","12"],["tretton","13"],["fjorton","14"],["femton","15"],["sexton","16"],["sjutton","17"],["arton","18"],["nitton","19"],["tjugo","20"]];
const tens: [string, string][] = [["trettio","30"],["fyrtio","40"],["femtio","50"],["sextio","60"],["sjuttio","70"],["åttio","80"],["nittio","90"],["hundra","100"],["tusen","1,000"],["en miljon","1,000,000"]];
const ordinals: [string, string][] = [["första","1st"],["andra","2nd"],["tredje","3rd"],["fjärde","4th"],["femte","5th"],["sjätte","6th"],["sjunde","7th"],["åttonde","8th"],["nionde","9th"],["tionde","10th"]];

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
        {[["Klockan är tre","It's three o'clock"],["Den femte maj","The fifth of May"],["Jag är tjugotre år","I am twenty-three years old"],["Det kostar tjugo kronor","It costs twenty kronor"]].map(([sv, en]) => <Row key={sv} sv={sv} en={en} />)}
      </Section>
    </div>
  );
}
