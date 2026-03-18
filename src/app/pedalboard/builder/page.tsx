import type { Metadata } from "next";
import { PedalboardBuilder } from "./pedalboard-builder";

export const metadata: Metadata = {
  title: "Free Pedalboard Builder — Design Your Guitar Rig Online",
  description:
    "Build your dream pedalboard with our free visual tool. Drag and drop guitar pedals, check signal chain order, calculate power needs, and get your Amazon shopping list.",
};

export default function BuilderPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <a href="/" className="hover:text-orange-500">Home</a>
            <span className="mx-2">›</span>
            <a href="/pedalboard" className="hover:text-orange-500">Pedalboard</a>
            <span className="mx-2">›</span>
            <span>Builder</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Pedalboard <span className="text-orange-500">Builder</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Drag pedals onto your board, arrange your signal chain, and get a complete shopping list. No account needed.
          </p>
        </div>
        <PedalboardBuilder />
      </div>
    </div>
  );
}
