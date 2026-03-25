import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { Row } from "@/components/shared/Row";
import catsData from "@/data/content/commonPhrases.json";

const colorMap: Record<string, string> = {
  teal: C.teal, gold: C.gold, sky: C.sky, rose: C.rose, lavender: C.lavender,
};

const cats = catsData.map(c => ({ ...c, tc: colorMap[c.colorKey] }));

export function CommonPhrases() {
  return (
    <div>
      {cats.map(cat => (
        <Section key={cat.title} title={cat.title}>
          {cat.rows.map(([sv, en]) => <Row key={sv} sv={sv} en={en} colorClass={cat.tc} />)}
        </Section>
      ))}
    </div>
  );
}
