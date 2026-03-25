import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { RuleBox } from "@/components/shared/RuleBox";
import { SpeakBtn } from "@/components/shared/SpeakBtn";

const sounds = [
  {sound:"sj-",tc:C.rose,bg:C.roseBg,bc:C.roseBorder,desc:"A breathy 'sh' further back in the throat — unique to Swedish",words:[["sjö","lake","shuh"],["sjukhus","hospital","shuu-hoos"],["hjälp","help","yelp"],["köra","to drive","shuh-ra"]]},
  {sound:"tj- / kj-",tc:C.gold,bg:C.goldBg,bc:C.goldBorder,desc:"Like 'ch' in 'cheese' but softer, made near the front of the mouth",words:[["tjugo","twenty","choo-go"],["tjej","girl","chey"],["kjol","skirt","chool"]]},
  {sound:"Soft G (before e/i/y/ä/ö)",tc:C.teal,bg:C.tealBg,bc:C.tealBorder,desc:"Before front vowels, 'g' sounds like 'y' in 'yes'",words:[["ge","give","yeh"],["gillar","likes","yil-ar"],["göra","to do","yuh-ra"],["gäst","guest","yest"]]},
  {sound:"Soft K (before e/i/y/ä/ö)",tc:C.sky,bg:C.skyBg,bc:C.skyBorder,desc:"Before front vowels, 'k' gives the same sound as tj-",words:[["kär","dear/in love","shair"],["köpa","to buy","shuh-pa"],["kyckling","chicken","shyk-ling"]]},
  {sound:"Hard G / K (before a/o/u/å)",tc:C.sage,bg:C.sageBg,bc:C.sageBorder,desc:"Before back vowels, 'g' and 'k' sound as in English",words:[["gå","to go","go"],["katt","cat","katt"],["komma","to come","ko-ma"]]},
  {sound:"rs- cluster",tc:C.lavender,bg:C.lavenderBg,bc:C.lavenderBorder,desc:"'rs' merges into a retroflex 'sh' sound (tongue curls back)",words:[["börja","to start","bur-ya"],["mars","March","marsh"],["Lars","(name)","Lash"]]},
];

export function Consonants() {
  return (
    <div>
      <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>Swedish consonants are generally consistent — but a few combinations create sounds that don't exist in English. These are the ones worth focusing on.</RuleBox>
      {sounds.map(s => (
        <Section key={s.sound} title={s.sound}>
          <RuleBox colorClass={s.tc} bgClass={s.bg} borderClass={s.bc}>{s.desc}</RuleBox>
          <div className="grid grid-cols-2 gap-2">
            {s.words.map(([sv, en, pron]) => (
              <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5">
                <div className="flex gap-2 items-center mb-1">
                  <SpeakBtn word={sv} small />
                  <span className={cn("font-serif text-[17px]", s.tc)}>{sv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">{en}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/50">"{pron}"</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
