import { useState } from "react";
import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { Tag } from "@/components/shared/Tag";
import { Grid2 } from "@/components/shared/Grid2";
import { Button } from "@/components/ui/button";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

import quizWordsData from "@/data/grammar/nounsGender.json";
const quizWords = quizWordsData;

export function NounsGender() {
  const [qi, setQi] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const q = quizWords[qi % quizWords.length];
  return (
    <div>
      <Section title="Two Grammatical Genders">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>Swedish nouns are either <strong className={C.teal}>en-words</strong> (~75%) or <strong className={C.gold}>ett-words</strong> (~25%).</RuleBox>
        <Grid2>
          {[{label:"en-word",tc:C.teal,bg:C.tealBg,bc:C.tealBorder,tag:"~75%",rows:[["en bil","a car"],["en bok","a book"],["en hund","a dog"],["en stol","a chair"]]},{label:"ett-word",tc:C.gold,bg:C.goldBg,bc:C.goldBorder,tag:"~25%",rows:[["ett hus","a house"],["ett barn","a child"],["ett bord","a table"],["ett äpple","an apple"]]}].map(col => (
            <div key={col.label} className={cn("rounded-xl p-3.5 border", col.bg, col.bc)}>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={cn("font-serif text-sm", col.tc)}>{col.label}</span>
                <Tag colorClass={col.tc} bgClass={col.bg} borderClass={col.bc}>{col.tag}</Tag>
              </div>
              {col.rows.map(([sv, en]) => <Row key={sv} sv={sv} en={en} colorClass={col.tc} />)}
            </div>
          ))}
        </Grid2>
        <div className="mt-3"><RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}><strong>💡 Patterns:</strong> <strong>-ing,-tion,-het,-are</strong> → en. <strong>-ande,-ment,-um</strong> → ett.</RuleBox></div>
      </Section>
      <Section title="Quick Quiz — en or ett?">
        <div className="bg-muted/50 rounded-xl px-4 py-6 text-center border border-border">
          <div className="mb-1.5 text-muted-foreground font-mono text-[11px]">QUESTION {(qi % quizWords.length) + 1} / {quizWords.length}</div>
          <div className="flex items-center justify-center gap-2.5 mb-1.5">
            <span className="font-serif text-4xl text-foreground">{q.word}</span>
            <SpeakBtn word={q.word} />
          </div>
          <div className="text-muted-foreground font-serif italic mb-5 text-sm">"{q.en}"</div>
          {answer === null ? (
            <div className="flex gap-3.5 justify-center">
              {["en", "ett"].map(g => (
                <Button key={g} variant="outline" size="lg" onClick={() => setAnswer(g)} className="px-10 text-[22px] font-bold font-serif">
                  {g}
                </Button>
              ))}
            </div>
          ) : (
            <div>
              <div className={cn("text-xl mb-3.5", answer === q.g ? C.sage : C.rose)}>{answer === q.g ? "✓ Rätt! (Correct!)" : ` ✗ It's "${q.g} ${q.word}"`}</div>
              <Button variant="outline" onClick={() => { setAnswer(null); setQi(qi + 1); }} className={cn("font-mono text-[13px]", C.gold, C.goldBorder)}>Next →</Button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
