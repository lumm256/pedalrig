"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/types", label: "Pedal Types" },
  { href: "/pedal-order", label: "Signal Chain" },
  { href: "/pedalboard", label: "Pedalboard", exact: false },
  { href: "/beginners", label: "Beginners" },
  { href: "/compare", label: "Compare" },
];

export function NavLinks() {
  const pathname = usePathname();

  function isActive(href: string, exact = true) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            "transition-colors",
            isActive(link.href, link.exact !== false)
              ? "text-orange-500 font-medium"
              : "text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
          )}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}
