import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "gold" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          variant === "default" &&
            "bg-gradient-to-r from-cinema-gold to-yellow-500 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-lg shadow-cinema-gold/20",
          variant === "destructive" &&
            "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20",
          variant === "outline" &&
            "border border-cinema-border bg-transparent text-white hover:bg-white/10 hover:border-cinema-gold/50",
          variant === "secondary" &&
            "bg-white/10 text-white hover:bg-white/20",
          variant === "ghost" &&
            "text-white hover:bg-white/10",
          variant === "gold" &&
            "bg-cinema-gold text-black hover:bg-yellow-400",
          variant === "link" &&
            "text-cinema-gold underline-offset-4 hover:underline",
          size === "default" && "h-10 px-5 py-2",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-12 px-8 text-base",
          size === "icon" && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
