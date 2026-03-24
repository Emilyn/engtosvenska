import { useState, useEffect, useCallback } from "react";
import { usePWAInstall } from "./usePWA.js";

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

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  bg:"#080b14", surface:"#0e1220", border:"#1c2238", borderLight:"#252d48",
  text:"#e8eeff", muted:"#5a6a90", faint:"#131a2e",
  gold:"#c8a96e", teal:"#6fb4a8", rose:"#c47a7a",
  sky:"#7aaac8", sage:"#8aaa80", lavender:"#a48ac8",
};

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
function Tag({ children, color = C.gold }) {
  return <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", padding:"2px 9px", borderRadius:20, background:`${color}18`, color, border:`1px solid ${color}44`, whiteSpace:"nowrap" }}>{children}</span>;
}

function SpeakBtn({ word, small }) {
  const [on, setOn] = useState(false);
  return (
    <button onClick={e => { e.stopPropagation(); setOn(true); speak(word); setTimeout(() => setOn(false), 1400); }}
      style={{ flexShrink:0, background:on?C.gold:"transparent", border:`1px solid ${on?C.gold:C.borderLight}`, borderRadius:7, padding:small?"4px 9px":"6px 13px", cursor:"pointer", color:on?C.bg:C.muted, fontSize:13, transition:"all .2s", display:"inline-flex", alignItems:"center", justifyContent:"center", minWidth:32 }}>
      {on ? "▶" : "♪"}
    </button>
  );
}

function Row({ sv, en, note, color = C.text }) {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{ display:"flex", alignItems:isMobile?"flex-start":"center", gap:8, padding:"10px 12px", borderRadius:8, background:C.faint, marginBottom:6, flexWrap:isMobile?"wrap":"nowrap" }}>
      <SpeakBtn word={sv} small />
      <span style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?14:16, color, flexShrink:0, minWidth:isMobile?"unset":110 }}>{sv}</span>
      <span style={{ color:C.muted, fontSize:13, flex:1, minWidth:0 }}>= {en}</span>
      {note && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:C.muted, background:C.surface, padding:"2px 7px", borderRadius:5, whiteSpace:"nowrap", flexShrink:0 }}>{note}</span>}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom:32 }}>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:C.text, margin:"0 0 14px", paddingBottom:10, borderBottom:`1px solid ${C.border}` }}>{title}</h3>
      {children}
    </div>
  );
}

function RuleBox({ children, color = C.gold }) {
  return <div style={{ border:`1px solid ${color}33`, borderLeft:`3px solid ${color}`, borderRadius:"0 10px 10px 0", padding:"12px 16px", background:`${color}08`, marginBottom:16, fontFamily:"'Lora',serif", fontSize:13, color:C.text, lineHeight:1.65 }}>{children}</div>;
}

function Grid2({ children }) {
  const { isTablet } = useBreakpoint();
  return <div style={{ display:"grid", gridTemplateColumns:isTablet?"1fr":"1fr 1fr", gap:12 }}>{children}</div>;
}

// ─── FLASHCARD DATA ───────────────────────────────────────────────────────────
const DECKS = [
  {
    id:"greetings", label:"Greetings", emoji:"👋", color:C.teal,
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
    id:"phrases", label:"Phrases", emoji:"💬", color:C.gold,
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
    id:"numbers", label:"Numbers", emoji:"🔢", color:C.sky,
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
    id:"days", label:"Days & Months", emoji:"📅", color:C.lavender,
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
    id:"nouns", label:"Common Nouns", emoji:"📦", color:C.rose,
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
    id:"top1", label:"Top Words 1–50", emoji:"⭐", color:"#c8a96e",
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
    id:"top2", label:"Top Words 51–100", emoji:"🌟", color:"#88B4A8",
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
    id:"adjectives_fc", label:"Core Adjectives", emoji:"🎨", color:"#a48ac8",
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
    id:"falsefriends", label:"False Friends ⚠️", emoji:"⚠️", color:"#c47a7a",
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
    id:"verbs", label:"Key Verbs", emoji:"⚡", color:C.sage,
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
  const [known, setKnown]       = useState({});   // cardKey -> bool
  const [sessionDone, setSessionDone] = useState(false);
  const [showFront, setShowFront] = useState(true); // front = Swedish

  const deck = DECKS.find(d => d.id === deckId);
  const cards = deck ? deck.cards : [];
  const card  = cards[cardIdx] || null;
  const cardKey = deck ? `${deck.id}-${cardIdx}` : null;

  const knownCount   = Object.values(known).filter(Boolean).length;
  const unknownCount = Object.values(known).filter(v => !v).length;
  const answeredCount = Object.keys(known).length;

  function startDeck(id) {
    setDeckId(id); setCardIdx(0); setFlipped(false);
    setKnown({}); setSessionDone(false); setShowFront(true);
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
    // rebuild deck of only unknown
    const missed = cards.filter((_, i) => known[`${deck.id}-${i}`] === false);
    if (!missed.length) return;
    setKnown({}); setCardIdx(0); setFlipped(false); setSessionDone(false);
  }

  // ── Deck picker ──
  if (!deckId) return (
    <div>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:C.text, margin:"0 0 6px" }}>Flashcard Decks</h2>
        <p style={{ color:C.muted, fontFamily:"'Lora',serif", fontStyle:"italic", fontSize:13, margin:0 }}>Pick a deck to practise</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(3,1fr)", gap:12 }}>
        {DECKS.map(d => (
          <button key={d.id} onClick={() => startDeck(d.id)} style={{
            background:C.surface, border:`1.5px solid ${d.color}33`,
            borderRadius:14, padding:"20px 16px", cursor:"pointer",
            textAlign:"left", transition:"all .2s",
            display:"flex", flexDirection:"column", gap:10,
          }}
            onMouseEnter={e => e.currentTarget.style.border=`1.5px solid ${d.color}`}
            onMouseLeave={e => e.currentTarget.style.border=`1.5px solid ${d.color}33`}
          >
            <span style={{ fontSize:28 }}>{d.emoji}</span>
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:d.color, marginBottom:3 }}>{d.label}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:C.muted }}>{d.cards.length} cards</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Session complete ──
  if (sessionDone) {
    const pct = Math.round((knownCount / cards.length) * 100);
    const missedCards = cards.filter((_, i) => known[`${deck.id}-${i}`] === false);
    return (
      <div style={{ maxWidth:480, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:16 }}>{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:C.text, margin:"0 0 6px" }}>Session Complete!</h2>
        <p style={{ color:C.muted, fontFamily:"'Lora',serif", fontStyle:"italic", marginBottom:24 }}>{deck.label} · {cards.length} cards</p>

        {/* Score ring */}
        <div style={{ display:"flex", justifyContent:"center", gap:20, marginBottom:28 }}>
          {[{label:"Knew it", count:knownCount, color:C.sage},{label:"Review", count:unknownCount, color:C.rose}].map(s => (
            <div key={s.label} style={{ background:C.surface, border:`1px solid ${s.color}33`, borderRadius:12, padding:"16px 24px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:34, color:s.color, fontWeight:700 }}>{s.count}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:".08em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Missed words */}
        {missedCards.length > 0 && (
          <div style={{ background:C.faint, borderRadius:12, padding:16, marginBottom:24, textAlign:"left" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:".08em", marginBottom:10 }}>To review</div>
            {missedCards.map(c => (
              <div key={c.sv} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}`, alignItems:"center", gap:8 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <SpeakBtn word={c.sv} small />
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:C.rose }}>{c.sv}</span>
                </div>
                <span style={{ color:C.muted, fontSize:13 }}>{c.en}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          {missedCards.length > 0 && (
            <button onClick={reviewMissed} style={{ padding:"10px 22px", borderRadius:10, border:`1.5px solid ${C.rose}`, background:`${C.rose}14`, color:C.rose, cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:600 }}>
              Review {missedCards.length} missed
            </button>
          )}
          <button onClick={restart} style={{ padding:"10px 22px", borderRadius:10, border:`1.5px solid ${C.gold}`, background:`${C.gold}14`, color:C.gold, cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:600 }}>
            Restart deck
          </button>
          <button onClick={() => setDeckId(null)} style={{ padding:"10px 22px", borderRadius:10, border:`1.5px solid ${C.border}`, background:"transparent", color:C.muted, cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:12 }}>
            All decks
          </button>
        </div>
      </div>
    );
  }

  // ── Active card ──
  const progress = cards.length > 0 ? ((cardIdx) / cards.length) * 100 : 0;

  return (
    <div style={{ maxWidth:520, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
        <button onClick={() => setDeckId(null)} style={{ background:"transparent", border:`1px solid ${C.border}`, borderRadius:8, padding:"5px 12px", color:C.muted, cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:11 }}>← Decks</button>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:deck.color }}>{deck.emoji} {deck.label}</span>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:C.muted }}>{cardIdx + 1} / {cards.length}</span>
          </div>
          {/* Progress bar */}
          <div style={{ height:4, background:C.faint, borderRadius:4, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`, background:deck.color, borderRadius:4, transition:"width .3s ease" }} />
          </div>
        </div>
      </div>

      {/* Session mini stats */}
      <div style={{ display:"flex", gap:8, marginBottom:18 }}>
        {[{label:"✓ Knew it", count:knownCount, color:C.sage},{label:"✗ Review", count:unknownCount, color:C.rose}].map(s => (
          <div key={s.label} style={{ flex:1, background:C.faint, borderRadius:8, padding:"6px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:C.muted }}>{s.label}</span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:s.color, fontWeight:700 }}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Card */}
      <div
        onClick={handleFlip}
        style={{
          background: flipped ? "#141e30" : C.surface,
          border: `2px solid ${flipped ? deck.color : C.border}`,
          borderRadius:20, padding: isMobile ? "40px 24px" : "52px 36px",
          cursor:"pointer", textAlign:"center", minHeight:220,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          transition:"all .25s", position:"relative", overflow:"hidden",
          boxShadow: flipped ? `0 12px 40px ${deck.color}18` : "none",
          userSelect:"none",
        }}>
        {/* Watermark */}
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:130, opacity:.03, fontFamily:"'Playfair Display',serif", fontWeight:700, color:deck.color, pointerEvents:"none" }}>
          {flipped ? "EN" : "SV"}
        </div>

        {!flipped ? (
          <>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:deck.color, letterSpacing:".15em", textTransform:"uppercase", marginBottom:16 }}>Swedish</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?28:36, color:C.text, fontWeight:700, marginBottom:14, lineHeight:1.2 }}>{card.sv}</div>
            <SpeakBtn word={card.sv} />
            <div style={{ marginTop:18, fontFamily:"'DM Mono',monospace", fontSize:11, color:C.muted }}>tap to reveal →</div>
          </>
        ) : (
          <>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:C.gold, letterSpacing:".15em", textTransform:"uppercase", marginBottom:12 }}>English</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?22:28, color:C.gold, fontWeight:600, marginBottom:10 }}>{card.en}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?16:20, color:C.muted, marginBottom:14 }}>{card.sv}</div>
            <SpeakBtn word={card.sv} />
          </>
        )}
      </div>

      {/* Answer buttons — only after flip */}
      {flipped ? (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:16 }}>
          <button onClick={() => handleAnswer(false)} style={{ padding:"14px", borderRadius:12, border:`2px solid ${C.rose}44`, background:`${C.rose}0e`, color:C.rose, cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, transition:"all .2s" }}>
            ✗ Review again
          </button>
          <button onClick={() => handleAnswer(true)} style={{ padding:"14px", borderRadius:12, border:`2px solid ${C.sage}44`, background:`${C.sage}0e`, color:C.sage, cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, transition:"all .2s" }}>
            ✓ Got it!
          </button>
        </div>
      ) : (
        <div style={{ display:"flex", gap:10, marginTop:16, justifyContent:"center" }}>
          <button onClick={handleFlip} style={{ padding:"12px 32px", borderRadius:12, border:`1.5px solid ${deck.color}`, background:`${deck.color}14`, color:deck.color, cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:600 }}>
            Flip card
          </button>
        </div>
      )}

      {/* Flip hint */}
      <p style={{ textAlign:"center", marginTop:12, color:C.borderLight, fontFamily:"'DM Mono',monospace", fontSize:10 }}>
        tap the card or press the button to flip
      </p>
    </div>
  );
}

// ─── VOWEL DATA ───────────────────────────────────────────────────────────────
const VOWELS = [
  { letter:"A", color:"#C8A96E", short:{ ipa:"/a/",  hint:"like 'a' in 'father' — but shorter",       word:"katt", meaning:"cat",         pron:"katt"  }, long:{ ipa:"/aː/", hint:"like 'a' in 'spa' — held longer",            word:"dag",  meaning:"day",         pron:"daag"  } },
  { letter:"E", color:"#88B4A8", short:{ ipa:"/ɛ/",  hint:"like 'e' in 'bed'",                         word:"vett", meaning:"sense",        pron:"vett"  }, long:{ ipa:"/eː/", hint:"like 'ay' in 'say' — pure, no glide",        word:"vet",  meaning:"knows",       pron:"veet"  } },
  { letter:"I", color:"#A8C5DA", short:{ ipa:"/ɪ/",  hint:"like 'i' in 'bit'",                         word:"vill", meaning:"wants",        pron:"vill"  }, long:{ ipa:"/iː/", hint:"like 'ee' in 'see' — held longer",           word:"vi",   meaning:"we",           pron:"vee"   } },
  { letter:"O", color:"#D4956A", short:{ ipa:"/ɔ/",  hint:"like 'o' in 'hot' — rounded lips",          word:"bott", meaning:"lived",        pron:"bott"  }, long:{ ipa:"/uː/", hint:"like 'oo' in 'moon' — very rounded",         word:"bo",   meaning:"to live",     pron:"boo"   } },
  { letter:"U", color:"#9DB8A0", short:{ ipa:"/ɵ/",  hint:"round lips like 'oo', tongue says 'ih'",    word:"full", meaning:"full",         pron:"full"  }, long:{ ipa:"/ʉː/", hint:"like French 'u' — lips rounded, tongue fwd", word:"hus",  meaning:"house",       pron:"hyoos" } },
  { letter:"Y", color:"#C4A8C8", short:{ ipa:"/ʏ/",  hint:"round lips, say 'ih' — German ü short",     word:"nytt", meaning:"new (neut.)",  pron:"nytt"  }, long:{ ipa:"/yː/", hint:"like French 'u' — lips rounded, high",       word:"ny",   meaning:"new",         pron:"nyy"   } },
  { letter:"Å", color:"#B8C4A8", short:{ ipa:"/ɔ/",  hint:"like 'o' in 'more' — rounded",              word:"håll", meaning:"hold",         pron:"holl"  }, long:{ ipa:"/oː/", hint:"like 'oa' in 'boat' — pure, no glide",       word:"år",   meaning:"year",        pron:"oar"   } },
  { letter:"Ä", color:"#D4B8A8", short:{ ipa:"/ɛ/",  hint:"like 'e' in 'bed' — mouth more open",       word:"ätt",  meaning:"family line",  pron:"ett"   }, long:{ ipa:"/ɛː/", hint:"like 'ai' in 'air' — held, mouth open",      word:"äta",  meaning:"to eat",      pron:"eeta"  } },
  { letter:"Ö", color:"#A8B8C8", short:{ ipa:"/œ/",  hint:"like 'ir' in 'bird' — rounded lips",        word:"öst",  meaning:"east",         pron:"urst"  }, long:{ ipa:"/øː/", hint:"like German 'ö' — lips fwd, rounded",        word:"öra",  meaning:"ear",         pron:"eura"  } },
];

function VowelCard({ vowel, isActive, onClick }) {
  const [mode, setMode] = useState("short");
  const [playing, setPlaying] = useState(false);
  const { isMobile } = useBreakpoint();
  const d = mode === "short" ? vowel.short : vowel.long;
  return (
    <div onClick={onClick} style={{ background:isActive?"#141928":C.surface, border:`1.5px solid ${isActive?vowel.color:C.border}`, borderRadius:14, padding:isMobile?14:18, cursor:"pointer", transition:"all .25s", transform:isActive?"translateY(-2px)":"none", boxShadow:isActive?`0 8px 28px ${vowel.color}18`:"none", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:-6, top:-10, fontSize:86, fontFamily:"'Playfair Display',serif", color:vowel.color, opacity:.05, fontWeight:700, userSelect:"none", pointerEvents:"none" }}>{vowel.letter}</div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?30:36, fontWeight:700, color:vowel.color, lineHeight:1 }}>{vowel.letter}</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:vowel.color, opacity:.85, background:`${vowel.color}18`, padding:"2px 8px", borderRadius:5 }}>{d.ipa}</span>
        <div style={{ marginLeft:"auto" }}><SpeakBtn word={d.word} /></div>
      </div>
      <div style={{ display:"flex", gap:5, marginBottom:10 }}>
        {["short","long"].map(m => (
          <button key={m} onClick={e=>{e.stopPropagation();setMode(m);}} style={{ padding:"3px 12px", borderRadius:20, border:"none", background:mode===m?vowel.color:C.faint, color:mode===m?C.bg:C.muted, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", cursor:"pointer", fontFamily:"'DM Mono',monospace", transition:"all .2s" }}>{m}</button>
        ))}
      </div>
      <p style={{ color:"#b8c8e8", fontSize:12, lineHeight:1.6, fontFamily:"'Lora',serif", fontStyle:"italic", margin:"0 0 12px" }}>{d.hint}</p>
      <div style={{ background:C.bg, borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:6, flexWrap:"wrap" }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:19, color:C.text, fontWeight:600 }}>{d.word}</span>
        <span style={{ fontSize:11, color:C.muted, fontFamily:"'DM Mono',monospace" }}>= {d.meaning}</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#445070" }}>"{d.pron}"</span>
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
        <RuleBox color={C.teal}>Swedish nouns are either <strong style={{color:C.teal}}>en-words</strong> (~75%) or <strong style={{color:C.gold}}>ett-words</strong> (~25%).</RuleBox>
        <Grid2>
          {[{label:"en-word",color:C.teal,tag:"~75%",rows:[["en bil","a car"],["en bok","a book"],["en hund","a dog"],["en stol","a chair"]]},{label:"ett-word",color:C.gold,tag:"~25%",rows:[["ett hus","a house"],["ett barn","a child"],["ett bord","a table"],["ett äpple","an apple"]]}].map(col=>(
            <div key={col.label} style={{background:C.faint,borderRadius:12,padding:14,border:`1px solid ${col.color}22`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}><span style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:col.color}}>{col.label}</span><Tag color={col.color}>{col.tag}</Tag></div>
              {col.rows.map(([sv,en])=><Row key={sv} sv={sv} en={en} color={col.color}/>)}
            </div>
          ))}
        </Grid2>
        <div style={{marginTop:12}}><RuleBox color={C.rose}><strong>💡 Patterns:</strong> <strong>-ing,-tion,-het,-are</strong> → en. <strong>-ande,-ment,-um</strong> → ett.</RuleBox></div>
      </Section>
      <Section title="Quick Quiz — en or ett?">
        <div style={{background:C.faint,borderRadius:14,padding:"24px 16px",textAlign:"center",border:`1px solid ${C.border}`}}>
          <div style={{marginBottom:6,color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:11}}>QUESTION {(qi%quizWords.length)+1} / {quizWords.length}</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:6}}><span style={{fontFamily:"'Playfair Display',serif",fontSize:38,color:C.text}}>{q.word}</span><SpeakBtn word={q.word}/></div>
          <div style={{color:C.muted,fontFamily:"'Lora',serif",fontStyle:"italic",marginBottom:22,fontSize:14}}>"{q.en}"</div>
          {answer===null ? (
            <div style={{display:"flex",gap:14,justifyContent:"center"}}>
              {["en","ett"].map(g=><button key={g} onClick={()=>setAnswer(g)} style={{padding:"10px 38px",borderRadius:10,border:`2px solid ${C.borderLight}`,background:C.surface,color:C.text,fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif",cursor:"pointer"}}>{g}</button>)}
            </div>
          ) : (
            <div>
              <div style={{fontSize:20,marginBottom:14,color:answer===q.g?C.sage:C.rose}}>{answer===q.g?"✓ Rätt! (Correct!)":` ✗ It's "${q.g} ${q.word}"`}</div>
              <button onClick={()=>{setAnswer(null);setQi(qi+1);}} style={{padding:"8px 26px",borderRadius:8,border:`1px solid ${C.gold}`,background:"transparent",color:C.gold,cursor:"pointer",fontSize:13,fontFamily:"'DM Mono',monospace"}}>Next →</button>
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
        <RuleBox color={C.teal}>Use <strong style={{color:C.teal}}>en</strong> before common-gender nouns, <strong style={{color:C.gold}}>ett</strong> before neuter nouns.</RuleBox>
        {[["en bil","a car"],["en hund","a dog"],["ett hus","a house"],["ett barn","a child"]].map(([sv,en])=><Row key={sv} sv={sv} en={en}/>)}
      </Section>
      <Section title="Definite Articles (the) — Suffixed!">
        <RuleBox color={C.gold}>🇸🇪 "The" is <strong>attached to the end</strong> of the noun as a suffix!</RuleBox>
        <Grid2>
          {[{title:"en-words → -en or -n",color:C.teal,rows:[["en bil → bilen","the car"],["en bok → boken","the book"],["en flicka → flickan","the girl"]]},{title:"ett-words → -et or -t",color:C.gold,rows:[["ett hus → huset","the house"],["ett barn → barnet","the child"],["ett äpple → äpplet","the apple"]]}].map(col=>(
            <div key={col.title} style={{background:C.faint,borderRadius:12,padding:14,border:`1px solid ${col.color}22`}}>
              <div style={{color:col.color,fontSize:11,fontFamily:"'DM Mono',monospace",marginBottom:12}}>{col.title}</div>
              {col.rows.map(([sv,en])=><Row key={sv} sv={sv} en={en} color={col.color}/>)}
            </div>
          ))}
        </Grid2>
        <div style={{marginTop:12}}><RuleBox color={C.lavender}><strong>Rule:</strong> Ends in vowel → <strong>-n / -t</strong>. Ends in consonant → <strong>-en / -et</strong>.</RuleBox></div>
      </Section>
    </div>
  );
}

function Verbs() {
  const groups=[{n:1,pattern:"-ar",inf:"prata (to talk)",present:"pratar",past:"pratade",sup:"pratat",color:C.teal},{n:2,pattern:"-er",inf:"köra (to drive)",present:"kör",past:"körde",sup:"kört",color:C.gold},{n:3,pattern:"-r",inf:"bo (to live)",present:"bor",past:"bodde",sup:"bott",color:C.sky},{n:4,pattern:"irreg",inf:"vara (to be)",present:"är",past:"var",sup:"varit",color:C.lavender}];
  const pronouns=[["jag","I"],["du","you (sing.)"],["han/hon","he/she"],["vi","we"],["ni","you (pl.)"],["de","they"]];
  return (
    <div>
      <Section title="One Form Per Tense">
        <RuleBox color={C.sage}>🎉 Swedish verbs have the <strong>same form for all persons</strong>. No "I am / he is" — always just <em>är</em>.</RuleBox>
        <div style={{background:C.faint,borderRadius:12,padding:14,marginBottom:16}}>
          <div style={{color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:11,marginBottom:10}}>EXAMPLE: vara = to be</div>
          {pronouns.map(([sv,en])=>(
            <div key={sv} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:`1px solid ${C.border}`,alignItems:"center",flexWrap:"wrap"}}>
              <SpeakBtn word={`${sv} är`} small/><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.lavender,minWidth:80,flexShrink:0}}>{sv}</span><span style={{color:C.muted,fontSize:12,flex:1}}>({en})</span><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.text,flexShrink:0}}>{sv} <strong style={{color:C.gold}}>är</strong></span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Four Verb Groups">
        <Grid2>{groups.map(g=>(
          <div key={g.n} style={{background:C.faint,borderRadius:12,padding:14,border:`1px solid ${g.color}22`}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}><Tag color={g.color}>Group {g.n}</Tag><span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:g.color}}>{g.pattern}</span></div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.text,marginBottom:10}}>{g.inf}</div>
            {[["Infinitive",g.inf.split(" ")[0]],["Present",g.present],["Past",g.past],["Supine",g.sup]].map(([label,form])=>(
              <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${C.border}`,gap:8}}>
                <span style={{color:C.muted,fontSize:12,fontFamily:"'DM Mono',monospace"}}>{label}</span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}><SpeakBtn word={form} small/><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:g.color}}>{form}</span></div>
              </div>
            ))}
          </div>
        ))}</Grid2>
      </Section>
      <Section title="Key Irregular Verbs">
        <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:380}}>
            <thead><tr>{["Meaning","Infinitive","Present","Past","Supine"].map(h=><th key={h} style={{color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:10,textTransform:"uppercase",letterSpacing:".07em",padding:"6px 8px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
            <tbody>{[["to be","vara","är","var","varit"],["to have","ha","har","hade","haft"],["to go","gå","går","gick","gått"],["to come","komma","kommer","kom","kommit"],["to see","se","ser","såg","sett"],["to say","säga","säger","sa(de)","sagt"],["to get","få","får","fick","fått"],["to know","veta","vet","visste","vetat"]].map(([en,inf,pres,past,sup])=>(
              <tr key={inf} style={{borderBottom:`1px solid ${C.border}`}}>
                <td style={{color:C.muted,fontSize:12,padding:"8px 8px"}}>{en}</td>
                {[inf,pres,past,sup].map((f,i)=><td key={i} style={{padding:"8px 8px"}}><div style={{display:"flex",gap:5,alignItems:"center"}}><SpeakBtn word={f} small/><span style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:[C.text,C.teal,C.gold,C.lavender][i]}}>{f}</span></div></td>)}
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
  return (
    <div>
      <Section title="The V2 Rule">
        <RuleBox color={C.gold}>The finite verb is always the <strong>second element</strong>. If something other than the subject comes first, subject and verb swap (<em>inversion</em>).</RuleBox>
        {[{label:"Normal (Subject first)",parts:[{t:"Jag",r:"subject",c:C.teal},{t:"äter",r:"verb (2nd)",c:C.gold},{t:"äpplet",r:"object",c:C.text}],en:"I eat the apple"},{label:"Inverted (Adverb first)",parts:[{t:"Idag",r:"adverb",c:C.lavender},{t:"äter",r:"verb (2nd)",c:C.gold},{t:"jag",r:"subject",c:C.teal},{t:"äpplet",r:"object",c:C.text}],en:"Today I eat the apple"},{label:"Inverted (Object first)",parts:[{t:"Äpplet",r:"object",c:C.rose},{t:"äter",r:"verb (2nd)",c:C.gold},{t:"jag",r:"subject",c:C.teal}],en:"The apple — I eat (it)"}].map(ex=>(
          <div key={ex.label} style={{background:C.faint,borderRadius:12,padding:14,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,gap:8,flexWrap:"wrap"}}><span style={{color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:11}}>{ex.label}</span><SpeakBtn word={ex.parts.map(p=>p.t).join(" ")}/></div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>{ex.parts.map((p,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?17:21,color:p.c,padding:"5px 11px",background:`${p.c}10`,borderRadius:8}}>{p.t}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:p.c,opacity:.7,marginTop:3}}>{p.r}</div></div>)}</div>
            <div style={{color:C.muted,fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:13}}>"{ex.en}"</div>
          </div>
        ))}
      </Section>
      <Section title="Negation with 'inte'">
        <RuleBox color={C.rose}><strong>inte</strong> = "not". After verb in main clauses, before verb in sub-clauses.</RuleBox>
        {[["Jag förstår inte.","I don't understand.","after verb"],["Han kommer inte idag.","He's not coming today.","after verb"],["Jag vet att hon inte kommer.","I know she's not coming.","before verb (sub-clause)"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
      <Section title="Questions">
        <RuleBox color={C.sky}><strong>Yes/no:</strong> Verb first. <strong>Wh:</strong> Question word → verb → subject.</RuleBox>
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
        <RuleBox color={C.lavender}><strong style={{color:C.teal}}>Base</strong> (en-words) · <strong style={{color:C.gold}}>+t</strong> (ett-words) · <strong style={{color:C.lavender}}>+a</strong> (definite/plural)</RuleBox>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
          {[["en-word","stor",C.teal],["ett-word (+t)","stort",C.gold],["def/plural (+a)","stora",C.lavender]].map(([label,form,color])=>(
            <div key={label} style={{textAlign:"center",padding:"12px 6px",background:`${color}10`,borderRadius:8,border:`1px solid ${color}22`}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color,marginBottom:6,lineHeight:1.4}}>{label}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?22:26,color}}>{form}</div>
            </div>
          ))}
        </div>
        {[["en stor bil","a big car","en → base"],["ett stort hus","a big house","ett → +t"],["den stora bilen","the big car","def → +a"],["stora bilar","big cars","plural → +a"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
      <Section title="After 'är'">
        <RuleBox color={C.teal}>Adjective after <strong>är</strong> still agrees with the subject's gender.</RuleBox>
        {[["Bilen är stor.","The car is big.","en → base"],["Huset är stort.","The house is big.","ett → +t"],["Bilarna är stora.","The cars are big.","plural → +a"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
    </div>
  );
}

function Pronouns() {
  return (
    <div>
      <Section title="Personal Pronouns">
        <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:300}}>
            <thead><tr>{["Subject","Object","Meaning",""].map(h=><th key={h} style={{color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:10,textTransform:"uppercase",padding:"6px 8px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
            <tbody>{[["jag","mig","I / me"],["du","dig","you (sg.)"],["han","honom","he / him"],["hon","henne","she / her"],["den","den","it (en-word)"],["det","det","it (ett-word) / that"],["vi","oss","we / us"],["ni","er","you (pl.)"],["de","dem","they / them"]].map(([sub,obj,en])=>(
              <tr key={sub} style={{borderBottom:`1px solid ${C.border}`}}>
                <td style={{padding:"8px 8px"}}><span style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.teal}}>{sub}</span></td>
                <td style={{padding:"8px 8px"}}><span style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.gold}}>{obj}</span></td>
                <td style={{padding:"8px 8px",color:C.muted,fontSize:13}}>{en}</td>
                <td style={{padding:"8px 8px"}}><SpeakBtn word={sub} small/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Section>
      <Section title="Possessives">
        <RuleBox color={C.gold}>Agree with the <strong>noun described</strong> — same base/+t/+a as adjectives.</RuleBox>
        {[["min bil / mitt hus","my car / my house","min (en) · mitt (ett)"],["din bok / ditt bord","your book / table","din (en) · ditt (ett)"],["hans / hennes bil","his / her car","no change"],["vår bil / vårt hus","our car / house","vår (en) · vårt (ett)"],["era böcker","your books (pl.)","era (plural)"],["deras hus","their house","no change"]].map(([sv,en,note])=><Row key={sv} sv={sv} en={en} note={note}/>)}
      </Section>
    </div>
  );
}

function Plurals() {
  const groups=[{n:1,rule:"add -or",color:C.teal,ex:[["en flicka → flickor","girl → girls"],["en blomma → blommor","flower → flowers"],["en gata → gator","street → streets"]]},{n:2,rule:"add -ar",color:C.gold,ex:[["en bil → bilar","car → cars"],["en dag → dagar","day → days"],["en hand → händer*","hand → hands"]]},{n:3,rule:"add -er",color:C.sky,ex:[["en natt → nätter*","night → nights"],["en stad → städer*","city → cities"],["en tid → tider","time → times"]]},{n:4,rule:"add -n",color:C.lavender,ex:[["ett äpple → äpplen","apple → apples"],["ett rike → riken","realm → realms"],["ett hjärta → hjärtan","heart → hearts"]]},{n:5,rule:"no change",color:C.rose,ex:[["ett hus → hus","house → houses"],["ett år → år","year → years"],["en lärare → lärare","teacher → teachers"]]}];
  return (
    <div>
      <Section title="Five Declension Classes">
        <RuleBox color={C.muted}>en-words: groups 1–3. ett-words: groups 4–5.</RuleBox>
        <Grid2>{groups.map(g=>(
          <div key={g.n} style={{background:C.faint,borderRadius:12,padding:14,border:`1px solid ${g.color}22`}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}><Tag color={g.color}>Group {g.n}</Tag><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:g.color}}>{g.rule}</span></div>
            {g.ex.map(([sv,en])=><Row key={sv} sv={sv} en={en} color={g.color}/>)}
          </div>
        ))}</Grid2>
        <div style={{marginTop:12}}><RuleBox color={C.sage}>* Umlaut plurals — <em>hand→händer, stad→städer, man→män</em> — must be memorised.</RuleBox></div>
      </Section>
    </div>
  );
}

// ─── MORE CONTENT ─────────────────────────────────────────────────────────────

function CommonPhrases() {
  const cats=[
    {title:"Greetings & Farewells",color:C.teal,rows:[["Hej / Hallå","Hi / Hello"],["God morgon","Good morning"],["God kväll","Good evening"],["Hej då","Goodbye"],["Vi ses","See you later"],["Ha det bra","Take care"]]},
    {title:"Polite Expressions",color:C.gold,rows:[["Tack (så mycket)","Thank you (very much)"],["Varsågod","You're welcome"],["Förlåt","Sorry"],["Ursäkta","Excuse me"],["Snälla","Please"],["Ingen fara","No problem"]]},
    {title:"Getting Around",color:C.sky,rows:[["Var är...?","Where is...?"],["Hur kommer jag till...?","How do I get to...?"],["Till vänster","To the left"],["Till höger","To the right"],["Rakt fram","Straight ahead"],["Stanna här","Stop here"]]},
    {title:"Food & Drink",color:C.rose,rows:[["Kan jag få...?","Can I have...?"],["Jag är allergisk mot...","I'm allergic to..."],["Vad rekommenderar du?","What do you recommend?"],["Det var gott","That was delicious"],["Kan jag få notan?","Can I have the bill?"],["En kaffe, tack","A coffee, please"]]},
    {title:"Emergencies",color:C.lavender,rows:[["Ring ambulansen!","Call an ambulance!"],["Ring polisen!","Call the police!"],["Jag behöver hjälp","I need help"],["Var är sjukhuset?","Where is the hospital?"],["Jag har förlorat mitt pass","I've lost my passport"],["Jag förstår inte","I don't understand"]]},
  ];
  return (
    <div>
      {cats.map(cat=>(
        <Section key={cat.title} title={cat.title}>
          {cat.rows.map(([sv,en])=><Row key={sv} sv={sv} en={en} color={cat.color}/>)}
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
        <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(3,1fr)":"repeat(4,1fr)",gap:8}}>
          {nums1to20.map(([sv,en])=>(
            <div key={sv} style={{background:C.faint,borderRadius:10,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:6}}>
              <div style={{display:"flex",gap:6,alignItems:"center"}}><SpeakBtn word={sv.split(" ")[0]} small/><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.sky}}>{sv}</span></div>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted}}>{en}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Tens & Large Numbers">
        <RuleBox color={C.sky}><strong>Compound numbers:</strong> tjugo + ett = tjugoett (21), hundra + femtio + tre = hundrafemtitre (153)</RuleBox>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(3,1fr)",gap:8}}>
          {tens.map(([sv,en])=>(
            <div key={sv} style={{background:C.faint,borderRadius:10,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:6}}>
              <div style={{display:"flex",gap:6,alignItems:"center"}}><SpeakBtn word={sv} small/><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.gold}}>{sv}</span></div>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted}}>{en}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Ordinal Numbers">
        {ordinals.map(([sv,en])=><Row key={sv} sv={sv} en={en} color={C.lavender}/>)}
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
        <RuleBox color={C.lavender}>Days are <strong>not capitalised</strong> in Swedish. The week starts on Monday.</RuleBox>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",gap:8}}>
          {[["måndag","Monday","mån"],["tisdag","Tuesday","tis"],["onsdag","Wednesday","ons"],["torsdag","Thursday","tor"],["fredag","Friday","fre"],["lördag","Saturday","lör"],["söndag","Sunday","sön"]].map(([sv,en,abbr])=>(
            <div key={sv} style={{background:C.faint,borderRadius:10,padding:"12px 14px",border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.lavender}}>{sv}</span>
                <SpeakBtn word={sv} small/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:C.muted,fontSize:12}}>{en}</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted}}>{abbr}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Months of the Year">
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",gap:8}}>
          {[["januari","January"],["februari","February"],["mars","March"],["april","April"],["maj","May"],["juni","June"],["juli","July"],["augusti","August"],["september","September"],["oktober","October"],["november","November"],["december","December"]].map(([sv,en])=>(
            <div key={sv} style={{background:C.faint,borderRadius:10,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:6}}>
              <div style={{display:"flex",gap:6,alignItems:"center"}}><SpeakBtn word={sv} small/><span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.sage}}>{sv}</span></div>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted}}>{en}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Useful Time Phrases">
        {[["idag","today"],["igår","yesterday"],["imorgon","tomorrow"],["i veckan","this week"],["förra veckan","last week"],["nästa vecka","next week"],["i år","this year"],["förra året","last year"],["på måndag","on Monday"],["varje dag","every day"]].map(([sv,en])=><Row key={sv} sv={sv} en={en} color={C.lavender}/>)}
      </Section>
    </div>
  );
}

function Consonants() {
  const sounds=[
    {sound:"sj-",color:C.rose,desc:"A breathy 'sh' further back in the throat — unique to Swedish",words:[["sjö","lake","shuh"],["sjukhus","hospital","shuu-hoos"],["hjälp","help","yelp"],["köra","to drive","shuh-ra"]]},
    {sound:"tj- / kj-",color:C.gold,desc:"Like 'ch' in 'cheese' but softer, made near the front of the mouth",words:[["tjugo","twenty","choo-go"],["tjej","girl","chey"],["kjol","skirt","chool"]]},
    {sound:"Soft G (before e/i/y/ä/ö)",color:C.teal,desc:"Before front vowels, 'g' sounds like 'y' in 'yes'",words:[["ge","give","yeh"],["gillar","likes","yil-ar"],["göra","to do","yuh-ra"],["gäst","guest","yest"]]},
    {sound:"Soft K (before e/i/y/ä/ö)",color:C.sky,desc:"Before front vowels, 'k' gives the same sound as tj-",words:[["kär","dear/in love","shair"],["köpa","to buy","shuh-pa"],["kyckling","chicken","shyk-ling"]]},
    {sound:"Hard G / K (before a/o/u/å)",color:C.sage,desc:"Before back vowels, 'g' and 'k' sound as in English",words:[["gå","to go","go"],["katt","cat","katt"],["komma","to come","ko-ma"]]},
    {sound:"rs- cluster",color:C.lavender,desc:"'rs' merges into a retroflex 'sh' sound (tongue curls back)",words:[["börja","to start","bur-ya"],["mars","March","marsh"],["Lars","(name)","Lash"]]},
  ];
  return (
    <div>
      <RuleBox color={C.gold}>Swedish consonants are generally consistent — but a few combinations create sounds that don't exist in English. These are the ones worth focusing on.</RuleBox>
      {sounds.map(s=>(
        <Section key={s.sound} title={s.sound}>
          <RuleBox color={s.color}>{s.desc}</RuleBox>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {s.words.map(([sv,en,pron])=>(
              <div key={sv} style={{background:C.faint,borderRadius:10,padding:"10px 12px"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                  <SpeakBtn word={sv} small/>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:s.color}}>{sv}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{color:C.muted,fontSize:12}}>{en}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#445070"}}>"{pron}"</span>
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
    { sv:"kan",    en:"can / be able to",   past:"kunde",   note:"ability or possibility",       color:C.teal,
      examples:[["Jag kan simma","I can swim"],["Kan du hjälpa mig?","Can you help me?"],["Det kan vara sant","It might be true"]] },
    { sv:"ska",    en:"shall / will / going to", past:"skulle", note:"future plans, intention",  color:C.gold,
      examples:[["Jag ska resa imorgon","I'm going to travel tomorrow"],["Ska vi gå?","Shall we go?"],["Det ska bli bra","It will be fine"]] },
    { sv:"vill",   en:"want to",             past:"ville",   note:"desire or wish",               color:C.lavender,
      examples:[["Jag vill lära mig svenska","I want to learn Swedish"],["Vill du ha kaffe?","Do you want coffee?"],["Jag ville stanna","I wanted to stay"]] },
    { sv:"måste",  en:"must / have to",      past:"måste",   note:"necessity — same in past!",    color:C.rose,
      examples:[["Jag måste gå nu","I have to go now"],["Du måste äta","You must eat"],["Vi måste ta bussen","We have to take the bus"]] },
    { sv:"får",    en:"may / get to / is allowed", past:"fick", note:"permission or acquisition", color:C.sky,
      examples:[["Får jag fråga?","May I ask?"],["Jag fick en present","I got a gift"],["Du får inte röka här","You're not allowed to smoke here"]] },
    { sv:"borde",  en:"should / ought to",   past:"borde",   note:"recommendation — same in past!", color:C.sage,
      examples:[["Du borde vila","You should rest"],["Jag borde studera mer","I ought to study more"],["Vi borde fråga","We should ask"]] },
    { sv:"behöver",en:"need to",             past:"behövde", note:"necessity / need",              color:"#D4956A",
      examples:[["Jag behöver hjälp","I need help"],["Du behöver inte komma","You don't need to come"],["Vi behövde vänta","We needed to wait"]] },
  ];

  return (
    <div>
      <Section title="Modal Verbs Overview">
        <RuleBox color={C.gold}>
          Modal verbs come <strong>before the main verb</strong>, which stays in its infinitive form (no ending). Like English: "I <em>can</em> swim" → <em>jag kan simma</em>. Same form for all persons!
        </RuleBox>
        <div style={{ background:C.faint, borderRadius:12, padding:14, marginBottom:16 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:C.muted, marginBottom:10 }}>PATTERN</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
            {[["Subject",C.teal,"jag"],["Modal verb",C.gold,"kan"],["Infinitive",C.lavender,"simma"],["=",C.muted,""],["I can swim",C.muted,""]].map(([label,color,ex],i)=> ex ? (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?16:20, color, padding:"5px 12px", background:`${color}10`, borderRadius:8 }}>{ex}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color, opacity:.7, marginTop:3 }}>{label}</div>
              </div>
            ) : <span key={i} style={{ color:C.muted, fontSize:20 }}>=</span>)}
          </div>
        </div>
      </Section>

      {modals.map(m => (
        <Section key={m.sv} title={`${m.sv} — ${m.en}`}>
          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12, flexWrap:"wrap" }}>
            <Tag color={m.color}>{m.note}</Tag>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:C.muted }}>past: <span style={{ color:m.color }}>{m.past}</span></span>
          </div>
          {m.examples.map(([sv,en]) => <Row key={sv} sv={sv} en={en} color={m.color} />)}
        </Section>
      ))}

      <Section title="Negation with Modals">
        <RuleBox color={C.rose}>
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
        <RuleBox color={C.lavender}>
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
        <RuleBox color={C.teal}>
          A <strong>reflexive verb</strong> is one where the subject and object are the same person — "I wash <em>myself</em>". In Swedish the reflexive pronoun changes by person. Once you learn the pattern, it applies to dozens of very common verbs.
        </RuleBox>
        <div style={{ background:C.faint, borderRadius:12, padding:14, marginBottom:16 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:C.muted, marginBottom:12 }}>REFLEXIVE PRONOUNS — tvätta sig (to wash oneself)</div>
          {reflexPronouns.map(([subj,refl,ex]) => (
            <div key={subj} style={{ display:"flex", gap:8, padding:"7px 0", borderBottom:`1px solid ${C.border}`, alignItems:"center", flexWrap:"wrap" }}>
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:15, color:C.teal, minWidth:90, flexShrink:0 }}>{subj}</span>
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:15, color:C.gold, minWidth:30, flexShrink:0 }}>+ {refl}</span>
              <span style={{ color:C.muted, fontSize:12, flex:1, fontFamily:"'Lora',serif", fontStyle:"italic" }}>{ex}</span>
              <SpeakBtn word={ex.split(" — ")[1] || ex} small />
            </div>
          ))}
        </div>
        <RuleBox color={C.lavender}>
          <strong>Key insight:</strong> <em>sig</em> covers he/she/it/they. Only <em>mig, dig, oss, er</em> change. Memorise just those 4!
        </RuleBox>
      </Section>

      <Section title="Essential Reflexive Verbs">
        <RuleBox color={C.gold}>
          These are among the most common verbs in everyday Swedish. Many daily routines use reflexive verbs — getting up, getting dressed, feeling something.
        </RuleBox>
        {commonReflexive.map(v => (
          <div key={v.sv} style={{ background:C.faint, borderRadius:10, padding:14, marginBottom:8 }}>
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8, flexWrap:"wrap" }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <SpeakBtn word={v.sv} />
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?16:18, color:C.teal }}>{v.sv}</span>
              </div>
              <span style={{ color:C.muted, fontSize:13, fontFamily:"'Lora',serif", fontStyle:"italic" }}>{v.en}</span>
            </div>
            {v.ex.map(([sv,en]) => (
              <div key={sv} style={{ display:"flex", gap:8, alignItems:"center", padding:"6px 0", borderTop:`1px solid ${C.border}` }}>
                <SpeakBtn word={sv} small />
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:14, color:C.text, flex:1 }}>{sv}</span>
                <span style={{ color:C.muted, fontSize:12 }}>{en}</span>
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section title="Daily Routine — Reflexive in Action">
        <RuleBox color={C.sage}>
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
        ].map(([sv,en,verb]) => <Row key={sv} sv={sv} en={en} note={verb} color={C.sage} />)}
      </Section>

      <Section title="Deponent Verbs — Only Reflexive Form Exists">
        <RuleBox color={C.rose}>
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
          <div key={sv} style={{ background:C.faint, borderRadius:10, padding:"10px 14px", marginBottom:8, display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <SpeakBtn word={sv} small />
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:C.rose, minWidth:80 }}>{sv}</span>
            <span style={{ color:C.muted, fontSize:13, flex:1 }}>{en}</span>
            {ex && <span style={{ fontFamily:"'Lora',serif", fontStyle:"italic", fontSize:12, color:C.text }}>{ex} {exEn ? `= ${exEn}` : ""}</span>}
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
      <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",marginBottom:22}}>
        <div style={{display:"flex",gap:5,background:C.surface,borderRadius:13,padding:6,border:`1px solid ${C.border}`,minWidth:"fit-content"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActive(t.id)} style={{padding:isMobile?"7px 11px":"7px 15px",borderRadius:8,border:`1px solid ${active===t.id?C.gold:"transparent"}`,background:active===t.id?`${C.gold}18`:"transparent",color:active===t.id?C.gold:C.muted,fontFamily:"'DM Mono',monospace",fontSize:isMobile?10:11,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5}}>
              <span>{t.emoji}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:C.bg,backgroundImage:`radial-gradient(ellipse at 20% 50%, #0e152a 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, #0b1422 0%, transparent 50%)`,fontFamily:"'DM Sans',sans-serif",paddingBottom:60}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Lora:ital@0;1&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet"/>

      {/* PWA Install Banner */}
      {showBanner && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0, zIndex:9999,
          background:"#141928",
          borderTop:`1px solid ${C.gold}44`,
          padding:isMobile?"14px 16px":"14px 24px",
          display:"flex", alignItems:"center", gap:12,
          boxShadow:"0 -8px 32px #000a",
          paddingBottom:`calc(14px + env(safe-area-inset-bottom))`,
        }}>
          <div style={{
            width:42, height:42, borderRadius:10, flexShrink:0,
            background:"#0e1220", border:`1px solid ${C.gold}44`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Playfair Display',serif", fontSize:22, color:C.gold, fontWeight:700,
          }}>Sv</div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{color:C.text, fontSize:13, fontWeight:600, marginBottom:1}}>Install Svenska</div>
            <div style={{color:C.muted, fontSize:11, fontFamily:"'DM Mono',monospace"}}>Add to home screen · works offline</div>
          </div>
          <button onClick={install} style={{
            padding:"9px 18px", borderRadius:10,
            background:C.gold, border:"none",
            color:"#080b14", fontFamily:"'DM Mono',monospace",
            fontSize:12, fontWeight:700, cursor:"pointer",
            letterSpacing:".05em", whiteSpace:"nowrap", flexShrink:0,
          }}>Install</button>
          <button onClick={()=>setBannerDismissed(true)} style={{
            background:"transparent", border:"none",
            color:C.muted, cursor:"pointer", fontSize:18,
            padding:"4px 6px", lineHeight:1, flexShrink:0,
          }}>×</button>
        </div>
      )}

      {/* Header */}
      <div style={{textAlign:"center",padding:isMobile?"24px 16px 16px":"36px 20px 20px"}}>
        <div style={{display:"inline-block",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:".18em",textTransform:"uppercase",color:C.muted,border:`1px solid ${C.border}`,padding:"3px 14px",borderRadius:20,marginBottom:10}}>Svenska · Swedish for English Speakers</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?26:"clamp(26px,5vw,44px)",color:C.text,margin:"0 0 5px",fontWeight:700}}>Language Guide<span style={{color:C.gold}}>.</span></h1>
        <p style={{color:C.muted,fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:13,margin:0}}>Pronunciation · Grammar · Vocabulary · Practice</p>
      </div>

      {/* Main tab bar */}
      <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",padding:"0 16px 0",marginBottom:isMobile?18:26}}>
        <div style={{display:"flex",justifyContent:"center",gap:6,minWidth:"fit-content",margin:"0 auto",maxWidth:"fit-content"}}>
          {MAIN_TABS.map(t=>(
            <button key={t.id} onClick={()=>setMainTab(t.id)} style={{padding:isMobile?"9px 16px":"10px 22px",borderRadius:30,border:`1.5px solid ${mainTab===t.id?C.gold:C.border}`,background:mainTab===t.id?`${C.gold}18`:"transparent",color:mainTab===t.id?C.gold:C.muted,fontFamily:"'DM Mono',monospace",fontSize:isMobile?10:12,fontWeight:600,letterSpacing:".07em",cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}>
              <span>{t.emoji}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:960,margin:"0 auto",padding:`0 ${isMobile?12:20}px`}}>

        {/* FLASHCARDS */}
        {mainTab==="flashcards" && <FlashCards/>}

        {/* VOWELS */}
        {mainTab==="vowels" && (
          <div>
            <div style={{marginBottom:20,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
              <div style={{display:"inline-flex",gap:isMobile?18:30,background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:isMobile?"11px 16px":"12px 24px",minWidth:"fit-content"}}>
                {[{label:"Short vowel",sub:"2+ consonants follow",ex:"katt"},{label:"Long vowel",sub:"1 or 0 consonants",ex:"dag"}].map(item=>(
                  <div key={item.label}><div style={{color:C.text,fontSize:12,fontWeight:500}}>{item.label}</div><div style={{color:C.muted,fontSize:10,fontFamily:"'DM Mono',monospace"}}>{item.sub}</div><div style={{marginTop:2,fontFamily:"'Playfair Display',serif",color:C.gold,fontSize:14}}>{item.ex}</div></div>
                ))}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":isTablet?"repeat(3,1fr)":"repeat(3,1fr)",gap:isMobile?10:14}}>
              {VOWELS.map((v,i)=><VowelCard key={v.letter} vowel={v} isActive={activeVowel===i} onClick={()=>setActiveVowel(activeVowel===i?null:i)}/>)}
            </div>
            <p style={{textAlign:"center",marginTop:30,color:"#28305a",fontSize:11,fontFamily:"'DM Mono',monospace"}}>💡 katt (cat) vs kat (rag) — vowel length changes meaning</p>
          </div>
        )}

        {/* GRAMMAR */}
        {mainTab==="grammar" && (
          <div>
            <SubTabBar tabs={GRAMMAR_TABS} active={grammarTab} setActive={setGrammarTab}/>
            {GComp && <GComp/>}
          </div>
        )}

        {/* MORE CONTENT */}
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
