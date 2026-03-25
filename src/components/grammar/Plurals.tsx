import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { Tag } from "@/components/shared/Tag";
import { Grid2 } from "@/components/shared/Grid2";

const groups = [
  {n:1,rule:"add -or",tc:C.teal,bg:C.tealBg,bc:C.tealBorder,ex:[["en flicka → flickor","girl → girls"],["en blomma → blommor","flower → flowers"],["en gata → gator","street → streets"]]},
  {n:2,rule:"add -ar",tc:C.gold,bg:C.goldBg,bc:C.goldBorder,ex:[["en bil → bilar","car → cars"],["en dag → dagar","day → days"],["en hand → händer*","hand → hands"]]},
  {n:3,rule:"add -er",tc:C.sky,bg:C.skyBg,bc:C.skyBorder,ex:[["en natt → nätter*","night → nights"],["en stad → städer*","city → cities"],["en tid → tider","time → times"]]},
  {n:4,rule:"add -n",tc:C.lavender,bg:C.lavenderBg,bc:C.lavenderBorder,ex:[["ett äpple → äpplen","apple → apples"],["ett rike → riken","realm → realms"],["ett hjärta → hjärtan","heart → hearts"]]},
  {n:5,rule:"no change",tc:C.rose,bg:C.roseBg,bc:C.roseBorder,ex:[["ett hus → hus","house → houses"],["ett år → år","year → years"],["en lärare → lärare","teacher → teachers"]]},
];

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
