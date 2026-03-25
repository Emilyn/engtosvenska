import { C } from "@/lib/colors";
import { Section } from "@/components/shared/Section";
import { Row } from "@/components/shared/Row";

const cats = [
  {title:"Greetings & Farewells",tc:C.teal,rows:[["Hej / Hallå","Hi / Hello"],["God morgon","Good morning"],["God kväll","Good evening"],["Hej då","Goodbye"],["Vi ses","See you later"],["Ha det bra","Take care"]]},
  {title:"Polite Expressions",tc:C.gold,rows:[["Tack (så mycket)","Thank you (very much)"],["Varsågod","You're welcome"],["Förlåt","Sorry"],["Ursäkta","Excuse me"],["Snälla","Please"],["Ingen fara","No problem"]]},
  {title:"Getting Around",tc:C.sky,rows:[["Var är...?","Where is...?"],["Hur kommer jag till...?","How do I get to...?"],["Till vänster","To the left"],["Till höger","To the right"],["Rakt fram","Straight ahead"],["Stanna här","Stop here"]]},
  {title:"Food & Drink",tc:C.rose,rows:[["Kan jag få...?","Can I have...?"],["Jag är allergisk mot...","I'm allergic to..."],["Vad rekommenderar du?","What do you recommend?"],["Det var gott","That was delicious"],["Kan jag få notan?","Can I have the bill?"],["En kaffe, tack","A coffee, please"]]},
  {title:"Emergencies",tc:C.lavender,rows:[["Ring ambulansen!","Call an ambulance!"],["Ring polisen!","Call the police!"],["Jag behöver hjälp","I need help"],["Var är sjukhuset?","Where is the hospital?"],["Jag har förlorat mitt pass","I've lost my passport"],["Jag förstår inte","I don't understand"]]},
];

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
