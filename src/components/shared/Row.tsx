import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { SpeakBtn } from "./SpeakBtn";

interface RowProps {
  sv: string;
  en: string;
  note?: string;
  colorClass?: string;
}

export function Row({ sv, en, note, colorClass = "text-foreground" }: RowProps) {
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
