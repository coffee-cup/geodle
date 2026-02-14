export function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("geodle-theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
      aria-label="Toggle theme"
    >
      <span className="dark:hidden">☾</span>
      <span className="hidden dark:inline">☀</span>
    </button>
  );
}
