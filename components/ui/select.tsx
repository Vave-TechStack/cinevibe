import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <select
        className={cn(
          "flex h-11 w-full rounded-lg border border-cinema-border bg-black/40 px-4 py-2 text-sm text-white transition-colors",
          "focus:border-cinema-gold/60 focus:outline-none focus:ring-2 focus:ring-cinema-gold/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20",
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-cinema-dark">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
Select.displayName = "Select";

export { Select };
