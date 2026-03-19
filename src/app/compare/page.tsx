import type { Metadata } from "next";
import { PedalCompare } from "./pedal-compare";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Compare Guitar Pedals Side by Side — A/B Comparison Tool",
  description:
    "Compare any two guitar pedals head-to-head. See specs, price, rating, pros & cons, and get a quick verdict to help you decide which pedal is right for you.",
};

export default function ComparePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <a href="/" className="hover:text-orange-500">Home</a>
          <span className="mx-2">›</span>
          <span>Compare Pedals</span>
        </nav>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          Compare <span className="text-orange-500">Pedals</span>
        </h1>
        <p className="mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
          Pick any two pedals from our database and see how they stack up. Specs, price, pros &amp; cons — all side by side.
        </p>
        <PedalCompare />
      </div>
    </div>
  );
}
