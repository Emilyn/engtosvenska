import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";

export function Articles() {
  return (
    <div>
      <Section title="Indefinite Articles (a / an)">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>Use <strong className={C.teal}>en</strong> before common-gender nouns, <strong className={C.gold}>ett</strong> before neuter nouns.</RuleBox>
        {[["en bil","a car"],["en hund","a dog"],["ett hus","a house"],["ett barn","a child"]].map(([sv, en]) => <Row key={sv} sv={sv} en={en} />)}
      </Section>
      <Section title="Definite Articles (the) — Suffixed!">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>🇸🇪 "The" is <strong>attached to the end</strong> of the noun as a suffix!</RuleBox>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mb-3">
          {[{title:"en-words → -en or -n",tc:C.teal,bg:C.tealBg,bc:C.tealBorder,rows:[["en bil → bilen","the car"],["en bok → boken","the book"],["en flicka → flickan","the girl"]]},{title:"ett-words → -et or -t",tc:C.gold,bg:C.goldBg,bc:C.goldBorder,rows:[["ett hus → huset","the house"],["ett barn → barnet","the child"],["ett äpple → äpplet","the apple"]]}].map(col => (
            <div key={col.title} className={cn("rounded-xl p-3.5 border", col.bg, col.bc)}>
              <div className={cn("text-[11px] font-mono mb-3", col.tc)}>{col.title}</div>
              {col.rows.map(([sv, en]) => <Row key={sv} sv={sv} en={en} colorClass={col.tc} />)}
            </div>
          ))}
        </div>
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}><strong>Rule:</strong> Ends in vowel → <strong>-n / -t</strong>. Ends in consonant → <strong>-en / -et</strong>.</RuleBox>
      </Section>
    </div>
  );
}
