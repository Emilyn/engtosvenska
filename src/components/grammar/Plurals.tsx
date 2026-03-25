import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { Tag } from "@/components/shared/Tag";
import { Grid2 } from "@/components/shared/Grid2";
import groupsData from "@/data/grammar/plurals.json";

const colorMap: Record<string, { tc: string; bg: string; bc: string }> = {
  teal:     { tc: C.teal,     bg: C.tealBg,     bc: C.tealBorder },
  gold:     { tc: C.gold,     bg: C.goldBg,     bc: C.goldBorder },
  sky:      { tc: C.sky,      bg: C.skyBg,      bc: C.skyBorder },
  lavender: { tc: C.lavender, bg: C.lavenderBg, bc: C.lavenderBorder },
  rose:     { tc: C.rose,     bg: C.roseBg,     bc: C.roseBorder },
};

const groups = groupsData.map(g => ({ ...g, ...colorMap[g.colorKey] }));

export function Plurals() {
  return (
    <div>
      <Section title="Five Declension Classes">
        <RuleBox>en-words: groups 1–3. ett-words: groups 4–5.</RuleBox>
        <Grid2>{groups.map(g => (
          <div key={g.n} className={cn("rounded-xl p-3.5 border", g.bg, g.bc)}>
            <div className="flex gap-2 items-center mb-3 flex-wrap">
              <Tag colorClass={g.tc} bgClass={g.bg} borderClass={g.bc}>Group {g.n}</Tag>
              <span className={cn("font-serif text-[15px]", g.tc)}>{g.rule}</span>
            </div>
            {g.ex.map(([sv, en]) => <Row key={sv} sv={sv} en={en} colorClass={g.tc} />)}
          </div>
        ))}</Grid2>
        <div className="mt-3"><RuleBox colorClass={C.sage} bgClass={C.sageBg} borderClass={C.sageBorder}>* Umlaut plurals — <em>hand→händer, stad→städer, man→män</em> — must be memorised.</RuleBox></div>
      </Section>
    </div>
  );
}
