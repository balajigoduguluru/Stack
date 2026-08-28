import * as React from "react";
import { cn } from "./utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full bg-[#F5F5F7] border border-gray-200 rounded-full px-5 py-3 text-[14px] font-medium text-[#1D1D1F] placeholder:text-[#1D1D1F]/40 focus:outline-none focus:ring-2 focus:ring-[#5C6BC0] focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
