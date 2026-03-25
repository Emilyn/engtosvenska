// Each entry: light pastel class + dark: override
export const C = {
  gold:     "text-amber-700 dark:text-amber-400/80",       goldBg:     "bg-amber-100/60 dark:bg-amber-950/25",   goldBorder:     "border-amber-400/60 dark:border-amber-800/50",    goldRaw: "#b45309",
  teal:     "text-teal-700 dark:text-teal-400/80",         tealBg:     "bg-teal-100/60 dark:bg-teal-950/25",     tealBorder:     "border-teal-400/60 dark:border-teal-800/50",      tealRaw: "#0d9488",
  rose:     "text-rose-600 dark:text-rose-400/80",         roseBg:     "bg-rose-100/60 dark:bg-rose-950/25",     roseBorder:     "border-rose-400/60 dark:border-rose-800/50",      roseRaw: "#e11d48",
  sky:      "text-sky-700 dark:text-sky-400/80",           skyBg:      "bg-sky-100/60 dark:bg-sky-950/25",       skyBorder:      "border-sky-400/60 dark:border-sky-800/50",        skyRaw: "#0284c7",
  sage:     "text-emerald-700 dark:text-emerald-400/80",   sageBg:     "bg-emerald-100/60 dark:bg-emerald-950/25",sageBorder:     "border-emerald-400/60 dark:border-emerald-800/50", sageRaw: "#059669",
  lavender: "text-violet-700 dark:text-violet-400/80",     lavenderBg: "bg-violet-100/60 dark:bg-violet-950/25", lavenderBorder: "border-violet-400/60 dark:border-violet-800/50",  lavenderRaw: "#7c3aed",
};

export type ColorSet = { text: string; bg: string; border: string; raw: string };

export const colorMap: Record<string, ColorSet> = {
  teal:     { text: C.teal,     bg: C.tealBg,     border: C.tealBorder,     raw: C.tealRaw },
  gold:     { text: C.gold,     bg: C.goldBg,     border: C.goldBorder,     raw: C.goldRaw },
  sky:      { text: C.sky,      bg: C.skyBg,      border: C.skyBorder,      raw: C.skyRaw },
  lavender: { text: C.lavender, bg: C.lavenderBg, border: C.lavenderBorder, raw: C.lavenderRaw },
  rose:     { text: C.rose,     bg: C.roseBg,     border: C.roseBorder,     raw: C.roseRaw },
  sage:     { text: C.sage,     bg: C.sageBg,     border: C.sageBorder,     raw: C.sageRaw },
};

export function getColorClasses(rawColor: string): ColorSet {
  for (const v of Object.values(colorMap)) {
    if (v.raw === rawColor) return v;
  }
  return colorMap.gold;
}
