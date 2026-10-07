"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: "border-green-500/50 text-green-400",
  error: "border-red-500/50 text-red-400",
  info: "border-blue-500/50 text-blue-400",
  warning: "border-yellow-500/50 text-yellow-400",
};

function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const Icon = icons[toast.type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border bg-cinema-dark/95 p-4 shadow-2xl backdrop-blur-md animate-slide-up min-w-[300px] max-w-sm",
        colors[toast.type]
      )}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-gray-400">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-500 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

let toastId = 0;
const listeners = new Set<(toast: ToastMessage) => void>();

export function toast(type: ToastMessage["type"], title: string, description?: string) {
  const message: ToastMessage = {
    id: `toast-${++toastId}`,
    type,
    title,
    description,
  };
  listeners.forEach((listener) => listener(message));
}

export function useToastListener() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const listener = (message: ToastMessage) => {
      setToasts((prev) => [...prev, message]);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, dismiss };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, dismiss } = useToastListener();
  return (
    <>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
