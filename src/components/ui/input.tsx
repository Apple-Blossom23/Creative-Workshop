import * as React from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition",
        "focus:border-ring focus:ring-2 focus:ring-ring/20",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        className
      )}
      {...props}
    />
  );
}
