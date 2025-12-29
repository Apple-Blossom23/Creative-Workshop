import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
        variant === "primary" && "bg-primary text-primary-foreground hover:opacity-95",
        variant === "secondary" && "bg-muted text-foreground hover:bg-muted/70",
        variant === "ghost" && "hover:bg-muted",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-11 px-5 text-base",
        className
      )}
      {...props}
    />
  );
}
