import { useState } from "react";
import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { usePWAInstall } from "@/hooks/usePWA";
import { useTheme } from "@/hooks/useTheme";
import { VOWELS } from "@/data/vowels";
import { SubTabBar } from "@/components/shared/SubTabBar";
import { AppMenu } from "@/components/shared/AppMenu";
import { Home } from "@/components/Home";
import { FlashCards } from "@/components/FlashCards";
import { VowelCard } from "@/components/VowelCard";
import { NounsGender } from "@/components/grammar/NounsGender";
import { Articles } from "@/components/grammar/Articles";
import { Verbs } from "@/components/grammar/Verbs";
import { WordOrder } from "@/components/grammar/WordOrder";
import { Adjectives } from "@/components/grammar/Adjectives";
import { Pronouns } from "@/components/grammar/Pronouns";
import { Plurals } from "@/components/grammar/Plurals";
import { ModalVerbs } from "@/components/grammar/ModalVerbs";
import { ReflexiveVerbs } from "@/components/grammar/ReflexiveVerbs";
import { CommonPhrases } from "@/components/content/CommonPhrases";
import { Numbers } from "@/components/content/Numbers";
import { DaysMonths } from "@/components/content/DaysMonths";
import { Consonants } from "@/components/content/Consonants";

const MAIN_TABS = [
  { id:"home",       label:"Home",       emoji:"🏠" },
  { id:"flashcards", label:"Flashcards", emoji:"🃏" },
  { id:"vowels",     label:"Vowels",     emoji:"🔤" },
  { id:"grammar",    label:"Grammar",    emoji:"📖" },
  { id:"content",    label:"More",       emoji:"📚" },
];

const GRAMMAR_TABS = [
  { id:"nouns",      label:"Nouns",      emoji:"🔡", Component: NounsGender },
  { id:"articles",   label:"Articles",   emoji:"📌", Component: Articles },
  { id:"verbs",      label:"Verbs",      emoji:"⚡", Component: Verbs },
  { id:"wordorder",  label:"Word Order", emoji:"↔️", Component: WordOrder },
  { id:"adjectives", label:"Adjectives", emoji:"🎨", Component: Adjectives },
  { id:"pronouns",   label:"Pronouns",   emoji:"👤", Component: Pronouns },
  { id:"plurals",    label:"Plurals",    emoji:"✳️", Component: Plurals },
  { id:"modals",     label:"Modals",     emoji:"🔧", Component: ModalVerbs },
  { id:"reflexive",  label:"Reflexive",  emoji:"🔄", Component: ReflexiveVerbs },
];

const CONTENT_TABS = [
  { id:"phrases",    label:"Phrases",    emoji:"💬", Component: CommonPhrases },
  { id:"numbers",    label:"Numbers",    emoji:"🔢", Component: Numbers },
  { id:"days",       label:"Days",       emoji:"📅", Component: DaysMonths },
  { id:"consonants", label:"Consonants", emoji:"🔊", Component: Consonants },
];

export default function App() {
  const [mainTab, setMainTab]       = useState("home");
  const [grammarTab, setGrammarTab] = useState("nouns");
  const [contentTab, setContentTab] = useState("phrases");
  const [activeVowel, setActiveVowel] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();
  const { canInstall, install, installed } = usePWAInstall();
  const { theme, toggleTheme } = useTheme();

  const GComp = GRAMMAR_TABS.find(t => t.id === grammarTab)?.Component;
  const CComp = CONTENT_TABS.find(t => t.id === contentTab)?.Component;

  const activeMainTab = MAIN_TABS.find(t => t.id === mainTab)!;

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Top nav bar */}
      <header
        className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border px-4 h-14 flex items-center justify-between"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* Logo + current section */}
        <div className="flex items-center gap-2.5">
          <span className={cn("w-8 h-8 rounded-lg border flex items-center justify-center font-serif text-[15px] font-bold", C.gold, C.goldBg, C.goldBorder)}>
            Sv
          </span>
          <div className="flex items-center gap-1.5">
            {mainTab !== "home" && <span className="text-base leading-none">{activeMainTab.emoji}</span>}
            <span className="font-mono text-[12px] tracking-wide text-foreground font-semibold">
              {mainTab === "home" ? "Svenska" : activeMainTab.label}
            </span>
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Open menu"
          className="w-9 h-9 flex flex-col items-center justify-center gap-1.25 rounded-xl border border-border hover:bg-muted transition-colors"
        >
          <span className="block w-4 h-[1.5px] bg-foreground rounded-full" />
          <span className="block w-4 h-[1.5px] bg-foreground rounded-full" />
          <span className="block w-4 h-[1.5px] bg-foreground rounded-full" />
        </button>
      </header>

      <AppMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        canInstall={canInstall && !installed}
        onInstall={install}
        tabs={MAIN_TABS}
        activeTab={mainTab}
        onTabChange={setMainTab}
      />

      {/* Content */}
      <div className={cn(mainTab === "home" ? "" : cn("max-w-240 mx-auto pb-16", isMobile ? "px-3 pt-5" : "px-5 pt-8"))}>

        {mainTab === "home" && <Home onNavigate={setMainTab} />}

        {mainTab === "flashcards" && <FlashCards />}

        {mainTab === "vowels" && (
          <div>
            <div className="mb-5 overflow-x-auto">
              <div className="inline-flex gap-5 bg-card border border-border rounded-xl px-5 py-3 min-w-fit">
                {[{label:"Short vowel",sub:"2+ consonants follow",ex:"katt"},{label:"Long vowel",sub:"1 or 0 consonants",ex:"dag"}].map(item => (
                  <div key={item.label}>
                    <div className="text-foreground text-xs font-medium">{item.label}</div>
                    <div className="text-muted-foreground text-[10px] font-mono">{item.sub}</div>
                    <div className={cn("mt-0.5 font-serif text-sm", C.gold)}>{item.ex}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn("grid gap-3", isMobile ? "grid-cols-2" : "grid-cols-3")}>
              {VOWELS.map((v, i) => <VowelCard key={v.letter} vowel={v} isActive={activeVowel === i} onClick={() => setActiveVowel(activeVowel === i ? null : i)} />)}
            </div>
            <p className="text-center mt-7 text-muted-foreground/50 text-[11px] font-mono">💡 katt (cat) vs kat (rag) — vowel length changes meaning</p>
          </div>
        )}

        {mainTab === "grammar" && (
          <div>
            <SubTabBar tabs={GRAMMAR_TABS} active={grammarTab} setActive={setGrammarTab} />
            {GComp && <GComp />}
          </div>
        )}

        {mainTab === "content" && (
          <div>
            <SubTabBar tabs={CONTENT_TABS} active={contentTab} setActive={setContentTab} />
            {CComp && <CComp />}
          </div>
        )}

      </div>
    </div>
  );
}
