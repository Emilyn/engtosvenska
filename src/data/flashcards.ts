export interface Card {
  sv: string;
  en: string;
}

export interface Deck {
  id: string;
  label: string;
  emoji: string;
  colorKey: string;
  cards: Card[];
}

export const DECKS: Deck[] = [
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
