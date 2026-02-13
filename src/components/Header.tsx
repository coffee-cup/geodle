import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HelpModal } from "./HelpModal";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  mode?: "daily" | "lives";
}

export function Header({ mode = "daily" }: HeaderProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col items-center border-b-2 border-border">
        <div className="flex items-center justify-between w-full px-4 py-2.5">
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
        </div>
        <nav className="flex gap-4 pb-2 text-sm font-medium">
          <Link
            to="/"
            className={`transition-colors ${mode === "daily" ? "text-ink underline underline-offset-4 decoration-accent" : "text-ink-muted hover:text-ink"}`}
          >
            Daily
          </Link>
          <Link
            to="/lives"
            className={`transition-colors ${mode === "lives" ? "text-ink underline underline-offset-4 decoration-accent" : "text-ink-muted hover:text-ink"}`}
          >
            Lives
          </Link>
        </nav>
      </header>
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
