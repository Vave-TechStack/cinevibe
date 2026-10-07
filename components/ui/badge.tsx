import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "gold" | "green" | "red" | "blue";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default" && "bg-white/10 text-white",
        variant === "secondary" && "bg-white/20 text-white",
        variant === "outline" && "border border-cinema-border text-gray-300",
        variant === "gold" && "bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/30",
        variant === "green" && "bg-green-500/20 text-green-400 border border-green-500/30",
        variant === "red" && "bg-red-500/20 text-red-400 border border-red-500/30",
        variant === "blue" && "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
