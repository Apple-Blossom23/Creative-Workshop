"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error";
  duration?: number;
}

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 3000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function Toast({
  title,
  description,
  variant = "default",
  onClose,
}: ToastProps & { onClose: () => void }) {
  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-lg border border-border bg-background p-4 shadow-lg animate-in slide-in-from-bottom-5",
        variant === "success" && "border-emerald-500/50 bg-emerald-500/10",
        variant === "error" && "border-red-500/50 bg-red-500/10"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="mt-1 text-sm text-muted-foreground">{description}</div>}
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 hover:bg-muted transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
