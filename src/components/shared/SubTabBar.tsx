import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface Tab {
  id: string;
  label: string;
  emoji: string;
}

interface SubTabBarProps {
  tabs: Tab[];
  active: string;
  setActive: (id: string) => void;
}

export function SubTabBar({ tabs, active, setActive }: SubTabBarProps) {
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const activeTab = tabs.find(t => t.id === active)!;

  // Mobile: dropdown
  if (isMobile) {
    return (
      <div ref={ref} className="relative mb-5">
        <button
          onClick={() => setOpen(o => !o)}
          className={cn(
            "w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border transition-all cursor-pointer",
            C.goldBg, C.goldBorder
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{activeTab.emoji}</span>
            <span className={cn("font-mono text-[12px] font-semibold tracking-wide", C.gold)}>{activeTab.label}</span>
          </div>
          <span className={cn("font-mono text-[10px] transition-transform duration-150", C.gold, open && "rotate-180")}>▾</span>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 z-20 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            {tabs.map(t => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => { setActive(t.id); setOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                    isActive
                      ? cn(C.goldBg, C.gold, "font-semibold")
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="text-base w-6 text-center">{t.emoji}</span>
                  <span className="font-mono text-[12px] tracking-wide">{t.label}</span>
                  {isActive && <span className={cn("ml-auto text-[10px]", C.gold)}>✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Desktop or few tabs: scrollable pill row
  return (
    <div className="overflow-x-auto mb-5">
      <div className="flex gap-1 bg-muted rounded-xl p-1.5 border border-border min-w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg border text-[11px] cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 font-mono",
              active === t.id
                ? cn(C.gold, C.goldBg, C.goldBorder, "font-semibold")
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card"
            )}>
            <span>{t.emoji}</span><span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
