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
      if (!isOpen || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && highlightIndex >= 0) {
        e.preventDefault();
        selectCountry(results[highlightIndex]);
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
        className="w-full px-4 py-3 bg-white/80 border-2 border-stone-300 rounded-lg
          font-serif text-stone-800 placeholder:text-stone-400
          focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600
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
          className="absolute z-10 mt-1 w-full bg-white border border-stone-200
            rounded-lg shadow-lg overflow-hidden"
        >
          {results.map((country, i) => (
            <li
              key={country.code}
              role="option"
              aria-selected={i === highlightIndex}
              onMouseDown={() => selectCountry(country)}
              onMouseEnter={() => setHighlightIndex(i)}
              className={`px-4 py-2 cursor-pointer font-serif text-stone-800
                ${i === highlightIndex ? "bg-amber-50" : "hover:bg-stone-50"}
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
