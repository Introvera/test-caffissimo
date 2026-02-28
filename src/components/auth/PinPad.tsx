"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface PinPadProps {
  onKeyPress: (key: string) => void;
  onClear: () => void;
  onDelete: () => void;
}

export function PinPad({ onKeyPress, onClear, onDelete }: PinPadProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[280px] mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button
          key={num}
          type="button"
          variant="outline"
          className="h-12 text-xl font-medium rounded-2xl border-border bg-surface hover:bg-surface-secondary shadow-sm"
          onClick={() => onKeyPress(num.toString())}
        >
          {num}
        </Button>
      ))}
      <Button
        type="button"
        variant="outline"
        className="h-12 text-sm font-medium rounded-2xl border-border bg-surface hover:bg-surface-secondary text-text-muted shadow-sm"
        onClick={onClear}
      >
        Clear
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-12 text-xl font-medium rounded-2xl border-border bg-surface hover:bg-surface-secondary shadow-sm"
        onClick={() => onKeyPress("0")}
      >
        0
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-12 text-sm font-medium rounded-2xl border-border bg-surface hover:bg-surface-secondary text-text-muted shadow-sm"
        onClick={onDelete}
      >
        Del
      </Button>
    </div>
  );
}
