import { useEffect, useState } from "react";
import logo from "../assets/images/LogoImgRivals.png";

function DoorIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 3h8a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        className="stroke-current"
        strokeWidth="1.5"
      />
      <path d="M16 7h2a2 2 0 0 1 2 2v10h-4" className="stroke-current" strokeWidth="1.5" />
      <circle cx="11" cy="12" r="1" className="fill-current" />
    </svg>
  );
}

export default function NavBar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Initialize and persist theme
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        {/* Nav bar: left -> theme + login, right -> tabs + search + logo (logo at far right) */}
        <div className="flex items-center justify-between py-3">
          {/* Left controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-md border border-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-gray-900 hover:text-white"
              title="Toggle theme"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>

            <button
              className="inline-flex items-center gap-1 rounded-md border border-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-gray-900 hover:text-white"
              title="Log in"
            >
              <DoorIcon className="h-4 w-4" />
              <span>Log in</span>
            </button>
          </div>

          {/* Right side: tabs + search + logo (logo on far right) */}
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-2">
              <a className="rounded px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-900 hover:text-white" href="#">
                Forums
              </a>
              <a className="rounded px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-900 hover:text-white" href="#">
                News
              </a>
              <a className="rounded px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-900 hover:text-white" href="#">
                Stats / Rankings
              </a>
            </nav>

            <div className="relative">
              <input
                type="text"
                placeholder="Search…"
                className="w-56 rounded-md border border-gray-800 bg-gray-900/70 px-3 py-1.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <img
              src={logo}
              alt="Rivals Logo"
              className="h-8 w-auto rounded-sm ring-1 ring-gray-800"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
