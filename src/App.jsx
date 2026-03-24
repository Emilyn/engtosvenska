import { useState, useEffect } from "react";
import { usePWAInstall } from "./usePWA.js";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ─── Responsive ───────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 800);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 580, isTablet: w < 860, w };
}

// ─── Accent Colors ────────────────────────────────────────────────────────────
// These are semantic accent colors used for educational content categories.
// They work on the light background provided by shadcn's theme.
const C = {
  gold:     "text-amber-400/80",     goldBg:     "bg-amber-950/25",  goldBorder:     "border-amber-800/50",    goldRaw: "#b45309",
  teal:     "text-teal-400/80",      tealBg:     "bg-teal-950/25",   tealBorder:     "border-teal-800/50",     tealRaw: "#0d9488",
  rose:     "text-rose-400/80",      roseBg:     "bg-rose-950/25",   roseBorder:     "border-rose-800/50",     roseRaw: "#e11d48",
  sky:      "text-sky-400/80",       skyBg:      "bg-sky-950/25",    skyBorder:      "border-sky-800/50",      skyRaw: "#0284c7",
  sage:     "text-emerald-400/80",   sageBg:     "bg-emerald-950/25",sageBorder:     "border-emerald-800/50",  sageRaw: "#059669",
  lavender: "text-violet-400/80",    lavenderBg: "bg-violet-950/25", lavenderBorder: "border-violet-800/50",   lavenderRaw: "#7c3aed",
};

// Map deck color names to tailwind classes
const colorMap = {
  teal:     { text: C.teal,     bg: C.tealBg,     border: C.tealBorder,     raw: C.tealRaw },
  gold:     { text: C.gold,     bg: C.goldBg,     border: C.goldBorder,     raw: C.goldRaw },
  sky:      { text: C.sky,      bg: C.skyBg,      border: C.skyBorder,      raw: C.skyRaw },
  lavender: { text: C.lavender, bg: C.lavenderBg, border: C.lavenderBorder, raw: C.lavenderRaw },
  rose:     { text: C.rose,     bg: C.roseBg,     border: C.roseBorder,     raw: C.roseRaw },
  sage:     { text: C.sage,     bg: C.sageBg,     border: C.sageBorder,     raw: C.sageRaw },
};

function getColorClasses(rawColor) {
  // Match raw hex to a color set
  for (const [, v] of Object.entries(colorMap)) {
    if (v.raw === rawColor) return v;
  }
  return colorMap.gold; // fallback
}

// ─── Speech ───────────────────────────────────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "sv-SE"; u.rate = 0.82;
  const sv = window.speechSynthesis.getVoices().find(v => v.lang.startsWith("sv"));
  if (sv) u.voice = sv;
  window.speechSynthesis.speak(u);
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
function Tag({ children, colorClass = C.gold, bgClass = C.goldBg, borderClass = C.goldBorder }) {
  return (
    <span className={cn("font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border whitespace-nowrap", colorClass, bgClass, borderClass)}>
      {children}
    </span>
  );
}

function SpeakBtn({ word, small }) {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={e => { e.stopPropagation(); setOn(true); speak(word); setTimeout(() => setOn(false), 1400); }}
      className={cn(
        "shrink-0 rounded-lg cursor-pointer text-[13px] transition-all inline-flex items-center justify-center min-w-[32px] border",
        small ? "px-2.5 py-1" : "px-3.5 py-1.5",
        on
          ? "bg-amber-600 border-amber-600 text-white"
          : "bg-transparent border-border text-muted-foreground hover:border-amber-700/50 hover:text-amber-400/80"
      )}
    >
      {on ? "▶" : "♪"}
    </button>
  );
}

function Row({ sv, en, note, colorClass = "text-foreground" }) {
  const { isMobile } = useBreakpoint();
  return (
    <div className={cn("flex gap-2 p-2.5 px-3 rounded-lg bg-muted/50 mb-1.5", isMobile ? "flex-wrap items-start" : "items-center flex-nowrap")}>
      <SpeakBtn word={sv} small />
      <span className={cn("font-serif shrink-0", colorClass, isMobile ? "text-sm" : "text-base", !isMobile && "min-w-[110px]")}>{sv}</span>
      <span className="text-muted-foreground text-[13px] flex-1 min-w-0">= {en}</span>
      {note && <span className="font-mono text-[10px] text-muted-foreground bg-card px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 border border-border">{note}</span>}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="font-serif text-lg text-foreground mb-3.5 pb-2.5 border-b border-border">{title}</h3>
      {children}
    </div>
  );
}

function RuleBox({ children, colorClass = C.gold, bgClass = C.goldBg, borderClass = C.goldBorder }) {
  return (
    <div className={cn("border rounded-r-xl pl-4 pr-4 py-3 mb-4 font-serif text-[13px] text-foreground leading-relaxed border-l-[3px]", borderClass, bgClass)}>
      {children}
    </div>
  );
}

function Grid2({ children }) {
  const { isTablet } = useBreakpoint();
  return <div className={cn("grid gap-3", isTablet ? "grid-cols-1" : "grid-cols-2")}>{children}</div>;
}

// ─── FLASHCARD DATA ───────────────────────────────────────────────────────────
const DECKS = [
  {
    id:"greetings", label:"Greetings", emoji:"👋", colorKey:"teal",
    cards:[
      {sv:"Hej",         en:"Hi / Hello"},
      {sv:"God morgon",  en:"Good morning"},
      {sv:"God dag",     en:"Good day"},
      {sv:"God kväll",   en:"Good evening"},
      {sv:"God natt",    en:"Good night"},
      {sv:"Hej då",      en:"Goodbye"},
      {sv:"Vi ses",      en:"See you"},
      {sv:"Tack",        en:"Thank you"},
      {sv:"Tack så mycket", en:"Thank you very much"},
      {sv:"Varsågod",    en:"You're welcome"},
      {sv:"Förlåt",      en:"Sorry / Excuse me"},
      {sv:"Ursäkta",     en:"Excuse me (to get attention)"},
      {sv:"Snälla",      en:"Please"},
      {sv:"Ja",          en:"Yes"},
      {sv:"Nej",         en:"No"},
    ]
  },
  {
    id:"phrases", label:"Phrases", emoji:"💬", colorKey:"gold",
    cards:[
      {sv:"Vad heter du?",         en:"What is your name?"},
      {sv:"Jag heter ...",         en:"My name is ..."},
      {sv:"Hur mår du?",           en:"How are you?"},
      {sv:"Jag mår bra",           en:"I'm doing well"},
      {sv:"Talar du svenska?",     en:"Do you speak Swedish?"},
      {sv:"Jag förstår inte",      en:"I don't understand"},
      {sv:"Kan du upprepa det?",   en:"Can you repeat that?"},
      {sv:"Tala långsammare",      en:"Speak more slowly"},
      {sv:"Vad betyder det?",      en:"What does that mean?"},
      {sv:"Var är toaletten?",     en:"Where is the bathroom?"},
      {sv:"Hur mycket kostar det?",en:"How much does it cost?"},
      {sv:"Kan jag få notan?",     en:"Can I have the bill?"},
      {sv:"Jag är hungrig",        en:"I am hungry"},
      {sv:"Jag är törstig",        en:"I am thirsty"},
      {sv:"Hjälp!",                en:"Help!"},
    ]
  },
  {
    id:"numbers", label:"Numbers", emoji:"🔢", colorKey:"sky",
    cards:[
      {sv:"noll",      en:"0"},  {sv:"ett / en", en:"1"},
      {sv:"två",       en:"2"},  {sv:"tre",      en:"3"},
      {sv:"fyra",      en:"4"},  {sv:"fem",      en:"5"},
      {sv:"sex",       en:"6"},  {sv:"sju",      en:"7"},
      {sv:"åtta",      en:"8"},  {sv:"nio",      en:"9"},
      {sv:"tio",       en:"10"}, {sv:"elva",     en:"11"},
      {sv:"tolv",      en:"12"}, {sv:"tjugo",    en:"20"},
      {sv:"trettio",   en:"30"}, {sv:"fyrtio",   en:"40"},
      {sv:"hundra",    en:"100"},{sv:"tusen",    en:"1,000"},
    ]
  },
  {
    id:"days", label:"Days & Months", emoji:"📅", colorKey:"lavender",
    cards:[
      {sv:"måndag",   en:"Monday"},   {sv:"tisdag",  en:"Tuesday"},
      {sv:"onsdag",   en:"Wednesday"},{sv:"torsdag", en:"Thursday"},
      {sv:"fredag",   en:"Friday"},   {sv:"lördag",  en:"Saturday"},
      {sv:"söndag",   en:"Sunday"},
      {sv:"januari",  en:"January"},  {sv:"februari",en:"February"},
      {sv:"mars",     en:"March"},    {sv:"april",   en:"April"},
      {sv:"maj",      en:"May"},      {sv:"juni",    en:"June"},
      {sv:"juli",     en:"July"},     {sv:"augusti", en:"August"},
      {sv:"september",en:"September"},{sv:"oktober", en:"October"},
      {sv:"november", en:"November"}, {sv:"december",en:"December"},
    ]
  },
  {
    id:"nouns", label:"Common Nouns", emoji:"📦", colorKey:"rose",
    cards:[
      {sv:"huset",    en:"the house"},  {sv:"bilen",   en:"the car"},
      {sv:"hunden",   en:"the dog"},    {sv:"katten",  en:"the cat"},
      {sv:"mannen",   en:"the man"},    {sv:"kvinnan", en:"the woman"},
      {sv:"barnet",   en:"the child"},  {sv:"maten",   en:"the food"},
      {sv:"vattnet",  en:"the water"},  {sv:"staden",  en:"the city"},
      {sv:"skolan",   en:"the school"}, {sv:"arbetet", en:"the work"},
      {sv:"pengarna", en:"the money"},  {sv:"tiden",   en:"the time"},
      {sv:"familjen", en:"the family"}, {sv:"vännen",  en:"the friend"},
    ]
  },
  {
    id:"top1", label:"Top Words 1–50", emoji:"⭐", colorKey:"gold",
    cards:[
      {sv:"och",en:"and"},{sv:"i",en:"in / at"},{sv:"att",en:"to / that (conj.)"},
      {sv:"det",en:"it / that / there"},{sv:"en / ett",en:"a / an"},
      {sv:"är",en:"is / am / are"},{sv:"på",en:"on / at / in"},
      {sv:"jag",en:"I"},{sv:"som",en:"who / that / which / as"},
      {sv:"har",en:"have / has"},{sv:"inte",en:"not"},
      {sv:"med",en:"with"},{sv:"de / dem",en:"they / them"},
      {sv:"han",en:"he"},{sv:"hon",en:"she"},
      {sv:"vi",en:"we"},{sv:"du",en:"you (singular)"},
      {sv:"men",en:"but"},{sv:"för",en:"for / because"},
      {sv:"om",en:"if / about / around"},{sv:"så",en:"so / then / like that"},
      {sv:"var",en:"was / where"},{sv:"sig",en:"oneself (reflexive)"},
      {sv:"från",en:"from"},{sv:"kan",en:"can / is able to"},
      {sv:"man",en:"one / you (impersonal)"},{sv:"eller",en:"or"},
      {sv:"den",en:"it / the (en-word)"},{sv:"när",en:"when"},
      {sv:"nu",en:"now"},{sv:"ska",en:"shall / will / going to"},
      {sv:"upp",en:"up"},{sv:"vad",en:"what"},
      {sv:"där",en:"there"},{sv:"sin / sitt / sina",en:"his/her/its own"},
      {sv:"här",en:"here"},{sv:"ut",en:"out"},
      {sv:"efter",en:"after / behind"},{sv:"får",en:"get(s) / may"},
      {sv:"än",en:"than / yet"},{sv:"bli",en:"become / will be"},
      {sv:"över",en:"over / across / more than"},{sv:"också",en:"also / too"},
      {sv:"mot",en:"towards / against"},{sv:"hade",en:"had"},
      {sv:"bara",en:"just / only"},{sv:"under",en:"under / during"},
      {sv:"år",en:"year"},{sv:"mer",en:"more"},
    ]
  },
  {
    id:"top2", label:"Top Words 51–100", emoji:"🌟", colorKey:"teal",
    cards:[
      {sv:"mycket",en:"much / very / a lot"},{sv:"mellan",en:"between"},
      {sv:"sedan",en:"then / since / ago"},{sv:"vid",en:"at / by / near"},
      {sv:"bra",en:"good / well / fine"},{sv:"tid",en:"time"},
      {sv:"tre",en:"three"},{sv:"säger",en:"says / say"},
      {sv:"sätt",en:"way / manner / set"},{sv:"stora",en:"big / large (pl./def.)"},
      {sv:"andra",en:"other / second"},{sv:"ner",en:"down"},
      {sv:"del",en:"part / portion"},{sv:"varje",en:"every / each"},
      {sv:"lång",en:"long / tall"},{sv:"mot",en:"towards / against"},
      {sv:"tar",en:"takes / take"},{sv:"ny",en:"new"},
      {sv:"två",en:"two"},{sv:"utan",en:"without"},
      {sv:"dag",en:"day"},{sv:"igen",en:"again"},
      {sv:"vill",en:"want(s)"},{sv:"lite",en:"a little / a bit"},
      {sv:"ser",en:"see(s)"},{sv:"gör",en:"do(es) / make(s)"},
      {sv:"redan",en:"already"},{sv:"alltid",en:"always"},
      {sv:"aldrig",en:"never"},{sv:"säga",en:"to say"},
      {sv:"väl",en:"well / probably / right?"},{sv:"vet",en:"know(s) (fact)"},
      {sv:"känner",en:"know(s) (person) / feel(s)"},{sv:"måste",en:"must / have to"},
      {sv:"kanske",en:"maybe / perhaps"},{sv:"fram",en:"forward / ahead"},
      {sv:"inga",en:"no / none (plural)"},{sv:"ett",en:"one (number) / a (neuter)"},
      {sv:"kom",en:"came"},{sv:"in",en:"in / into"},
      {sv:"även",en:"also / even"},{sv:"sett",en:"seen"},
      {sv:"hur",en:"how"},{sv:"gick",en:"went / walked"},
      {sv:"varför",en:"why"},{sv:"ännu",en:"still / yet / even"},
      {sv:"fort",en:"quickly / fast"},{sv:"sista",en:"last / final"},
      {sv:"hela",en:"whole / all the"},{sv:"nästan",en:"almost"},
    ]
  },
  {
    id:"adjectives_fc", label:"Core Adjectives", emoji:"🎨", colorKey:"lavender",
    cards:[
      {sv:"bra / god",en:"good"},{sv:"dålig",en:"bad"},
      {sv:"stor",en:"big / large"},{sv:"liten",en:"small / little"},
      {sv:"lång",en:"long / tall"},{sv:"kort",en:"short"},
      {sv:"ny",en:"new"},{sv:"gammal",en:"old"},
      {sv:"ung",en:"young"},{sv:"snabb",en:"fast / quick"},
      {sv:"långsam",en:"slow"},{sv:"varm",en:"warm / hot"},
      {sv:"kall",en:"cold"},{sv:"lätt",en:"easy / light"},
      {sv:"svår",en:"difficult / hard"},{sv:"rolig",en:"funny / fun"},
      {sv:"tråkig",en:"boring"},{sv:"vacker",en:"beautiful"},
      {sv:"ful",en:"ugly"},{sv:"dyr",en:"expensive"},
      {sv:"billig",en:"cheap"},{sv:"stark",en:"strong"},
      {sv:"svag",en:"weak"},{sv:"glad",en:"happy / glad"},
      {sv:"ledsen",en:"sad"},{sv:"trött",en:"tired"},
      {sv:"hungrig",en:"hungry"},{sv:"törstig",en:"thirsty"},
      {sv:"ensam",en:"alone / lonely"},{sv:"rädd",en:"afraid / scared"},
      {sv:"viktig",en:"important"},{sv:"intressant",en:"interesting"},
      {sv:"rik",en:"rich"},{sv:"fattig",en:"poor"},
      {sv:"ren",en:"clean"},{sv:"smutsig",en:"dirty"},
      {sv:"öppen",en:"open"},{sv:"stängd",en:"closed"},
      {sv:"rätt",en:"right / correct"},{sv:"fel",en:"wrong"},
    ]
  },
  {
    id:"falsefriends", label:"False Friends ⚠️", emoji:"⚠️", colorKey:"rose",
    cards:[
      {sv:"gift",en:"married  (NOT: gift — it means poison too!)"},
      {sv:"semester",en:"vacation / holiday  (NOT: semester)"},
      {sv:"rolig",en:"funny / fun  (NOT: romantic)"},
      {sv:"sen",en:"late / then  (NOT: seen)"},
      {sv:"full",en:"drunk / full  (NOT: fool)"},
      {sv:"kiss",en:"pee / urine  (NOT: a kiss — that's 'kyss')"},
      {sv:"bra",en:"good  (NOT: bra undergarment)"},
      {sv:"slut",en:"end / finished  (NOT: the English slur)"},
      {sv:"chips",en:"crisps / potato chips  (same spelling, same meaning ✓)"},
      {sv:"gym",en:"gym  (same — but pronounced 'yim')"},
      {sv:"glass",en:"ice cream  (NOT: glass — that's 'glas')"},
      {sv:"industri",en:"industry  (same root but false cognate in usage)"},
      {sv:"eventuellt",en:"possibly / perhaps  (NOT: eventually)"},
      {sv:"aktuell",en:"current / topical  (NOT: actual)"},
      {sv:"kontrollera",en:"to check / verify  (NOT: to control)"},
      {sv:"delikat",en:"tricky / delicate  (NOT always: delicious)"},
      {sv:"chef",en:"boss / manager  (NOT: chef cook — that's 'kock')"},
      {sv:"smoking",en:"tuxedo / dinner jacket  (NOT: smoking)"},
    ]
  },
  {
    id:"verbs", label:"Key Verbs", emoji:"⚡", colorKey:"sage",
    cards:[
      {sv:"är",       en:"am / is / are"},
      {sv:"har",      en:"have / has"},
      {sv:"går",      en:"goes / walk"},
      {sv:"kommer",   en:"comes / coming"},
      {sv:"ser",      en:"sees / see"},
      {sv:"vill",     en:"want(s)"},
      {sv:"kan",      en:"can / be able to"},
      {sv:"måste",    en:"must / have to"},
      {sv:"äter",     en:"eat(s)"},
      {sv:"dricker",  en:"drink(s)"},
      {sv:"bor",      en:"live(s) / reside(s)"},
      {sv:"arbetar",  en:"work(s)"},
      {sv:"talar",    en:"speak(s)"},
      {sv:"förstår",  en:"understand(s)"},
      {sv:"vet",      en:"know(s) (a fact)"},
    ]
  },
];

// ─── FLASHCARD COMPONENT ──────────────────────────────────────────────────────
function FlashCards() {
  const { isMobile } = useBreakpoint();
  const [deckId, setDeckId]     = useState(null);
  const [cardIdx, setCardIdx]   = useState(0);
  const [flipped, setFlipped]   = useState(false);
  const [known, setKnown]       = useState({});
  const [sessionDone, setSessionDone] = useState(false);

  const deck = DECKS.find(d => d.id === deckId);
  const cards = deck ? deck.cards : [];
  const card  = cards[cardIdx] || null;
  const cardKey = deck ? `${deck.id}-${cardIdx}` : null;
  const dc = deck ? colorMap[deck.colorKey] || colorMap.gold : colorMap.gold;

  const knownCount   = Object.values(known).filter(Boolean).length;
  const unknownCount = Object.values(known).filter(v => !v).length;

  function startDeck(id) {
    setDeckId(id); setCardIdx(0); setFlipped(false);
    setKnown({}); setSessionDone(false);
  }

  function handleFlip() { setFlipped(f => !f); }

  function handleAnswer(wasKnown) {
    setKnown(prev => ({ ...prev, [cardKey]: wasKnown }));
    const next = cardIdx + 1;
    if (next >= cards.length) { setSessionDone(true); }
    else { setCardIdx(next); setFlipped(false); }
  }

  function restart() {
    setCardIdx(0); setFlipped(false);
    setKnown({}); setSessionDone(false);
  }

  function reviewMissed() {
    const missed = cards.filter((_, i) => known[`${deck.id}-${i}`] === false);
    if (!missed.length) return;
    setKnown({}); setCardIdx(0); setFlipped(false); setSessionDone(false);
  }

  // ── Deck picker ──
  if (!deckId) return (
    <div>
      <div className="text-center mb-7">
        <h2 className="font-serif text-[22px] text-foreground mb-1.5">Flashcard Decks</h2>
        <p className="text-muted-foreground font-serif italic text-[13px]">Pick a deck to practise</p>
      </div>
      <div className={cn("grid gap-3", isMobile ? "grid-cols-2" : "grid-cols-3")}>
        {DECKS.map(d => {
          const c = colorMap[d.colorKey] || colorMap.gold;
          return (
            <button key={d.id} onClick={() => startDeck(d.id)}
              className={cn("bg-card border-2 rounded-xl p-5 cursor-pointer text-left transition-all flex flex-col gap-2.5 hover:shadow-md", c.border, "hover:border-current")}>
              <span className="text-[28px]">{d.emoji}</span>
              <div>
                <div className={cn("font-serif text-base mb-0.5", c.text)}>{d.label}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{d.cards.length} cards</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // ── Session complete ──
  if (sessionDone) {
    const pct = Math.round((knownCount / cards.length) * 100);
    const missedCards = cards.filter((_, i) => known[`${deck.id}-${i}`] === false);
    return (
      <div className="max-w-[480px] mx-auto text-center">
        <div className="text-[52px] mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
        <h2 className="font-serif text-[26px] text-foreground mb-1.5">Session Complete!</h2>
        <p className="text-muted-foreground font-serif italic mb-6">{deck.label} · {cards.length} cards</p>

        <div className="flex justify-center gap-5 mb-7">
          {[{label:"Knew it", count:knownCount, text:C.sage, bg:C.sageBg, border:C.sageBorder},{label:"Review", count:unknownCount, text:C.rose, bg:C.roseBg, border:C.roseBorder}].map(s => (
            <div key={s.label} className={cn("rounded-xl px-6 py-4 text-center border", s.bg, s.border)}>
              <div className={cn("font-serif text-[34px] font-bold", s.text)}>{s.count}</div>
              <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {missedCards.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left">
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-2.5">To review</div>
            {missedCards.map(c => (
              <div key={c.sv} className="flex justify-between py-1.5 border-b border-border items-center gap-2">
                <div className="flex gap-2 items-center">
                  <SpeakBtn word={c.sv} small />
                  <span className={cn("font-serif text-base", C.rose)}>{c.sv}</span>
                </div>
                <span className="text-muted-foreground text-[13px]">{c.en}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2.5 justify-center flex-wrap">
          {missedCards.length > 0 && (
            <Button variant="outline" onClick={reviewMissed} className={cn("font-mono text-xs", C.rose, C.roseBorder)}>
              Review {missedCards.length} missed
            </Button>
          )}
          <Button variant="outline" onClick={restart} className={cn("font-mono text-xs", C.gold, C.goldBorder)}>
            Restart deck
          </Button>
          <Button variant="ghost" onClick={() => setDeckId(null)} className="font-mono text-xs text-muted-foreground">
            All decks
          </Button>
        </div>
      </div>
    );
  }

  // ── Active card ──
  const progress = cards.length > 0 ? ((cardIdx) / cards.length) * 100 : 0;

  return (
    <div className="max-w-[520px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setDeckId(null)} className="font-mono text-[11px] text-muted-foreground">
          ← Decks
        </Button>
        <div className="flex-1">
          <div className="flex justify-between mb-1.5">
            <span className={cn("font-mono text-[11px]", dc.text)}>{deck.emoji} {deck.label}</span>
            <span className="font-mono text-[11px] text-muted-foreground">{cardIdx + 1} / {cards.length}</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-[width] duration-300 ease-out bg-primary" style={{ width:`${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Session mini stats */}
      <div className="flex gap-2 mb-4">
        {[{label:"✓ Knew it", count:knownCount, text:C.sage},{label:"✗ Review", count:unknownCount, text:C.rose}].map(s => (
          <div key={s.label} className="flex-1 bg-muted/50 rounded-lg px-3 py-1.5 flex justify-between items-center">
            <span className="font-mono text-[10px] text-muted-foreground">{s.label}</span>
            <span className={cn("font-serif text-lg font-bold", s.text)}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Card */}
      <div
        onClick={handleFlip}
        className={cn(
          "rounded-2xl cursor-pointer text-center min-h-[220px] flex flex-col items-center justify-center transition-all relative overflow-hidden select-none border-2",
          isMobile ? "px-6 py-10" : "px-9 py-13",
          flipped ? "bg-muted/80 border-primary shadow-lg" : "bg-card border-border"
        )}>
        <div className="absolute inset-0 flex items-center justify-center text-[130px] opacity-[0.04] font-serif font-bold text-muted-foreground pointer-events-none">
          {flipped ? "EN" : "SV"}
        </div>

        {!flipped ? (
          <>
            <div className={cn("font-mono text-[10px] tracking-[0.15em] uppercase mb-4", dc.text)}>Swedish</div>
            <div className={cn("font-serif font-bold mb-3.5 leading-tight text-foreground", isMobile ? "text-[28px]" : "text-4xl")}>{card.sv}</div>
            <SpeakBtn word={card.sv} />
            <div className="mt-4 font-mono text-[11px] text-muted-foreground">tap to reveal →</div>
          </>
        ) : (
          <>
            <div className={cn("font-mono text-[10px] tracking-[0.15em] uppercase mb-3", C.gold)}>English</div>
            <div className={cn("font-serif font-semibold mb-2.5", C.gold, isMobile ? "text-[22px]" : "text-[28px]")}>{card.en}</div>
            <div className={cn("font-serif text-muted-foreground mb-3.5", isMobile ? "text-base" : "text-xl")}>{card.sv}</div>
            <SpeakBtn word={card.sv} />
          </>
        )}
      </div>

      {/* Answer buttons */}
      {flipped ? (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline" onClick={() => handleAnswer(false)} className={cn("py-3.5 rounded-xl font-mono text-[13px] font-bold", C.rose, C.roseBorder, C.roseBg)}>
            ✗ Review again
          </Button>
          <Button variant="outline" onClick={() => handleAnswer(true)} className={cn("py-3.5 rounded-xl font-mono text-[13px] font-bold", C.sage, C.sageBorder, C.sageBg)}>
            ✓ Got it!
          </Button>
        </div>
      ) : (
        <div className="flex gap-2.5 mt-4 justify-center">
          <Button variant="outline" onClick={handleFlip} className={cn("font-mono text-xs font-semibold", dc.text, dc.border, dc.bg)}>
            Flip card
          </Button>
        </div>
      )}

      <p className="text-center mt-3 text-muted-foreground/60 font-mono text-[10px]">
        tap the card or press the button to flip
      </p>
    </div>
  );
}

// ─── VOWEL DATA ───────────────────────────────────────────────────────────────
const VOWELS = [
  { letter:"A", colorKey:"gold",     short:{ ipa:"/a/",  hint:"like 'a' in 'father' — but shorter",       word:"katt", meaning:"cat",         pron:"katt"  }, long:{ ipa:"/aː/", hint:"like 'a' in 'spa' — held longer",            word:"dag",  meaning:"day",         pron:"daag"  } },
  { letter:"E", colorKey:"teal",     short:{ ipa:"/ɛ/",  hint:"like 'e' in 'bed'",                         word:"vett", meaning:"sense",        pron:"vett"  }, long:{ ipa:"/eː/", hint:"like 'ay' in 'say' — pure, no glide",        word:"vet",  meaning:"knows",       pron:"veet"  } },
  { letter:"I", colorKey:"sky",      short:{ ipa:"/ɪ/",  hint:"like 'i' in 'bit'",                         word:"vill", meaning:"wants",        pron:"vill"  }, long:{ ipa:"/iː/", hint:"like 'ee' in 'see' — held longer",           word:"vi",   meaning:"we",           pron:"vee"   } },
  { letter:"O", colorKey:"gold",     short:{ ipa:"/ɔ/",  hint:"like 'o' in 'hot' — rounded lips",          word:"bott", meaning:"lived",        pron:"bott"  }, long:{ ipa:"/uː/", hint:"like 'oo' in 'moon' — very rounded",         word:"bo",   meaning:"to live",     pron:"boo"   } },
  { letter:"U", colorKey:"sage",     short:{ ipa:"/ɵ/",  hint:"round lips like 'oo', tongue says 'ih'",    word:"full", meaning:"full",         pron:"full"  }, long:{ ipa:"/ʉː/", hint:"like French 'u' — lips rounded, tongue fwd", word:"hus",  meaning:"house",       pron:"hyoos" } },
  { letter:"Y", colorKey:"lavender", short:{ ipa:"/ʏ/",  hint:"round lips, say 'ih' — German ü short",     word:"nytt", meaning:"new (neut.)",  pron:"nytt"  }, long:{ ipa:"/yː/", hint:"like French 'u' — lips rounded, high",       word:"ny",   meaning:"new",         pron:"nyy"   } },
  { letter:"Å", colorKey:"sage",     short:{ ipa:"/ɔ/",  hint:"like 'o' in 'more' — rounded",              word:"håll", meaning:"hold",         pron:"holl"  }, long:{ ipa:"/oː/", hint:"like 'oa' in 'boat' — pure, no glide",       word:"år",   meaning:"year",        pron:"oar"   } },
  { letter:"Ä", colorKey:"gold",     short:{ ipa:"/ɛ/",  hint:"like 'e' in 'bed' — mouth more open",       word:"ätt",  meaning:"family line",  pron:"ett"   }, long:{ ipa:"/ɛː/", hint:"like 'ai' in 'air' — held, mouth open",      word:"äta",  meaning:"to eat",      pron:"eeta"  } },
  { letter:"Ö", colorKey:"sky",      short:{ ipa:"/œ/",  hint:"like 'ir' in 'bird' — rounded lips",        word:"öst",  meaning:"east",         pron:"urst"  }, long:{ ipa:"/øː/", hint:"like German 'ö' — lips fwd, rounded",        word:"öra",  meaning:"ear",         pron:"eura"  } },
];

function VowelCard({ vowel, isActive, onClick }) {
  const [mode, setMode] = useState("short");
  const { isMobile } = useBreakpoint();
  const d = mode === "short" ? vowel.short : vowel.long;
  const vc = colorMap[vowel.colorKey] || colorMap.gold;
  return (
    <div onClick={onClick} className={cn(
      "rounded-xl cursor-pointer transition-all relative overflow-hidden border-2",
      isMobile ? "p-3.5" : "p-4",
      isActive ? cn("bg-muted/80 -translate-y-0.5 shadow-lg", vc.border) : "bg-card border-border"
    )}>
      <div className={cn("absolute -right-1.5 -top-2.5 text-[86px] font-serif font-bold opacity-[0.06] select-none pointer-events-none", vc.text)}>{vowel.letter}</div>
      <div className="flex items-center gap-2 mb-2.5">
        <span className={cn("font-serif font-bold leading-none", vc.text, isMobile ? "text-[30px]" : "text-4xl")}>{vowel.letter}</span>
        <span className={cn("font-mono text-[11px] px-2 py-0.5 rounded-md", vc.text, vc.bg)}>{d.ipa}</span>
        <div className="ml-auto"><SpeakBtn word={d.word} /></div>
      </div>
      <div className="flex gap-1.5 mb-2.5">
        {["short","long"].map(m => (
          <button key={m} onClick={e=>{e.stopPropagation();setMode(m);}}
            className={cn(
              "px-3 py-0.5 rounded-full border-none text-[10px] font-bold tracking-wider uppercase cursor-pointer font-mono transition-all",
              mode===m ? cn("text-white", vowel.colorKey === "gold" ? "bg-amber-600" : vowel.colorKey === "teal" ? "bg-teal-600" : vowel.colorKey === "sky" ? "bg-sky-600" : vowel.colorKey === "sage" ? "bg-emerald-600" : vowel.colorKey === "lavender" ? "bg-violet-600" : "bg-amber-600") : "bg-muted text-muted-foreground"
            )}>{m}</button>
        ))}
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed font-serif italic mb-3">{d.hint}</p>
      <div className="bg-muted rounded-lg px-3 py-2 flex justify-between items-center gap-1.5 flex-wrap">
        <span className="font-serif text-[19px] text-foreground font-semibold">{d.word}</span>
        <span className="text-[11px] text-muted-foreground font-mono">= {d.meaning}</span>
        <span className="font-mono text-[11px] text-muted-foreground/50">"{d.pron}"</span>
      </div>
    </div>
  );
}

// ─── GRAMMAR ──────────────────────────────────────────────────────────────────

function NounsGender() {
  const quizWords = [
    {word:"bil",en:"car",g:"en"},{word:"hus",en:"house",g:"ett"},
    {word:"bok",en:"book",g:"en"},{word:"barn",en:"child",g:"ett"},
    {word:"hand",en:"hand",g:"en"},{word:"äpple",en:"apple",g:"ett"},
    {word:"stol",en:"chair",g:"en"},{word:"vatten",en:"water",g:"ett"},
  ];
  const [qi,setQi]=useState(0); const [answer,setAnswer]=useState(null);
  const q=quizWords[qi%quizWords.length];
  return (
    <div>
      <Section title="Two Grammatical Genders">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>Swedish nouns are either <strong className={C.teal}>en-words</strong> (~75%) or <strong className={C.gold}>ett-words</strong> (~25%).</RuleBox>
        <Grid2>
          {[{label:"en-word",tc:C.teal,bg:C.tealBg,bc:C.tealBorder,tag:"~75%",rows:[["en bil","a car"],["en bok","a book"],["en hund","a dog"],["en stol","a chair"]]},{label:"ett-word",tc:C.gold,bg:C.goldBg,bc:C.goldBorder,tag:"~25%",rows:[["ett hus","a house"],["ett barn","a child"],["ett bord","a table"],["ett äpple","an apple"]]}].map(col=>(
            <div key={col.label} className={cn("rounded-xl p-3.5 border", col.bg, col.bc)}>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={cn("font-serif text-sm", col.tc)}>{col.label}</span>
                <Tag colorClass={col.tc} bgClass={col.bg} borderClass={col.bc}>{col.tag}</Tag>
              </div>
              {col.rows.map(([sv,en])=><Row key={sv} sv={sv} en={en} colorClass={col.tc}/>)}
            </div>
          ))}
        </Grid2>
        <div className="mt-3"><RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}><strong>💡 Patterns:</strong> <strong>-ing,-tion,-het,-are</strong> → en. <strong>-ande,-ment,-um</strong> → ett.</RuleBox></div>
      </Section>
      <Section title="Quick Quiz — en or ett?">
        <div className="bg-muted/50 rounded-xl px-4 py-6 text-center border border-border">
          <div className="mb-1.5 text-muted-foreground font-mono text-[11px]">QUESTION {(qi%quizWords.length)+1} / {quizWords.length}</div>
          <div className="flex items-center justify-center gap-2.5 mb-1.5">
            <span className="font-serif text-4xl text-foreground">{q.word}</span>
            <SpeakBtn word={q.word}/>
          </div>
          <div className="text-muted-foreground font-serif italic mb-5 text-sm">"{q.en}"</div>
          {answer===null ? (
            <div className="flex gap-3.5 justify-center">
              {["en","ett"].map(g=>(
                <Button key={g} variant="outline" size="lg" onClick={()=>setAnswer(g)} className="px-10 text-[22px] font-bold font-serif">
                  {g}
                </Button>
              ))}
            </div>
          ) : (
            <div>
              <div className={cn("text-xl mb-3.5", answer===q.g ? C.sage : C.rose)}>{answer===q.g?"✓ Rätt! (Correct!)":` ✗ It's "${q.g} ${q.word}"`}</div>
              <Button variant="outline" onClick={()=>{setAnswer(null);setQi(qi+1);}} className={cn("font-mono text-[13px]", C.gold, C.goldBorder)}>Next →</Button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

function Articles() {
  return (
    <div>
      <Section title="Indefinite Articles (a / an)">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>Use <strong className={C.teal}>en</strong> before common-gender nouns, <strong className={C.gold}>ett</strong> before neuter nouns.</RuleBox>
        {[["en bil","a car"],["en hund","a dog"],["ett hus","a house"],["ett barn","a child"]].map(([sv,en])=><Row key={sv} sv={sv} en={en}/>)}
      </Section>
      <Section title="Definite Articles (the) — Suffixed!">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>🇸🇪 "The" is <strong>attached to the end</strong> of the noun as a suffix!</RuleBox>
        <Grid2>
          {[{title:"en-words → -en or -n",tc:C.teal,bg:C.tealBg,bc:C.tealBorder,rows:[["en bil → bilen","the car"],["en bok → boken","the book"],["en flicka → flickan","the girl"]]},{title:"ett-words → -et or -t",tc:C.gold,bg:C.goldBg,bc:C.goldBorder,rows:[["ett hus → huset","the house"],["ett barn → barnet","the child"],["ett äpple → äpplet","the apple"]]}].map(col=>(
            <div key={col.title} className={cn("rounded-xl p-3.5 border", col.bg, col.bc)}>
              <div className={cn("text-[11px] font-mono mb-3", col.tc)}>{col.title}</div>
              {col.rows.map(([sv,en])=><Row key={sv} sv={sv} en={en} colorClass={col.tc}/>)}
            </div>
          ))}
        </Grid2>
        <div className="mt-3"><RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}><strong>Rule:</strong> Ends in vowel → <strong>-n / -t</strong>. Ends in consonant → <strong>-en / -et</strong>.</RuleBox></div>
      </Section>
    </div>
  );
}

function Verbs() {
  const groups=[{n:1,pattern:"-ar",inf:"prata (to talk)",present:"pratar",past:"pratade",sup:"pratat",tc:C.teal,bg:C.tealBg,bc:C.tealBorder},{n:2,pattern:"-er",inf:"köra (to drive)",present:"kör",past:"körde",sup:"kört",tc:C.gold,bg:C.goldBg,bc:C.goldBorder},{n:3,pattern:"-r",inf:"bo (to live)",present:"bor",past:"bodde",sup:"bott",tc:C.sky,bg:C.skyBg,bc:C.skyBorder},{n:4,pattern:"irreg",inf:"vara (to be)",present:"är",past:"var",sup:"varit",tc:C.lavender,bg:C.lavenderBg,bc:C.lavenderBorder}];
  const pronouns=[["jag","I"],["du","you (sing.)"],["han/hon","he/she"],["vi","we"],["ni","you (pl.)"],["de","they"]];
  return (
    <div>
      <Section title="One Form Per Tense">
        <RuleBox colorClass={C.sage} bgClass={C.sageBg} borderClass={C.sageBorder}>🎉 Swedish verbs have the <strong>same form for all persons</strong>. No "I am / he is" — always just <em>är</em>.</RuleBox>
        <div className="bg-muted/50 rounded-xl p-3.5 mb-4">
          <div className="text-muted-foreground font-mono text-[11px] mb-2.5">EXAMPLE: vara = to be</div>
          {pronouns.map(([sv,en])=>(
            <div key={sv} className="flex gap-2 py-1.5 border-b border-border items-center flex-wrap">
              <SpeakBtn word={`${sv} är`} small/><span className={cn("font-serif text-[15px] min-w-[80px] shrink-0", C.lavender)}>{sv}</span><span className="text-muted-foreground text-xs flex-1">({en})</span><span className="font-serif text-[15px] text-foreground shrink-0">{sv} <strong className={C.gold}>är</strong></span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Four Verb Groups">
        <Grid2>{groups.map(g=>(
          <div key={g.n} className={cn("rounded-xl p-3.5 border", g.bg, g.bc)}>
            <div className="flex gap-2 items-center mb-2.5 flex-wrap"><Tag colorClass={g.tc} bgClass={g.bg} borderClass={g.bc}>Group {g.n}</Tag><span className={cn("font-mono text-[11px]", g.tc)}>{g.pattern}</span></div>
            <div className="font-serif text-sm text-foreground mb-2.5">{g.inf}</div>
            {[["Infinitive",g.inf.split(" ")[0]],["Present",g.present],["Past",g.past],["Supine",g.sup]].map(([label,form])=>(
              <div key={label} className="flex justify-between items-center py-1 border-b border-border gap-2">
                <span className="text-muted-foreground text-xs font-mono">{label}</span>
                <div className="flex gap-1.5 items-center"><SpeakBtn word={form} small/><span className={cn("font-serif text-[15px]", g.tc)}>{form}</span></div>
              </div>
            ))}
          </div>
        ))}</Grid2>
      </Section>
      <Section title="Key Irregular Verbs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[380px]">
            <thead><tr>{["Meaning","Infinitive","Present","Past","Supine"].map(h=><th key={h} className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider px-2 py-1.5 text-left border-b border-border">{h}</th>)}</tr></thead>
            <tbody>{[["to be","vara","är","var","varit"],["to have","ha","har","hade","haft"],["to go","gå","går","gick","gått"],["to come","komma","kommer","kom","kommit"],["to see","se","ser","såg","sett"],["to say","säga","säger","sa(de)","sagt"],["to get","få","får","fick","fått"],["to know","veta","vet","visste","vetat"]].map(([en,inf,pres,past,sup])=>(
              <tr key={inf} className="border-b border-border">
                <td className="text-muted-foreground text-xs px-2 py-2">{en}</td>
                {[inf,pres,past,sup].map((f,i)=><td key={i} className="px-2 py-2"><div className="flex gap-1 items-center"><SpeakBtn word={f} small/><span className={cn("font-serif text-sm", [null,C.teal,C.gold,C.lavender][i])}>{f}</span></div></td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function WordOrder() {
  const { isMobile } = useBreakpoint();
  const exColors = { subject: C.teal, verb: C.gold, object: "text-foreground", adverb: C.lavender };
  return (
    <div>
      <Section title="The V2 Rule">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>The finite verb is always the <strong>second element</strong>. If something other than the subject comes first, subject and verb swap (<em>inversion</em>).</RuleBox>
        {[{label:"Normal (Subject first)",parts:[{t:"Jag",r:"subject",c:C.teal,bg:C.tealBg},{t:"äter",r:"verb (2nd)",c:C.gold,bg:C.goldBg},{t:"äpplet",r:"object",c:"text-foreground",bg:"bg-muted"}],en:"I eat the apple"},{label:"Inverted (Adverb first)",parts:[{t:"Idag",r:"adverb",c:C.lavender,bg:C.lavenderBg},{t:"äter",r:"verb (2nd)",c:C.gold,bg:C.goldBg},{t:"jag",r:"subject",c:C.teal,bg:C.tealBg},{t:"äpplet",r:"object",c:"text-foreground",bg:"bg-muted"}],en:"Today I eat the apple"},{label:"Inverted (Object first)",parts:[{t:"Äpplet",r:"object",c:C.rose,bg:C.roseBg},{t:"äter",r:"verb (2nd)",c:C.gold,bg:C.goldBg},{t:"jag",r:"subject",c:C.teal,bg:C.tealBg}],en:"The apple — I eat (it)"}].map(ex=>(
          <div key={ex.label} className="bg-muted/50 rounded-xl p-3.5 mb-2.5">
            <div className="flex justify-between items-center mb-3 gap-2 flex-wrap">
              <span className="text-muted-foreground font-mono text-[11px]">{ex.label}</span>
              <SpeakBtn word={ex.parts.map(p=>p.t).join(" ")}/>
            </div>
            <div className="flex gap-2 flex-wrap mb-2">{ex.parts.map((p,i)=><div key={i} className="text-center"><div className={cn("font-serif px-3 py-1 rounded-lg", isMobile ? "text-[17px]" : "text-xl", p.c, p.bg)}>{p.t}</div><div className={cn("font-mono text-[9px] opacity-70 mt-0.5", p.c)}>{p.r}</div></div>)}</div>
            <div className="text-muted-foreground font-serif italic text-[13px]">"{ex.en}"</div>
          </div>
        ))}
      </Section>
      <Section title="Negation with 'inte'">
        <RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}><strong>inte</strong> = "not". After verb in main clauses, before verb in sub-clauses.</RuleBox>
        {[["Jag förstår inte.","I don't understand.","after verb"],["Han kommer inte idag.","He's not coming today.","after verb"],["Jag vet att hon inte kommer.","I know she's not coming.","before verb (sub-clause)"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
      <Section title="Questions">
        <RuleBox colorClass={C.sky} bgClass={C.skyBg} borderClass={C.skyBorder}><strong>Yes/no:</strong> Verb first. <strong>Wh:</strong> Question word → verb → subject.</RuleBox>
        {[["Talar du svenska?","Do you speak Swedish?","verb first"],["Vad heter du?","What is your name?","vad + verb + subject"],["Var bor du?","Where do you live?","var + verb + subject"],["Hur mår du?","How are you?","hur + verb + subject"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
    </div>
  );
}

function Adjectives() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="Three Forms">
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}><strong className={C.teal}>Base</strong> (en-words) · <strong className={C.gold}>+t</strong> (ett-words) · <strong className={C.lavender}>+a</strong> (definite/plural)</RuleBox>
        <div className="grid grid-cols-3 gap-2 mb-3.5">
          {[["en-word","stor",C.teal,C.tealBg,C.tealBorder],["ett-word (+t)","stort",C.gold,C.goldBg,C.goldBorder],["def/plural (+a)","stora",C.lavender,C.lavenderBg,C.lavenderBorder]].map(([label,form,tc,bg,bc])=>(
            <div key={label} className={cn("text-center py-3 px-1.5 rounded-lg border", bg, bc)}>
              <div className={cn("font-mono text-[9px] mb-1.5 leading-snug", tc)}>{label}</div>
              <div className={cn("font-serif", tc, isMobile ? "text-[22px]" : "text-[26px]")}>{form}</div>
            </div>
          ))}
        </div>
        {[["en stor bil","a big car","en → base"],["ett stort hus","a big house","ett → +t"],["den stora bilen","the big car","def → +a"],["stora bilar","big cars","plural → +a"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
      <Section title="After 'är'">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>Adjective after <strong>är</strong> still agrees with the subject's gender.</RuleBox>
        {[["Bilen är stor.","The car is big.","en → base"],["Huset är stort.","The house is big.","ett → +t"],["Bilarna är stora.","The cars are big.","plural → +a"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
    </div>
  );
}

function Pronouns() {
  return (
    <div>
      <Section title="Personal Pronouns">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
            <thead><tr>{["Subject","Object","Meaning",""].map(h=><th key={h} className="text-muted-foreground font-mono text-[10px] uppercase px-2 py-1.5 text-left border-b border-border">{h}</th>)}</tr></thead>
            <tbody>{[["jag","mig","I / me"],["du","dig","you (sg.)"],["han","honom","he / him"],["hon","henne","she / her"],["den","den","it (en-word)"],["det","det","it (ett-word) / that"],["vi","oss","we / us"],["ni","er","you (pl.)"],["de","dem","they / them"]].map(([sub,obj,en])=>(
              <tr key={sub} className="border-b border-border">
                <td className="px-2 py-2"><span className={cn("font-serif text-base", C.teal)}>{sub}</span></td>
                <td className="px-2 py-2"><span className={cn("font-serif text-base", C.gold)}>{obj}</span></td>
                <td className="px-2 py-2 text-muted-foreground text-[13px]">{en}</td>
                <td className="px-2 py-2"><SpeakBtn word={sub} small/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Section>
      <Section title="Possessives">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>Agree with the <strong>noun described</strong> — same base/+t/+a as adjectives.</RuleBox>
        {[["min bil / mitt hus","my car / my house","min (en) · mitt (ett)"],["din bok / ditt bord","your book / table","din (en) · ditt (ett)"],["hans / hennes bil","his / her car","no change"],["vår bil / vårt hus","our car / house","vår (en) · vårt (ett)"],["era böcker","your books (pl.)","era (plural)"],["deras hus","their house","no change"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
    </div>
  );
}

function Plurals() {
  const groups=[{n:1,rule:"add -or",tc:C.teal,bg:C.tealBg,bc:C.tealBorder,ex:[["en flicka → flickor","girl → girls"],["en blomma → blommor","flower → flowers"],["en gata → gator","street → streets"]]},{n:2,rule:"add -ar",tc:C.gold,bg:C.goldBg,bc:C.goldBorder,ex:[["en bil → bilar","car → cars"],["en dag → dagar","day → days"],["en hand → händer*","hand → hands"]]},{n:3,rule:"add -er",tc:C.sky,bg:C.skyBg,bc:C.skyBorder,ex:[["en natt → nätter*","night → nights"],["en stad → städer*","city → cities"],["en tid → tider","time → times"]]},{n:4,rule:"add -n",tc:C.lavender,bg:C.lavenderBg,bc:C.lavenderBorder,ex:[["ett äpple → äpplen","apple → apples"],["ett rike → riken","realm → realms"],["ett hjärta → hjärtan","heart → hearts"]]},{n:5,rule:"no change",tc:C.rose,bg:C.roseBg,bc:C.roseBorder,ex:[["ett hus → hus","house → houses"],["ett år → år","year → years"],["en lärare → lärare","teacher → teachers"]]}];
  return (
    <div>
      <Section title="Five Declension Classes">
        <RuleBox>en-words: groups 1–3. ett-words: groups 4–5.</RuleBox>
        <Grid2>{groups.map(g=>(
          <div key={g.n} className={cn("rounded-xl p-3.5 border", g.bg, g.bc)}>
            <div className="flex gap-2 items-center mb-3 flex-wrap"><Tag colorClass={g.tc} bgClass={g.bg} borderClass={g.bc}>Group {g.n}</Tag><span className={cn("font-serif text-[15px]", g.tc)}>{g.rule}</span></div>
            {g.ex.map(([sv,en])=><Row key={sv} sv={sv} en={en} colorClass={g.tc}/>)}
          </div>
        ))}</Grid2>
        <div className="mt-3"><RuleBox colorClass={C.sage} bgClass={C.sageBg} borderClass={C.sageBorder}>* Umlaut plurals — <em>hand→händer, stad→städer, man→män</em> — must be memorised.</RuleBox></div>
      </Section>
    </div>
  );
}

// ─── MORE CONTENT ─────────────────────────────────────────────────────────────

function CommonPhrases() {
  const cats=[
    {title:"Greetings & Farewells",tc:C.teal,rows:[["Hej / Hallå","Hi / Hello"],["God morgon","Good morning"],["God kväll","Good evening"],["Hej då","Goodbye"],["Vi ses","See you later"],["Ha det bra","Take care"]]},
    {title:"Polite Expressions",tc:C.gold,rows:[["Tack (så mycket)","Thank you (very much)"],["Varsågod","You're welcome"],["Förlåt","Sorry"],["Ursäkta","Excuse me"],["Snälla","Please"],["Ingen fara","No problem"]]},
    {title:"Getting Around",tc:C.sky,rows:[["Var är...?","Where is...?"],["Hur kommer jag till...?","How do I get to...?"],["Till vänster","To the left"],["Till höger","To the right"],["Rakt fram","Straight ahead"],["Stanna här","Stop here"]]},
    {title:"Food & Drink",tc:C.rose,rows:[["Kan jag få...?","Can I have...?"],["Jag är allergisk mot...","I'm allergic to..."],["Vad rekommenderar du?","What do you recommend?"],["Det var gott","That was delicious"],["Kan jag få notan?","Can I have the bill?"],["En kaffe, tack","A coffee, please"]]},
    {title:"Emergencies",tc:C.lavender,rows:[["Ring ambulansen!","Call an ambulance!"],["Ring polisen!","Call the police!"],["Jag behöver hjälp","I need help"],["Var är sjukhuset?","Where is the hospital?"],["Jag har förlorat mitt pass","I've lost my passport"],["Jag förstår inte","I don't understand"]]},
  ];
  return (
    <div>
      {cats.map(cat=>(
        <Section key={cat.title} title={cat.title}>
          {cat.rows.map(([sv,en])=><Row key={sv} sv={sv} en={en} colorClass={cat.tc}/>)}
        </Section>
      ))}
    </div>
  );
}

function Numbers() {
  const { isMobile } = useBreakpoint();
  const nums1to20=[["noll","0"],["ett / en","1"],["två","2"],["tre","3"],["fyra","4"],["fem","5"],["sex","6"],["sju","7"],["åtta","8"],["nio","9"],["tio","10"],["elva","11"],["tolv","12"],["tretton","13"],["fjorton","14"],["femton","15"],["sexton","16"],["sjutton","17"],["arton","18"],["nitton","19"],["tjugo","20"]];
  const tens=[["trettio","30"],["fyrtio","40"],["femtio","50"],["sextio","60"],["sjuttio","70"],["åttio","80"],["nittio","90"],["hundra","100"],["tusen","1,000"],["en miljon","1,000,000"]];
  const ordinals=[["första","1st"],["andra","2nd"],["tredje","3rd"],["fjärde","4th"],["femte","5th"],["sjätte","6th"],["sjunde","7th"],["åttonde","8th"],["nionde","9th"],["tionde","10th"]];
  return (
    <div>
      <Section title="1 – 20">
        <div className={cn("grid gap-2", isMobile ? "grid-cols-3" : "grid-cols-4")}>
          {nums1to20.map(([sv,en])=>(
            <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5 flex justify-between items-center gap-1.5">
              <div className="flex gap-1.5 items-center"><SpeakBtn word={sv.split(" ")[0]} small/><span className={cn("font-serif text-[15px]", C.sky)}>{sv}</span></div>
              <span className="font-mono text-xs text-muted-foreground">{en}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Tens & Large Numbers">
        <RuleBox colorClass={C.sky} bgClass={C.skyBg} borderClass={C.skyBorder}><strong>Compound numbers:</strong> tjugo + ett = tjugoett (21), hundra + femtio + tre = hundrafemtitre (153)</RuleBox>
        <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-3")}>
          {tens.map(([sv,en])=>(
            <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5 flex justify-between items-center gap-1.5">
              <div className="flex gap-1.5 items-center"><SpeakBtn word={sv} small/><span className={cn("font-serif text-[15px]", C.gold)}>{sv}</span></div>
              <span className="font-mono text-xs text-muted-foreground">{en}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Ordinal Numbers">
        {ordinals.map(([sv,en])=><Row key={sv} sv={sv} en={en} colorClass={C.lavender}/>)}
      </Section>
      <Section title="Useful Number Phrases">
        {[["Klockan är tre","It's three o'clock"],["Den femte maj","The fifth of May"],["Jag är tjugotre år","I am twenty-three years old"],["Det kostar tjugo kronor","It costs twenty kronor"]].map(([sv,en])=><Row key={sv} sv={sv} en={en}/>)}
      </Section>
    </div>
  );
}

function DaysMonths() {
  const { isMobile } = useBreakpoint();
  return (
    <div>
      <Section title="Days of the Week">
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}>Days are <strong>not capitalised</strong> in Swedish. The week starts on Monday.</RuleBox>
        <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-4")}>
          {[["måndag","Monday","mån"],["tisdag","Tuesday","tis"],["onsdag","Wednesday","ons"],["torsdag","Thursday","tor"],["fredag","Friday","fre"],["lördag","Saturday","lör"],["söndag","Sunday","sön"]].map(([sv,en,abbr])=>(
            <div key={sv} className="bg-muted/50 rounded-lg px-3.5 py-3 border border-border">
              <div className="flex justify-between items-center mb-1">
                <span className={cn("font-serif text-base", C.lavender)}>{sv}</span>
                <SpeakBtn word={sv} small/>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-xs">{en}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{abbr}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Months of the Year">
        <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-4")}>
          {[["januari","January"],["februari","February"],["mars","March"],["april","April"],["maj","May"],["juni","June"],["juli","July"],["augusti","August"],["september","September"],["oktober","October"],["november","November"],["december","December"]].map(([sv,en])=>(
            <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5 flex justify-between items-center gap-1.5">
              <div className="flex gap-1.5 items-center"><SpeakBtn word={sv} small/><span className={cn("font-serif text-[15px]", C.sage)}>{sv}</span></div>
              <span className="font-mono text-[11px] text-muted-foreground">{en}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Useful Time Phrases">
        {[["idag","today"],["igår","yesterday"],["imorgon","tomorrow"],["i veckan","this week"],["förra veckan","last week"],["nästa vecka","next week"],["i år","this year"],["förra året","last year"],["på måndag","on Monday"],["varje dag","every day"]].map(([sv,en])=><Row key={sv} sv={sv} en={en} colorClass={C.lavender}/>)}
      </Section>
    </div>
  );
}

function Consonants() {
  const sounds=[
    {sound:"sj-",tc:C.rose,bg:C.roseBg,bc:C.roseBorder,desc:"A breathy 'sh' further back in the throat — unique to Swedish",words:[["sjö","lake","shuh"],["sjukhus","hospital","shuu-hoos"],["hjälp","help","yelp"],["köra","to drive","shuh-ra"]]},
    {sound:"tj- / kj-",tc:C.gold,bg:C.goldBg,bc:C.goldBorder,desc:"Like 'ch' in 'cheese' but softer, made near the front of the mouth",words:[["tjugo","twenty","choo-go"],["tjej","girl","chey"],["kjol","skirt","chool"]]},
    {sound:"Soft G (before e/i/y/ä/ö)",tc:C.teal,bg:C.tealBg,bc:C.tealBorder,desc:"Before front vowels, 'g' sounds like 'y' in 'yes'",words:[["ge","give","yeh"],["gillar","likes","yil-ar"],["göra","to do","yuh-ra"],["gäst","guest","yest"]]},
    {sound:"Soft K (before e/i/y/ä/ö)",tc:C.sky,bg:C.skyBg,bc:C.skyBorder,desc:"Before front vowels, 'k' gives the same sound as tj-",words:[["kär","dear/in love","shair"],["köpa","to buy","shuh-pa"],["kyckling","chicken","shyk-ling"]]},
    {sound:"Hard G / K (before a/o/u/å)",tc:C.sage,bg:C.sageBg,bc:C.sageBorder,desc:"Before back vowels, 'g' and 'k' sound as in English",words:[["gå","to go","go"],["katt","cat","katt"],["komma","to come","ko-ma"]]},
    {sound:"rs- cluster",tc:C.lavender,bg:C.lavenderBg,bc:C.lavenderBorder,desc:"'rs' merges into a retroflex 'sh' sound (tongue curls back)",words:[["börja","to start","bur-ya"],["mars","March","marsh"],["Lars","(name)","Lash"]]},
  ];
  return (
    <div>
      <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>Swedish consonants are generally consistent — but a few combinations create sounds that don't exist in English. These are the ones worth focusing on.</RuleBox>
      {sounds.map(s=>(
        <Section key={s.sound} title={s.sound}>
          <RuleBox colorClass={s.tc} bgClass={s.bg} borderClass={s.bc}>{s.desc}</RuleBox>
          <div className="grid grid-cols-2 gap-2">
            {s.words.map(([sv,en,pron])=>(
              <div key={sv} className="bg-muted/50 rounded-lg px-3 py-2.5">
                <div className="flex gap-2 items-center mb-1">
                  <SpeakBtn word={sv} small/>
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

function ModalVerbs() {
  const { isMobile } = useBreakpoint();
  const modals = [
    { sv:"kan",    en:"can / be able to",   past:"kunde",   note:"ability or possibility",       tc:C.teal,bg:C.tealBg,bc:C.tealBorder,
      examples:[["Jag kan simma","I can swim"],["Kan du hjälpa mig?","Can you help me?"],["Det kan vara sant","It might be true"]] },
    { sv:"ska",    en:"shall / will / going to", past:"skulle", note:"future plans, intention",  tc:C.gold,bg:C.goldBg,bc:C.goldBorder,
      examples:[["Jag ska resa imorgon","I'm going to travel tomorrow"],["Ska vi gå?","Shall we go?"],["Det ska bli bra","It will be fine"]] },
    { sv:"vill",   en:"want to",             past:"ville",   note:"desire or wish",               tc:C.lavender,bg:C.lavenderBg,bc:C.lavenderBorder,
      examples:[["Jag vill lära mig svenska","I want to learn Swedish"],["Vill du ha kaffe?","Do you want coffee?"],["Jag ville stanna","I wanted to stay"]] },
    { sv:"måste",  en:"must / have to",      past:"måste",   note:"necessity — same in past!",    tc:C.rose,bg:C.roseBg,bc:C.roseBorder,
      examples:[["Jag måste gå nu","I have to go now"],["Du måste äta","You must eat"],["Vi måste ta bussen","We have to take the bus"]] },
    { sv:"får",    en:"may / get to / is allowed", past:"fick", note:"permission or acquisition", tc:C.sky,bg:C.skyBg,bc:C.skyBorder,
      examples:[["Får jag fråga?","May I ask?"],["Jag fick en present","I got a gift"],["Du får inte röka här","You're not allowed to smoke here"]] },
    { sv:"borde",  en:"should / ought to",   past:"borde",   note:"recommendation — same in past!", tc:C.sage,bg:C.sageBg,bc:C.sageBorder,
      examples:[["Du borde vila","You should rest"],["Jag borde studera mer","I ought to study more"],["Vi borde fråga","We should ask"]] },
    { sv:"behöver",en:"need to",             past:"behövde", note:"necessity / need",              tc:C.gold,bg:C.goldBg,bc:C.goldBorder,
      examples:[["Jag behöver hjälp","I need help"],["Du behöver inte komma","You don't need to come"],["Vi behövde vänta","We needed to wait"]] },
  ];

  return (
    <div>
      <Section title="Modal Verbs Overview">
        <RuleBox colorClass={C.gold} bgClass={C.goldBg} borderClass={C.goldBorder}>
          Modal verbs come <strong>before the main verb</strong>, which stays in its infinitive form (no ending). Like English: "I <em>can</em> swim" → <em>jag kan simma</em>. Same form for all persons!
        </RuleBox>
        <div className="bg-muted/50 rounded-xl p-3.5 mb-4">
          <div className="font-mono text-[11px] text-muted-foreground mb-2.5">PATTERN</div>
          <div className="flex gap-2 flex-wrap items-center">
            {[["Subject",C.teal,C.tealBg,"jag"],["Modal verb",C.gold,C.goldBg,"kan"],["Infinitive",C.lavender,C.lavenderBg,"simma"]].map(([label,tc,bg,ex],i)=> (
              <div key={i} className="text-center">
                <div className={cn("font-serif px-3 py-1 rounded-lg", isMobile ? "text-base" : "text-xl", tc, bg)}>{ex}</div>
                <div className={cn("font-mono text-[9px] opacity-70 mt-0.5", tc)}>{label}</div>
              </div>
            ))}
            <span className="text-muted-foreground text-xl">=</span>
            <span className="text-muted-foreground text-sm font-serif italic">I can swim</span>
          </div>
        </div>
      </Section>

      {modals.map(m => (
        <Section key={m.sv} title={`${m.sv} — ${m.en}`}>
          <div className="flex gap-2 items-center mb-3 flex-wrap">
            <Tag colorClass={m.tc} bgClass={m.bg} borderClass={m.bc}>{m.note}</Tag>
            <span className="font-mono text-[11px] text-muted-foreground">past: <span className={m.tc}>{m.past}</span></span>
          </div>
          {m.examples.map(([sv,en]) => <Row key={sv} sv={sv} en={en} colorClass={m.tc} />)}
        </Section>
      ))}

      <Section title="Negation with Modals">
        <RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}>
          Place <strong>inte</strong> after the modal verb: <em>jag kan inte simma</em> (I can't swim). With <em>behöver</em>, "don't need to" → <em>behöver inte</em>.
        </RuleBox>
        {[
          ["Jag kan inte komma","I can't come","kan + inte"],
          ["Hon vill inte äta","She doesn't want to eat","vill + inte"],
          ["Vi måste inte betala","We don't have to pay","måste + inte"],
          ["Du behöver inte ringa","You don't need to call","behöver + inte"],
          ["Jag ska inte gå dit","I'm not going there","ska + inte"],
        ].map(([sv,en,note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>

      <Section title="Conditional: skulle (would)">
        <RuleBox colorClass={C.lavender} bgClass={C.lavenderBg} borderClass={C.lavenderBorder}>
          <strong>skulle</strong> is the past of <em>ska</em> and also means "would". Use it for polite requests, hypotheticals and reported speech.
        </RuleBox>
        {[
          ["Jag skulle vilja ha kaffe","I would like to have coffee","polite request"],
          ["Skulle du kunna hjälpa mig?","Could you help me?","polite question"],
          ["Om jag hade tid, skulle jag resa","If I had time, I would travel","conditional"],
          ["Han sa att han skulle komma","He said he would come","reported speech"],
        ].map(([sv,en,note]) => <Row key={sv} sv={sv} en={en} note={note} />)}
      </Section>
    </div>
  );
}

function ReflexiveVerbs() {
  const { isMobile } = useBreakpoint();
  const reflexPronouns = [
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

  return (
    <div>
      <Section title="What Are Reflexive Verbs?">
        <RuleBox colorClass={C.teal} bgClass={C.tealBg} borderClass={C.tealBorder}>
          A <strong>reflexive verb</strong> is one where the subject and object are the same person — "I wash <em>myself</em>". In Swedish the reflexive pronoun changes by person. Once you learn the pattern, it applies to dozens of very common verbs.
        </RuleBox>
        <div className="bg-muted/50 rounded-xl p-3.5 mb-4">
          <div className="font-mono text-[11px] text-muted-foreground mb-3">REFLEXIVE PRONOUNS — tvätta sig (to wash oneself)</div>
          {reflexPronouns.map(([subj,refl,ex]) => (
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
            {v.ex.map(([sv,en]) => (
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
        ].map(([sv,en,verb]) => <Row key={sv} sv={sv} en={en} note={verb} colorClass={C.sage} />)}
      </Section>

      <Section title="Deponent Verbs — Only Reflexive Form Exists">
        <RuleBox colorClass={C.rose} bgClass={C.roseBg} borderClass={C.roseBorder}>
          Some Swedish verbs <em>look</em> reflexive (end in <strong>-s</strong>) but have no non-reflexive form. They're called deponent verbs. You just have to learn them as-is.
        </RuleBox>
        {[
          ["hoppas","to hope","Jag hoppas det går bra"],
          ["minnas","to remember","Minns du mig?"],
          ["trivas","to feel at home","Hon trivs i Sverige"],
          ["hetas / heta","to be named","Jag heter Erik"],
          ["finnas","to exist / be found","Det finns mjölk","there is milk"],
          ["verkas","to seem","Det verkar bra","it seems good"],
        ].map(([sv,en,ex,exEn]) => (
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

// ─── TAB CONFIG ───────────────────────────────────────────────────────────────
const MAIN_TABS = [
  { id:"flashcards", label:"Flashcards", emoji:"🃏" },
  { id:"vowels",     label:"Vowels",     emoji:"🔤" },
  { id:"grammar",    label:"Grammar",    emoji:"📖" },
  { id:"content",    label:"More",       emoji:"📚" },
];

const GRAMMAR_TABS = [
  { id:"nouns",     label:"Nouns",     emoji:"🔡", C:NounsGender },
  { id:"articles",  label:"Articles",  emoji:"📌", C:Articles },
  { id:"verbs",     label:"Verbs",     emoji:"⚡", C:Verbs },
  { id:"wordorder", label:"Word Order",emoji:"↔️", C:WordOrder },
  { id:"adjectives",label:"Adjectives",emoji:"🎨", C:Adjectives },
  { id:"pronouns",  label:"Pronouns",  emoji:"👤", C:Pronouns },
  { id:"plurals",   label:"Plurals",   emoji:"✳️", C:Plurals },
  { id:"modals",    label:"Modals",    emoji:"🔧", C:ModalVerbs },
  { id:"reflexive", label:"Reflexive", emoji:"🔄", C:ReflexiveVerbs },
];

const CONTENT_TABS = [
  { id:"phrases",    label:"Phrases",   emoji:"💬", C:CommonPhrases },
  { id:"numbers",    label:"Numbers",   emoji:"🔢", C:Numbers },
  { id:"days",       label:"Days",      emoji:"📅", C:DaysMonths },
  { id:"consonants", label:"Consonants",emoji:"🔊", C:Consonants },
];

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mainTab, setMainTab]       = useState("flashcards");
  const [grammarTab, setGrammarTab] = useState("nouns");
  const [contentTab, setContentTab] = useState("phrases");
  const [activeVowel, setActiveVowel] = useState(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const { canInstall, install, installed } = usePWAInstall();

  const GComp = GRAMMAR_TABS.find(t=>t.id===grammarTab)?.C;
  const CComp = CONTENT_TABS.find(t=>t.id===contentTab)?.C;

  const showBanner = canInstall && !installed && !bannerDismissed;

  function SubTabBar({ tabs, active, setActive }) {
    return (
      <div className="overflow-x-auto mb-5">
        <div className="flex gap-1 bg-muted rounded-xl p-1.5 border border-border min-w-fit">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActive(t.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-[11px] cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 font-mono",
                isMobile && "px-2.5 text-[10px]",
                active===t.id
                  ? "border-amber-700/50 bg-amber-950/25 text-amber-400/80 font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card"
              )}>
              <span>{t.emoji}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans pb-16">
      {/* PWA Install Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-card border-t border-amber-800/40 px-4 py-3.5 flex items-center gap-3 shadow-lg"
          style={{ paddingBottom: `calc(14px + env(safe-area-inset-bottom))` }}>
          <div className="w-[42px] h-[42px] rounded-lg shrink-0 bg-amber-950/25 border border-amber-800/40 flex items-center justify-center font-serif text-[22px] text-amber-400/80 font-bold">
            Sv
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-foreground text-[13px] font-semibold mb-0.5">Install Svenska</div>
            <div className="text-muted-foreground text-[11px] font-mono">Add to home screen · works offline</div>
          </div>
          <Button onClick={install} size="sm" className="shrink-0 font-mono text-xs font-bold tracking-wide bg-amber-700/60 hover:bg-amber-700/80 text-amber-100">
            Install
          </Button>
          <button onClick={()=>setBannerDismissed(true)} className="bg-transparent border-none text-muted-foreground cursor-pointer text-lg px-1.5 py-1 leading-none shrink-0 hover:text-foreground">
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className={cn("text-center", isMobile ? "px-4 pt-6 pb-4" : "px-5 pt-9 pb-5")}>
        <div className="inline-block font-mono text-[9px] tracking-[0.18em] uppercase text-muted-foreground border border-border px-3.5 py-0.5 rounded-full mb-2.5">
          Svenska · Swedish for English Speakers
        </div>
        <h1 className={cn("font-serif text-foreground mb-1 font-bold", isMobile ? "text-[26px]" : "text-[clamp(26px,5vw,44px)]")}>
          Language Guide<span className="text-amber-500/70">.</span>
        </h1>
        <p className="text-muted-foreground font-serif italic text-[13px]">Pronunciation · Grammar · Vocabulary · Practice</p>
      </div>

      {/* Main tab bar */}
      <div className={cn("overflow-x-auto px-4", isMobile ? "mb-4" : "mb-6")}>
        <div className="flex justify-center gap-1.5 min-w-fit mx-auto w-fit">
          {MAIN_TABS.map(t=>(
            <button key={t.id} onClick={()=>setMainTab(t.id)}
              className={cn(
                "px-4 py-2 rounded-full border-2 font-mono text-xs font-semibold tracking-wider cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5",
                isMobile && "px-3.5 py-2 text-[10px]",
                mainTab===t.id
                  ? "border-amber-700/50 bg-amber-950/25 text-amber-400/80"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
              )}>
              <span>{t.emoji}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={cn("max-w-[960px] mx-auto", isMobile ? "px-3" : "px-5")}>

        {mainTab==="flashcards" && <FlashCards/>}

        {mainTab==="vowels" && (
          <div>
            <div className="mb-5 overflow-x-auto">
              <div className="inline-flex gap-5 bg-card border border-border rounded-xl px-5 py-3 min-w-fit">
                {[{label:"Short vowel",sub:"2+ consonants follow",ex:"katt"},{label:"Long vowel",sub:"1 or 0 consonants",ex:"dag"}].map(item=>(
                  <div key={item.label}>
                    <div className="text-foreground text-xs font-medium">{item.label}</div>
                    <div className="text-muted-foreground text-[10px] font-mono">{item.sub}</div>
                    <div className={cn("mt-0.5 font-serif text-sm", C.gold)}>{item.ex}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn("grid gap-3", isMobile ? "grid-cols-2" : "grid-cols-3")}>
              {VOWELS.map((v,i)=><VowelCard key={v.letter} vowel={v} isActive={activeVowel===i} onClick={()=>setActiveVowel(activeVowel===i?null:i)}/>)}
            </div>
            <p className="text-center mt-7 text-muted-foreground/50 text-[11px] font-mono">💡 katt (cat) vs kat (rag) — vowel length changes meaning</p>
          </div>
        )}

        {mainTab==="grammar" && (
          <div>
            <SubTabBar tabs={GRAMMAR_TABS} active={grammarTab} setActive={setGrammarTab}/>
            {GComp && <GComp/>}
          </div>
        )}

        {mainTab==="content" && (
          <div>
            <SubTabBar tabs={CONTENT_TABS} active={contentTab} setActive={setContentTab}/>
            {CComp && <CComp/>}
          </div>
        )}

      </div>
    </div>
  );
}
