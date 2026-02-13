import { useState, useRef, useCallback } from "react";
import { searchCountries } from "@/lib/countries";
import type { CountryListItem } from "@/types";

interface GuessInputProps {
  onSubmit: (code: string) => void;
  disabled: boolean;
}

export function GuessInput({ onSubmit, disabled }: GuessInputProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CountryListItem[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length > 0) {
      setResults(searchCountries(value));
      setIsOpen(true);
      setHighlightIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, []);

  const selectCountry = useCallback(
    (country: CountryListItem) => {
      setQuery("");
      setResults([]);
      setIsOpen(false);
      setHighlightIndex(-1);
      onSubmit(country.code);
    },
    [onSubmit],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const target =
          highlightIndex >= 0 ? results[highlightIndex] : results[0];
        if (target) selectCountry(target);
        return;
      }

      if (!isOpen || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    [isOpen, results, highlightIndex, selectCountry],
  );

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
        disabled={disabled}
        placeholder={disabled ? "Game over" : "Type a country name..."}
        className="sketch-border w-full px-4 py-3 bg-surface/80 border border-border
          text-ink placeholder:text-ink-muted/50
          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors"
        autoComplete="off"
        aria-label="Guess a country"
        aria-expanded={isOpen}
        role="combobox"
        aria-controls="country-listbox"
      />

      {isOpen && results.length > 0 && (
        <ul
          id="country-listbox"
          role="listbox"
          className="sketch-border absolute z-10 mt-1 w-full bg-surface border border-border
            overflow-hidden"
        >
          {results.map((country, i) => (
            <li
              key={country.code}
              role="option"
              aria-selected={i === highlightIndex}
              onMouseDown={() => selectCountry(country)}
              onMouseEnter={() => setHighlightIndex(i)}
              className={`px-4 py-2 cursor-pointer text-ink
                ${i === highlightIndex ? "bg-accent/10" : "hover:bg-paper"}
                transition-colors`}
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
