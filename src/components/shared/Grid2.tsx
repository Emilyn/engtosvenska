import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface Grid2Props {
  children: ReactNode;
}

export function Grid2({ children }: Grid2Props) {
  const { isTablet } = useBreakpoint();
  return <div className={cn("grid gap-3", isTablet ? "grid-cols-1" : "grid-cols-2")}>{children}</div>;
}
