import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { C } from "@/lib/colors";

interface RuleBoxProps {
  children: ReactNode;
  colorClass?: string;
  bgClass?: string;
  borderClass?: string;
}

export function RuleBox({ children, colorClass = C.gold, bgClass = C.goldBg, borderClass = C.goldBorder }: RuleBoxProps) {
  return (
    <div className={cn("border rounded-r-xl pl-4 pr-4 py-3 mb-4 font-serif text-[13px] text-foreground leading-relaxed border-l-[3px]", borderClass, bgClass)}>
      {children}
    </div>
  );
}
