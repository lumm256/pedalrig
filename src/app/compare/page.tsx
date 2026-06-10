import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PedalCompare } from "./pedal-compare";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Compare Guitar Pedals Side by Side — A/B Comparison Tool",
  description:
    "Compare any two guitar pedals head-to-head. See specs, price, rating, pros & cons, and get a quick verdict to help you decide which pedal is right for you.",
};

const FAQS = [
  {
    q: "How does PedalRig decide which pedal wins a comparison?",
    a: "Each row in the table flags the stronger pedal on that single dimension — a higher rating, a lower price, a beefier feature set. There is no single overall 'winner', because the right pedal depends on what you value. A player on a tight budget weighs price differently than someone chasing a specific tone. Use the per-row badges as a guide, not a verdict.",
  },
  {
    q: "What specs matter most when comparing two pedals?",
    a: "It depends on the type. For gain pedals (overdrive, distortion, fuzz) the bypass type and voicing matter most. For time-based effects (delay, reverb) look at stereo support, presets, and tails. Two specs matter for every pedal regardless of type: current draw in milliamps (mA), which determines whether your power supply can run it, and physical footprint, which determines whether it fits your board.",
  },
  {
    q: "Can I compare two different types of pedal?",
    a: "You can pick any two pedals, but comparing across categories — say an overdrive against a delay — is not apples to apples, since they do completely different jobs in your signal chain. The comparison is most useful when both pedals solve the same problem, like two overdrives or two reverbs you are choosing between.",
  },
  {
    q: "Do more expensive pedals always sound better?",
    a: "No. Price reflects features, build, and brand as much as tone. Plenty of budget pedals rate as highly as boutique units for their core sound — the difference is often extra controls, stereo I/O, or presets rather than raw quality. That is exactly why a side-by-side comparison is useful: it separates what you are paying for from what you actually need.",
  },
  {
    q: "What is the difference between true bypass and buffered bypass?",
    a: "True bypass physically disconnects the pedal from your signal when it is off, so it adds nothing to your tone. Buffered bypass keeps a small circuit active that preserves your high frequencies over long cable runs and large boards. Neither is strictly better — true bypass is cleaner in isolation, but a buffer or two on a big board prevents the tone loss that comes from lots of cable and true-bypass pedals stacked together.",
  },
  {
    q: "Where can I buy the pedals I compare here?",
    a: "Every pedal in our database links to its current listing on Amazon. As an Amazon Associate, PedalRig earns from qualifying purchases at no extra cost to you — see our affiliate disclosure for details.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PedalRig Pedal Comparison Tool",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url: "https://pedalrig.com/compare",
        description:
          "Compare any two guitar pedals side by side — specs, price, rating, pros and cons, and a per-dimension verdict.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: {
          "@type": "Organization",
          name: "PedalRig",
          url: "https://pedalrig.com",
        },
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

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <div className="min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-orange-500">Home</Link>
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

          {/* ───── SSR content: methodology + how-to + FAQ ───── */}
          <section className="mt-16 scroll-mt-20">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              How to read a pedal comparison
            </h2>
            <p className="mb-6 max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400">
              Choosing between two pedals is rarely about which one is &ldquo;better&rdquo; in the
              abstract — it is about which one fits your rig, your budget, and the sound in your
              head. This tool lines up two pedals across the dimensions that actually drive that
              decision, so you can stop cross-referencing six browser tabs.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  t: "Type & signal-chain role",
                  d: "What the pedal does and where it sits in your chain. Two pedals of the same type are the only truly fair fight.",
                },
                {
                  t: "Street price",
                  d: "The real-world price, not MSRP. Often the deciding factor when two pedals are otherwise close.",
                },
                {
                  t: "Our rating",
                  d: "An out-of-5 score weighing tone, build, versatility, and value — not just specs on paper.",
                },
                {
                  t: "Key specs",
                  d: "Bypass type, controls, current draw (mA), and footprint — the practical details that decide whether a pedal works on your board.",
                },
                {
                  t: "Pros & cons",
                  d: "The honest trade-offs: what each pedal nails and where it compromises.",
                },
                {
                  t: "Per-row verdict",
                  d: "A badge marks the stronger pedal on each dimension so you can weigh the ones that matter to you.",
                },
              ].map((item) => (
                <div
                  key={item.t}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <p className="mb-1 font-semibold text-orange-500">{item.t}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.d}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-12 bg-gray-200 dark:bg-gray-800" />

          <section className="scroll-mt-20">
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
          <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Keep researching
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/best", label: "Best Pedals by Category" },
                { href: "/pedalboard/builder", label: "Board Builder" },
                { href: "/pedal-order", label: "Signal Chain Guide" },
                { href: "/famous", label: "Famous Pedalboards" },
                { href: "/types", label: "All Pedal Types" },
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
