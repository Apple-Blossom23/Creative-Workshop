import * as React from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-border bg-card px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring",
        className
      )}
      {...props}
    />
  );
}
