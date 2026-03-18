"use client";

import { useState } from "react";

const navLinks = [
  { href: "/types", label: "Pedal Types" },
  { href: "/pedal-order", label: "Signal Chain" },
  { href: "/pedalboard", label: "Pedalboard" },
  { href: "/beginners", label: "Beginners" },
  { href: "/power-supply", label: "Power Supply" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-orange-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 border-t border-gray-200 dark:border-gray-800 pt-2">
              <a
                href="/pedalboard/builder"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-orange-500 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 transition-colors"
              >
                ⚡ Board Builder
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
