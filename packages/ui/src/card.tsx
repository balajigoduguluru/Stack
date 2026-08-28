import * as React from "react";
import { cn } from "./utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-[32px] shadow-apple-md border border-gray-100 p-8 transition-all duration-300",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
  <div ref={ref} className={cn("mb-6 flex flex-col gap-1.5", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>, ref: React.Ref<HTMLHeadingElement>) => (
  <h3
    ref={ref}
    className={cn(
      "text-[22px] font-bold text-[#1D1D1F] tracking-tight leading-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>, ref: React.Ref<HTMLParagraphElement>) => (
  <p
    ref={ref}
    className={cn("text-[#1D1D1F]/60 font-medium text-[15px] leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
  <div
    ref={ref}
    className={cn("mt-6 pt-4 border-t border-gray-100 flex items-center justify-between", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
