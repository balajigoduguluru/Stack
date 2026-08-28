import * as React from "react";
import { cn } from "./utils";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg bg-white rounded-[36px] shadow-apple-lg border border-gray-100 p-8 animate-fade-in-up",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F]/60 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-[24px] font-bold text-[#1D1D1F] tracking-tight mb-2">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-[15px] font-medium text-[#1D1D1F]/60 mb-6 leading-relaxed">
            {description}
          </p>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};
