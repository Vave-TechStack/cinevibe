import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border border-cinema-border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 transition-colors",
          "focus:border-cinema-gold/60 focus:outline-none focus:ring-2 focus:ring-cinema-gold/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
