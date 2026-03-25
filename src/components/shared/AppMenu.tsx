import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";
import type { Theme } from "@/hooks/useTheme";

interface Tab {
  id: string;
  label: string;
  emoji: string;
}

interface AppMenuProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  canInstall: boolean;
  onInstall: () => void;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function AppMenu({
  open, onClose, theme, onToggleTheme,
  canInstall, onInstall, tabs, activeTab, onTabChange,
}: AppMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <div
        ref={ref}
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-72 bg-card border-l border-border shadow-2xl flex flex-col transition-transform duration-250 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0">
          <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Navigation section */}
        <div className="px-3 pt-4 pb-2">
          <p className="px-2 mb-2 font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground/60">Navigate</p>
          <nav className="flex flex-col gap-1">
            {tabs.map(t => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => { onTabChange(t.id); onClose(); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl border text-left transition-all",
                    active
                      ? cn("border font-semibold", C.gold, C.goldBg, C.goldBorder)
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <span className="text-xl w-7 text-center">{t.emoji}</span>
                  <span className="font-mono text-[13px] tracking-wide">{t.label}</span>
                  {active && (
                    <span className={cn("ml-auto text-[10px] font-mono", C.gold)}>▸</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom actions */}
        <div className="border-t border-border px-3 py-3 flex flex-col gap-1">
          {/* Theme toggle */}
          <button
            onClick={() => { onToggleTheme(); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-left"
          >
            <span className="text-xl w-7 text-center">{theme === "dark" ? "☀️" : "🌙"}</span>
            <div>
              <div className="font-mono text-[13px] tracking-wide">{theme === "dark" ? "Light mode" : "Dark mode"}</div>
              <div className="text-[10px] font-mono text-muted-foreground/70">Switch appearance</div>
            </div>
          </button>

          {/* Install */}
          {canInstall && (
            <button
              onClick={() => { onInstall(); onClose(); }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-left"
            >
              <span className={cn("w-7 h-7 rounded-lg border flex items-center justify-center font-serif text-[13px] font-bold shrink-0", C.goldBg, C.goldBorder, C.gold)}>
                Sv
              </span>
              <div>
                <div className="font-mono text-[13px] tracking-wide">Install app</div>
                <div className="text-[10px] font-mono text-muted-foreground/70">Add to home screen</div>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
