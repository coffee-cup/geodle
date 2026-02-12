import { useState } from "react";
import { HelpModal } from "./HelpModal";

export function Header() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
        <div className="w-10" />
        <h1 className="text-3xl font-serif font-bold tracking-tight text-stone-800">
          Geodle
        </h1>
        <button
          onClick={() => setHelpOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full
            hover:bg-stone-200 transition-colors text-stone-500"
          aria-label="How to play"
        >
          ?
        </button>
      </header>
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
