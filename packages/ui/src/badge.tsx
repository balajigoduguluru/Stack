import * as React from "react";
import { cn } from "./utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "teal" | "coral" | "neutral" | "dark";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) => {
  const variants: Record<string, string> = {
    primary: "bg-[#5C6BC0]/10 text-[#5C6BC0]",
    teal: "bg-[#26A69A]/10 text-[#26A69A]",
    coral: "bg-[#FF7043]/10 text-[#FF7043]",
    neutral: "bg-white border border-gray-200 text-[#1D1D1F]/70 shadow-apple-sm",
    dark: "bg-[#1D1D1F] text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium tracking-tight",
        variants[variant] || variants.primary,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
