"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

const variantConfig = {
  danger: {
    icon: <Trash2 size={22} />,
    iconBg: "bg-red-100 text-red-600",
    confirmBtn: "bg-red-600 hover:bg-red-700 text-white",
    confirmLabel: "ลบ",
  },
  warning: {
    icon: <AlertTriangle size={22} />,
    iconBg: "bg-amber-100 text-amber-600",
    confirmBtn: "bg-amber-600 hover:bg-amber-700 text-white",
    confirmLabel: "ยืนยัน",
  },
  info: {
    icon: <AlertTriangle size={22} />,
    iconBg: "bg-blue-100 text-blue-600",
    confirmBtn: "bg-blue-600 hover:bg-blue-700 text-white",
    confirmLabel: "ยืนยัน",
  },
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = "ยกเลิก",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const config = variantConfig[variant];
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Focus confirm button when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => confirmRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${config.iconBg}`}>
            {config.icon}
          </div>

          {/* Title */}
          {title && (
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          )}

          {/* Message */}
          <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${config.confirmBtn}`}
          >
            {confirmLabel ?? config.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
