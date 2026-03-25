import { type ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8">
      <h3 className="font-serif text-lg text-foreground mb-3.5 pb-2.5 border-b border-border">{title}</h3>
      {children}
    </div>
  );
}
