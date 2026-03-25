import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { Row } from "@/components/shared/Row";

export function Adjectives() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="Three Forms">
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}><strong className={C.teal}>Base</strong> (en-words) · <strong className={C.gold}>+t</strong> (ett-words) · <strong className={C.lavender}>+a</strong> (definite/plural)</RuleBox>
        <div className="grid grid-cols-3 gap-2 mb-3.5">
          {[["en-word","stor",C.teal,C.tealBg,C.tealBorder],["ett-word (+t)","stort",C.gold,C.goldBg,C.goldBorder],["def/plural (+a)","stora",C.lavender,C.lavenderBg,C.lavenderBorder]].map(([label, form, tc, bg, bc]) => (
            <div key={label} className={cn("text-center py-3 px-1.5 rounded-lg border", bg, bc)}>
              <div className={cn("font-mono text-[9px] mb-1.5 leading-snug", tc)}>{label}</div>
              <div className={cn("font-serif", tc, isMobile ? "text-[22px]" : "text-[26px]")}>{form}</div>
            </div>
          ))}
        </div>
        {[["en stor bil","a big car","en → base"],["ett stort hus","a big house","ett → +t"],["den stora bilen","the big car","def → +a"],["stora bilar","big cars","plural → +a"]].map(([sv, en, note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>
      <Section title="After 'är'">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>Adjective after <strong>är</strong> still agrees with the subject's gender.</RuleBox>
        {[["Bilen är stor.","The car is big.","en → base"],["Huset är stort.","The house is big.","ett → +t"],["Bilarna är stora.","The cars are big.","plural → +a"]].map(([sv, en, note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>
    </div>
  );
}
