import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";

interface TagProps {
  children: ReactNode;
  colorClass?: string;
  bgClass?: string;
  borderClass?: string;
}

export function Tag({ children, colorClass = C.gold, bgClass = C.goldBg, borderClass = C.goldBorder }: TagProps) {
  return (
    <span className={cn("font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border whitespace-nowrap", colorClass, bgClass, borderClass)}>
      {children}
    </span>
  );
}
