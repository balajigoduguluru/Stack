import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6BC0] disabled:opacity-50 disabled:pointer-events-none rounded-full";

    const variants: Record<string, string> = {
      primary: "bg-[#5C6BC0] hover:bg-[#4A59A7] text-white shadow-apple-md",
      dark: "bg-[#1D1D1F] hover:bg-[#000000] text-white shadow-apple-sm",
      secondary: "bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] shadow-apple-sm",
      outline: "bg-white hover:bg-gray-50 text-[#1D1D1F] border border-gray-200 shadow-apple-sm",
      ghost: "bg-transparent hover:bg-[#1D1D1F]/5 text-[#1D1D1F]",
      destructive: "bg-[#FF7043] hover:bg-[#E65100] text-white shadow-apple-sm",
    };

    const sizes: Record<string, string> = {
      sm: "px-4 py-1.5 text-[13px]",
      md: "px-6 py-2.5 text-[14px]",
      lg: "px-8 py-4 text-[16px]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
