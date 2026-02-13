import { useState } from "react";
import { HelpModal } from "./HelpModal";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2.5 border-b-2 border-border">
        <ThemeToggle />
        <h1 className="text-3xl font-serif italic text-ink underline decoration-wavy decoration-accent underline-offset-4 decoration-1">
          Geodle
        </h1>
        <button
          onClick={() => setHelpOpen(true)}
          className="sketch-border size-8 flex items-center justify-center
            border border-border text-ink-muted text-sm font-semibold
            hover:text-ink transition-colors"
          aria-label="How to play"
        >
          ?
        </button>
      </header>
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
