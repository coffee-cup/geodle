import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

const linkBase =
  "px-3 py-2 font-medium transition-colors text-ink-muted hover:text-ink";
const linkActive =
  "px-3 py-2 font-medium text-ink underline underline-offset-4 decoration-accent decoration-2";

export function Header() {
  return (
    <header className="flex flex-col items-center border-b-2 border-border">
      <div className="flex items-center justify-between w-full px-4 py-2.5">
        <ThemeToggle />
        <Link to="/" className="text-3xl font-serif italic text-ink underline decoration-wavy decoration-accent underline-offset-4 decoration-1">
          Geodle
        </Link>
        <Link
          to="/help"
          className="sketch-border size-8 flex items-center justify-center
            border border-border text-ink-muted text-sm font-semibold
            hover:text-ink transition-colors"
          aria-label="How to play"
        >
          ?
        </Link>
      </div>
      <nav className="flex gap-1 pb-2">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: linkActive }}
          inactiveProps={{ className: linkBase }}
        >
          Daily
        </Link>
        <Link
          to="/lives"
          activeProps={{ className: linkActive }}
          inactiveProps={{ className: linkBase }}
        >
          Lives
        </Link>
      </nav>
    </header>
  );
}
