import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PedalboardBuilder } from "./pedalboard-builder";

export const metadata: Metadata = {
  alternates: { canonical: "/pedalboard/builder" },
  title: "Free Pedalboard Planner & Builder — Plan Your Guitar Rig",
  description:
    "Plan your dream pedalboard with our free visual builder. Drag and drop guitar pedals, check signal chain order, calculate power needs, and get your Amazon shopping list.",
};

const STEPS = [
  {
    title: "Add your pedals",
    text: "Tap pedals from the library to drop them onto your board. Each one carries its type, price, and current draw, so the board updates as you go.",
  },
  {
    title: "Fix your signal chain",
    text: "The builder knows the standard order — tuner, dynamics, gain, modulation, time-based, volume — and flags any pedal that is out of place. Hit auto-sort to arrange the whole chain in one click.",
  },
  {
    title: "Check power and budget",
    text: "Your total current draw (mA) and total price update live, so you know exactly which power supply you need and what the rig costs before you buy.",
  },
  {
    title: "Get your shopping list & share it",
    text: "Every pedal links straight to Amazon, and a share link lets you save your board or send it to a friend for a second opinion.",
  },
];

const FAQS = [
  {
    q: "Is the pedalboard builder free? Do I need an account?",
    a: "It is completely free and there is no sign-up. Your board lives in the page — add, reorder, and remove pedals as much as you like, then grab a share link if you want to keep it.",
  },
  {
    q: "How do I know my pedal order is correct?",
    a: "The builder compares your layout against the standard signal chain and shows a warning whenever a pedal sits out of its usual position — for example a reverb placed before your distortion. You can follow the warnings manually or use auto-sort to arrange everything in the conventional order instantly. Order is a starting point, not a law, so the warnings are guidance you can override on purpose.",
  },
  {
    q: "How big a power supply do I need for my board?",
    a: "The builder adds up the current draw of every pedal and shows the total in milliamps (mA). When you shop for a power supply, pick one whose total output comfortably exceeds that number — aim for at least 20–30% of headroom so no single output is maxed out. Digital pedals like delays and multi-effects draw far more than analog stompboxes, which is why the running total matters.",
  },
  {
    q: "Will all my pedals fit on one board?",
    a: "That depends on the physical board you choose. Use the running pedal count here to gauge how much space you need, then match it to a board size — our pedalboard buying guide breaks down which boards suit 4, 8, or 12+ pedals.",
  },
  {
    q: "Can I save or share the board I build?",
    a: "Yes. The builder generates a share link that encodes your current board, so you can copy it, bookmark it, or send it to someone for feedback. Open the link later and your layout comes back exactly as you left it.",
  },
  {
    q: "Which pedals can I add to the builder?",
    a: "The builder draws from the PedalRig database — a curated set of popular guitar pedals across every effect type, from overdrive and fuzz to delay, reverb, and multi-effects. It is built for planning a realistic, buyable rig rather than cataloguing every pedal ever made.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PedalRig Pedalboard Builder",
        alternateName: ["Pedalboard Planner", "Guitar Pedalboard Planner"],
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url: "https://pedalrig.com/pedalboard/builder",
        description:
          "Free visual pedalboard planner: drag and drop guitar pedals, validate signal-chain order, total your power draw and budget, and export an Amazon shopping list.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: {
          "@type": "Organization",
          name: "PedalRig",
          url: "https://pedalrig.com",
        },
      },
      {
        "@type": "HowTo",
        name: "How to Build a Pedalboard Online",
        description:
          "Plan a guitar pedalboard from scratch: choose pedals, order the signal chain, size the power supply, and total the cost.",
        step: STEPS.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default function BuilderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link href="/" className="hover:text-orange-500">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/pedalboard" className="hover:text-orange-500">Pedalboard</Link>
              <span className="mx-2">›</span>
              <span>Builder</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Pedalboard <span className="text-orange-500">Planner</span> & Builder
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
              A free online pedalboard planner: drag pedals onto your board, arrange your signal chain, size your power supply, and get a complete shopping list. No account needed.
            </p>
          </div>

          <PedalboardBuilder />

          {/* ───── SSR content: how it works + how-to + FAQ ───── */}
          <section className="mt-16 max-w-3xl scroll-mt-20">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              How the pedalboard planner works
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Planning a pedalboard means juggling four things at once: which pedals you want, what
              order they go in, whether your power supply can run them, and what it all costs. This
              pedalboard planner (some players call it a pedalplanner) keeps those four in view
              together. As you add pedals it validates your signal chain against the conventional
              order, tallies the total current draw so you can size a power supply, sums the price,
              and turns the result into a ready-to-buy shopping list — all in the browser, with
              nothing to install.
            </p>
          </section>

          <section className="mt-10 max-w-3xl scroll-mt-20">
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
              How to use it, step by step
            </h2>
            <ol className="space-y-5">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-orange-500/15 text-sm font-bold text-orange-500">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Separator className="my-12 max-w-3xl bg-gray-200 dark:bg-gray-800" />

          <section className="max-w-3xl scroll-mt-20">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.q}>
                  <h3 className="mb-2 text-base font-semibold">{faq.q}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                  <Separator className="mt-6 bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </div>
          </section>

          {/* ───── Internal links ───── */}
          <div className="mt-12 max-w-3xl border-t border-gray-200 pt-8 dark:border-gray-800">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Plan the rest of your rig
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/pedal-order", label: "Signal Chain Order Guide" },
                { href: "/power-supply", label: "Power Supply Guide" },
                { href: "/best-pedalboard", label: "Best Pedalboards" },
                { href: "/best", label: "Best Pedals by Category" },
                { href: "/compare", label: "Compare Pedals" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-orange-500/40 hover:text-orange-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
