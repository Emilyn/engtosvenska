import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Tag } from "@/components/shared/Tag";
import { Grid2 } from "@/components/shared/Grid2";
import { SpeakBtn } from "@/components/shared/SpeakBtn";
import verbsData from "@/data/grammar/verbs.json";

const colorMap: Record<string, { tc: string; bg: string; bc: string }> = {
  teal:     { tc: C.teal,     bg: C.tealBg,     bc: C.tealBorder },
  gold:     { tc: C.gold,     bg: C.goldBg,     bc: C.goldBorder },
  sky:      { tc: C.sky,      bg: C.skyBg,      bc: C.skyBorder },
  lavender: { tc: C.lavender, bg: C.lavenderBg, bc: C.lavenderBorder },
};

const groups = verbsData.groups.map(g => ({ ...g, ...colorMap[g.colorKey] }));
const pronouns = verbsData.pronouns as [string, string][];

export function Verbs() {
  return (
    <div>
      <Section title="One Form Per Tense">
        <RuleBox colorClass={C.sage} bgClass={C.sageBg} borderClass={C.sageBorder}>🎉 Swedish verbs have the <strong>same form for all persons</strong>. No "I am / he is" — always just <em>är</em>.</RuleBox>
        <div className="bg-muted/50 rounded-xl p-3.5 mb-4">
          <div className="text-muted-foreground font-mono text-[11px] mb-2.5">EXAMPLE: vara = to be</div>
          {pronouns.map(([sv, en]) => (
            <div key={sv} className="flex gap-2 py-1.5 border-b border-border items-center flex-wrap">
              <SpeakBtn word={`${sv} är`} small />
              <span className={cn("font-serif text-[15px] min-w-[80px] shrink-0", C.lavender)}>{sv}</span>
              <span className="text-muted-foreground text-xs flex-1">({en})</span>
              <span className="font-serif text-[15px] text-foreground shrink-0">{sv} <strong className={C.gold}>är</strong></span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Four Verb Groups">
        <Grid2>{groups.map(g => (
          <div key={g.n} className={cn("rounded-xl p-3.5 border", g.bg, g.bc)}>
            <div className="flex gap-2 items-center mb-2.5 flex-wrap">
              <Tag colorClass={g.tc} bgClass={g.bg} borderClass={g.bc}>Group {g.n}</Tag>
              <span className={cn("font-mono text-[11px]", g.tc)}>{g.pattern}</span>
            </div>
            <div className="font-serif text-sm text-foreground mb-2.5">{g.inf}</div>
            {([["Infinitive", g.inf.split(" ")[0]], ["Present", g.present], ["Past", g.past], ["Supine", g.sup]] as [string, string][]).map(([label, form]) => (
              <div key={label} className="flex justify-between items-center py-1 border-b border-border gap-2">
                <span className="text-muted-foreground text-xs font-mono">{label}</span>
                <div className="flex gap-1.5 items-center"><SpeakBtn word={form} small /><span className={cn("font-serif text-[15px]", g.tc)}>{form}</span></div>
              </div>
            ))}
          </div>
        ))}</Grid2>
      </Section>
      <Section title="Key Irregular Verbs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[380px]">
            <thead><tr>{["Meaning","Infinitive","Present","Past","Supine"].map(h => <th key={h} className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider px-2 py-1.5 text-left border-b border-border">{h}</th>)}</tr></thead>
            <tbody>{(verbsData.irregulars as [string,string,string,string,string][]).map(([en, inf, pres, past, sup]) => (
              <tr key={inf} className="border-b border-border">
                <td className="text-muted-foreground text-xs px-2 py-2">{en}</td>
                {([inf, pres, past, sup] as string[]).map((f, i) => <td key={i} className="px-2 py-2"><div className="flex gap-1 items-center"><SpeakBtn word={f} small /><span className={cn("font-serif text-sm", [null, C.teal, C.gold, C.lavender][i] ?? "")}>{f}</span></div></td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
