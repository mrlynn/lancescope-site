"use client";

/** A command or URI the reader is meant to paste somewhere.
 *
 *  Copy state is deliberately brief and unannounced to screen readers as a live
 *  region; the button's accessible name changes instead, which says the same
 *  thing without interrupting.
 */
import { useState } from "react";

export default function CopyLine({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* Clipboard is unavailable over plain http and in some embedded views.
         The text is selectable either way, so there is nothing to recover. */
    }
  }

  return (
    <div className="panel flex items-center gap-3 px-3 py-2.5 overflow-hidden">
      {label && <span className="eyebrow shrink-0">{label}</span>}
      <code className="mono text-[12px] text-[var(--body)] truncate flex-1">{text}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : `Copy ${label ?? "to clipboard"}`}
        className="mono shrink-0 text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm
                   border border-[var(--rule)] text-[var(--haze)]
                   hover:text-[var(--bright)] hover:border-[var(--haze)] transition-colors"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
