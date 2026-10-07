import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-cinema-border bg-black/40 px-4 py-2 text-sm text-white placeholder:text-gray-500 transition-colors",
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
Input.displayName = "Input";

export { Input };
