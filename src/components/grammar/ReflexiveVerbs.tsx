import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

const reflexPronouns: [string, string, string][] = [
  ["jag","mig","I wash myself — jag tvättar mig"],
  ["du","dig","you wash yourself — du tvättar dig"],
  ["han/hon/den/det","sig","he/she washes — han tvättar sig"],
  ["vi","oss","we wash — vi tvättar oss"],
  ["ni","er","you (pl.) wash — ni tvättar er"],
  ["de","sig","they wash — de tvättar sig"],
];

const commonReflexive = [
  { sv:"känna sig",  en:"to feel (emotionally)",  ex:[["Jag känner mig trött","I feel tired"],["Hon känner sig glad","She feels happy"]] },
  { sv:"sätta sig",  en:"to sit down",             ex:[["Sätt dig!","Sit down!"],["Han satte sig ner","He sat down"]] },
  { sv:"lägga sig",  en:"to lie down / go to bed", ex:[["Jag lägger mig nu","I'm going to bed now"],["Lägg dig!","Lie down!"]] },
  { sv:"tvätta sig", en:"to wash oneself",          ex:[["Jag tvättar mig varje dag","I wash every day"],["Tvätta dig!","Wash yourself!"]] },
  { sv:"klä på sig", en:"to get dressed",           ex:[["Han klär på sig","He gets dressed"],["Klä på dig!","Get dressed!"]] },
  { sv:"klä av sig", en:"to get undressed",         ex:[["Hon klär av sig","She gets undressed"]] },
  { sv:"skynda sig", en:"to hurry",                 ex:[["Skynda dig!","Hurry up!"],["Vi måste skynda oss","We have to hurry"]] },
  { sv:"gifta sig",  en:"to get married",           ex:[["De gifte sig i somras","They got married last summer"]] },
  { sv:"trivas",     en:"to feel at home / enjoy",  ex:[["Jag trivs här","I feel at home here"],["Trivs du i Stockholm?","Do you enjoy Stockholm?"]] },
  { sv:"heta",       en:"to be called / named",     ex:[["Jag heter Anna","My name is Anna"],["Vad heter du?","What's your name?"]] },
  { sv:"minnas",     en:"to remember",               ex:[["Jag minns inte","I don't remember"],["Minns du det?","Do you remember that?"]] },
  { sv:"hoppas",     en:"to hope",                   ex:[["Jag hoppas det","I hope so"],["Vi hoppas på sol","We're hoping for sun"]] },
];

export function ReflexiveVerbs() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="What Are Reflexive Verbs?">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>
          A <strong>reflexive verb</strong> is one where the subject and object are the same person — "I wash <em>myself</em>". In Swedish the reflexive pronoun changes by person. Once you learn the pattern, it applies to dozens of very common verbs.
        </RuleBox>
        <div className="bg-muted/50 rounded-xl p-3.5 mb-4">
          <div className="font-mono text-[11px] text-muted-foreground mb-3">REFLEXIVE PRONOUNS — tvätta sig (to wash oneself)</div>
          {reflexPronouns.map(([subj, refl, ex]) => (
            <div key={subj} className="flex gap-2 py-1.5 border-b border-border items-center flex-wrap">
              <span className={cn("font-serif text-[15px] min-w-[90px] shrink-0", C.teal)}>{subj}</span>
              <span className={cn("font-serif text-[15px] min-w-[30px] shrink-0", C.gold)}>+ {refl}</span>
              <span className="text-muted-foreground text-xs flex-1 font-serif italic">{ex}</span>
              <SpeakBtn word={ex.split(" — ")[1] || ex} small />
            </div>
          ))}
        </div>
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}>
          <strong>Key insight:</strong> <em>sig</em> covers he/she/it/they. Only <em>mig, dig, oss, er</em> change. Memorise just those 4!
        </RuleBox>
      </Section>

      <Section title="Essential Reflexive Verbs">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>
          These are among the most common verbs in everyday Swedish. Many daily routines use reflexive verbs — getting up, getting dressed, feeling something.
        </RuleBox>
        {commonReflexive.map(v => (
          <div key={v.sv} className="bg-muted/50 rounded-lg p-3.5 mb-2">
            <div className="flex gap-2.5 items-center mb-2 flex-wrap">
              <div className="flex gap-2 items-center">
                <SpeakBtn word={v.sv} />
                <span className={cn("font-serif", C.teal, isMobile ? "text-base" : "text-lg")}>{v.sv}</span>
              </div>
              <span className="text-muted-foreground text-[13px] font-serif italic">{v.en}</span>
            </div>
            {v.ex.map(([sv, en]) => (
              <div key={sv} className="flex gap-2 items-center py-1.5 border-t border-border">
                <SpeakBtn word={sv} small />
                <span className="font-serif text-sm text-foreground flex-1">{sv}</span>
                <span className="text-muted-foreground text-xs">{en}</span>
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section title="Daily Routine — Reflexive in Action">
        <RuleBox colorClass={C.sage} bgClass={C.sageBg} borderClass={C.sageBorder}>
          A typical morning in Swedish — almost every step uses a reflexive verb!
        </RuleBox>
        {[
          ["Jag lägger mig klockan tio","I go to bed at ten","lägga sig"],
          ["Jag vaknar och sätter mig upp","I wake up and sit up","sätta sig"],
          ["Jag tvättar mig och rakar mig","I wash and shave","tvätta / raka sig"],
          ["Jag klär på mig","I get dressed","klä på sig"],
          ["Jag skyndar mig till jobbet","I hurry to work","skynda sig"],
          ["Jag känner mig pigg","I feel alert","känna sig"],
          ["Jag trivs på jobbet","I enjoy work","trivas"],
        ].map(([sv, en, verb]) => <Row key={sv} sv={sv} en={en} note={verb} colorClass={C.sage} />)}
      </Section>

      <Section title="Deponent Verbs — Only Reflexive Form Exists">
        <RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}>
          Some Swedish verbs <em>look</em> reflexive (end in <strong>-s</strong>) but have no non-reflexive form. They're called deponent verbs. You just have to learn them as-is.
        </RuleBox>
        {[
          ["hoppas","to hope","Jag hoppas det går bra", ""],
          ["minnas","to remember","Minns du mig?", ""],
          ["trivas","to feel at home","Hon trivs i Sverige", ""],
          ["hetas / heta","to be named","Jag heter Erik", ""],
          ["finnas","to exist / be found","Det finns mjölk","there is milk"],
          ["verkas","to seem","Det verkar bra","it seems good"],
        ].map(([sv, en, ex, exEn]) => (
          <div key={sv} className="bg-muted/50 rounded-lg px-3.5 py-2.5 mb-2 flex gap-2.5 items-center flex-wrap">
            <SpeakBtn word={sv} small />
            <span className={cn("font-serif text-base min-w-[80px]", C.rose)}>{sv}</span>
            <span className="text-muted-foreground text-[13px] flex-1">{en}</span>
            {ex && <span className="font-serif italic text-xs text-foreground">{ex} {exEn ? `= ${exEn}` : ""}</span>}
          </div>
        ))}
      </Section>
    </div>
  );
}
