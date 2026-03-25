import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

export function Pronouns() {
  return (
    <div>
      <Section title="Personal Pronouns">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
            <thead><tr>{["Subject","Object","Meaning",""].map(h => <th key={h} className="text-muted-foreground font-mono text-[10px] uppercase px-2 py-1.5 text-left border-b border-border">{h}</th>)}</tr></thead>
            <tbody>{[["jag","mig","I / me"],["du","dig","you (sg.)"],["han","honom","he / him"],["hon","henne","she / her"],["den","den","it (en-word)"],["det","det","it (ett-word) / that"],["vi","oss","we / us"],["ni","er","you (pl.)"],["de","dem","they / them"]].map(([sub, obj, en]) => (
              <tr key={sub} className="border-b border-border">
                <td className="px-2 py-2"><span className={cn("font-serif text-base", C.teal)}>{sub}</span></td>
                <td className="px-2 py-2"><span className={cn("font-serif text-base", C.gold)}>{obj}</span></td>
                <td className="px-2 py-2 text-muted-foreground text-[13px]">{en}</td>
                <td className="px-2 py-2"><SpeakBtn word={sub} small /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Section>
      <Section title="Possessives">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>Agree with the <strong>noun described</strong> — same base/+t/+a as adjectives.</RuleBox>
        {[["min bil / mitt hus","my car / my house","min (en) · mitt (ett)"],["din bok / ditt bord","your book / table","din (en) · ditt (ett)"],["hans / hennes bil","his / her car","no change"],["vår bil / vårt hus","our car / house","vår (en) · vårt (ett)"],["era böcker","your books (pl.)","era (plural)"],["deras hus","their house","no change"]].map(([sv, en, note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>
    </div>
  );
}
