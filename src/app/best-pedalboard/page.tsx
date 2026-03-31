import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Best Pedalboard 2026: Top Picks for Every Budget | PedalRig",
  description:
    "The best guitar pedalboards in 2026, from nano boards to pro rigs. Compare top brands, sizes, prices, and find the perfect board for your setup.",
  alternates: { canonical: "/best-pedalboard" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best pedalboard for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For beginners, the Donner DB-3 or Pedaltrain Nano are great starting points. They're affordable, hold 4–6 pedals, and come with a carry bag. You don't need to spend a lot until you know exactly which pedals you'll be running.",
      },
    },
    {
      "@type": "Question",
      name: "What size pedalboard do I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on how many pedals you run. Nano boards (12\"×6\") fit 3–5 pedals and suit minimalists. Classic/medium boards (24\"×12\") fit 8–12 pedals and work for most gigging players. Large boards (32\"×16\") are for touring pros with 15+ pedals.",
      },
    },
    {
      "@type": "Question",
      name: "Do pedalboards come with a power supply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most pedalboards do NOT include a power supply — you need to buy one separately. Budget boards (Donner, Gator) sometimes include a basic daisy-chain power supply, but isolated power supplies (like Strymon Zuma or MXR DC Brick) are much better for noise-free tone.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between open-frame and closed-frame pedalboards?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open-frame boards (like Pedaltrain) have rails with gaps underneath, making it easy to route cables and mount a power supply below. Closed-frame boards (like some Gator cases) have a solid surface, which can be sturdier but makes cable management harder.",
      },
    },
    {
      "@type": "Question",
      name: "How do I attach pedals to a pedalboard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most players use hook-and-loop (Velcro) tape — it's cheap, flexible, and lets you rearrange pedals easily. Some boards use bolt-mounting or zip-ties through the rails. For touring, consider stronger industrial Velcro or locking systems like Temple Audio's quick-release plates.",
      },
    },
  ],
};

type BoardSize = "Nano" | "Classic" | "Pro";

interface BoardPick {
  name: string;
  brand: string;
  size: BoardSize;
  dimensions: string;
  pedalCapacity: string;
  priceRange: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  badge?: string;
  amazonUrl?: string;
}

const boardPicks: BoardPick[] = [
  {
    name: "Pedaltrain Nano+",
    brand: "Pedaltrain",
    size: "Nano",
    dimensions: '17.5" × 7.5"',
    pedalCapacity: "4–6 pedals",
    priceRange: "$$",
    bestFor: "Bedroom players, fly gigs, minimalists",
    pros: [
      "Ultra-lightweight aluminum frame",
      "Fits in overhead bin — ideal for fly gigs",
      "Comes with soft case included",
    ],
    cons: [
      "Limited real estate — 6 pedals max",
      "No built-in power supply",
    ],
    badge: "🏆 Best Nano Board",
    amazonUrl: "https://www.amazon.com/s?k=Pedaltrain+Nano+Plus&tag=pedalrig-20",
  },
  {
    name: "Donner DB-3",
    brand: "Donner",
    size: "Nano",
    dimensions: '11.8" × 7.9"',
    pedalCapacity: "3–5 pedals",
    priceRange: "$",
    bestFor: "Beginners on a tight budget",
    pros: [
      "Comes with basic power supply",
      "Includes carry bag",
      "Incredibly affordable entry point",
    ],
    cons: [
      "Aluminum frame feels thin",
      "Included power supply is daisy-chain only",
    ],
    badge: "💰 Best Budget Pick",
    amazonUrl: "https://www.amazon.com/s?k=Donner+DB-3+Pedalboard&tag=pedalrig-20",
  },
  {
    name: "Pedaltrain Classic 1",
    brand: "Pedaltrain",
    size: "Classic",
    dimensions: '22" × 12.5"',
    pedalCapacity: "8–12 pedals",
    priceRange: "$$$",
    bestFor: "Gigging musicians, home studio rigs",
    pros: [
      "Industry-standard open-frame design",
      "Plenty of undersurface space for power supply",
      "Comes with tour-grade soft case",
    ],
    cons: [
      "No power supply included",
      "Pricier than competitors at this size",
    ],
    badge: "🎸 Best Mid-Size Board",
    amazonUrl: "https://www.amazon.com/s?k=Pedaltrain+Classic+1&tag=pedalrig-20",
  },
  {
    name: "Temple Audio Duo 17",
    brand: "Temple Audio",
    size: "Classic",
    dimensions: '17" × 11"',
    pedalCapacity: "6–10 pedals",
    priceRange: "$$$",
    bestFor: "Players who swap rigs frequently",
    pros: [
      "Quick-release pedal plates — swap pedals in seconds",
      "Solid aluminum chassis built like a tank",
      "Modular: connect multiple boards",
    ],
    cons: [
      "Requires proprietary mounting plates per pedal",
      "Higher upfront investment",
    ],
    badge: "⚡ Most Innovative",
    amazonUrl: "https://www.amazon.com/s?k=Temple+Audio+Duo+17&tag=pedalrig-20",
  },
  {
    name: "Holeyboard 24",
    brand: "Holeyboard",
    size: "Pro",
    dimensions: '24" × 14"',
    pedalCapacity: "12–20 pedals",
    priceRange: "$$$",
    bestFor: "Tone chasers, studio players, large rigs",
    pros: [
      "Perforated design — route cables through the board cleanly",
      "Extremely clean look when fully loaded",
      "Compatible with standard power supplies",
    ],
    cons: [
      "No included case",
      "Requires more planning for cable routing",
    ],
    badge: "🎯 Best Large Board",
    amazonUrl: "https://www.amazon.com/s?k=Holeyboard+24&tag=pedalrig-20",
  },
  {
    name: "Pedaltrain Pro",
    brand: "Pedaltrain",
    size: "Pro",
    dimensions: '32" × 16"',
    pedalCapacity: "15–25 pedals",
    priceRange: "$$$$",
    bestFor: "Touring pros, full production rigs",
    pros: [
      "Massive real estate for any rig size",
      "Rock-solid road-tested construction",
      "Hard case available separately",
    ],
    cons: [
      "Heavy — not practical without a roadie",
      "Overkill for 90% of players",
    ],
    badge: "👑 Best Pro Board",
    amazonUrl: "https://www.amazon.com/s?k=Pedaltrain+Pro&tag=pedalrig-20",
  },
];

const sizeGroups: { size: BoardSize; label: string; desc: string }[] = [
  { size: "Nano", label: "Nano / Small", desc: "3–6 pedals · Under 20\" · Great for fly gigs and minimalists" },
  { size: "Classic", label: "Classic / Medium", desc: "8–12 pedals · 20–26\" · The sweet spot for most gigging players" },
  { size: "Pro", label: "Large / Pro", desc: "12–25 pedals · 26\"+ · For full productions and touring rigs" },
];

function PriceTag({ range }: { range: string }) {
  return (
    <span className="text-orange-500 font-bold text-sm tracking-wide">{range}</span>
  );
}

function BoardCard({ board }: { board: BoardPick }) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            {board.badge && (
              <span className="inline-block text-xs font-bold text-orange-500 uppercase tracking-wide mb-1">
                {board.badge}
              </span>
            )}
            <CardTitle className="text-base leading-snug">{board.name}</CardTitle>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">{board.brand}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <PriceTag range={board.priceRange} />
            <p className="text-xs text-zinc-400 mt-1">{board.pedalCapacity}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">{board.dimensions}</Badge>
          <Badge variant="outline" className="text-xs">{board.bestFor}</Badge>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold text-green-500 uppercase tracking-wide mb-1">Pros</p>
            <ul className="space-y-1">
              {board.pros.map((pro) => (
                <li key={pro} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                  <span className="text-green-500 flex-shrink-0">+</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">Cons</p>
            <ul className="space-y-1">
              {board.cons.map((con) => (
                <li key={con} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                  <span className="text-red-400 flex-shrink-0">−</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {board.amazonUrl && (
          <a
            href={board.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
          >
            View on Amazon →
          </a>
        )}
      </CardContent>
    </Card>
  );
}

export default function BestPedalboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-300">Best Pedalboards 2026</span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl font-bold mb-4">
          Best Pedalboards 2026 — Buyer&apos;s Guide &amp; Top Picks
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
          A great pedalboard is the foundation of your rig. The wrong one means tangled cables,
          rattling pedals, and a setup that&apos;s a nightmare to transport. The right one makes
          every gig and session faster to set up and better sounding.
        </p>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed">
          We&apos;ve tested and compared the top options across every size and price range. Whether
          you&apos;re running 4 pedals or 20, there&apos;s a board here for your rig. Updated for 2026.
        </p>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* Why it matters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Your Pedalboard Matters</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
            Most guitarists obsess over pedals and neglect the board itself — then wonder why their
            tone is noisy, their setup takes 20 minutes, or a pedal flies off mid-gig.
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            A quality pedalboard does three things: holds your pedals securely, routes cables cleanly,
            and makes transport practical. Get those three right and the rest is just tone-chasing.
          </p>
        </section>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* How we chose */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How We Chose the Best Pedalboards</h2>
          <ul className="space-y-2">
            {[
              "Build quality — aluminum frame vs. wood vs. plastic, and how it holds up over time",
              "Size accuracy — do the stated dimensions actually fit the claimed pedal count?",
              "Cable management — open-frame rail design, side ports, undersurface space",
              "Portability — weight, included bag or case, airline-friendly sizing",
              "Value — is the price justified by what you get?",
              "Community feedback — what gigging players and touring musicians actually say",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-zinc-500 dark:text-zinc-400 text-sm">
                <span className="text-orange-500 flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* By size */}
        {sizeGroups.map((group) => {
          const picks = boardPicks.filter((b) => b.size === group.size);
          return (
            <section key={group.size} className="mb-16">
              <h2 className="text-2xl font-bold mb-1">Best {group.label} Pedalboards</h2>
              <p className="text-zinc-400 text-sm mb-6">{group.desc}</p>
              <div className="space-y-4">
                {picks.map((board) => (
                  <BoardCard key={board.name} board={board} />
                ))}
              </div>
              <Separator className="mt-10 bg-zinc-200 dark:bg-zinc-800" />
            </section>
          );
        })}

        {/* What to look for */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">What to Look for When Buying a Pedalboard</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Frame Material",
                desc: "Aluminum is the gold standard — lightweight and rigid. Wood boards are heavier but sometimes cheaper. Avoid thin plastic if you gig regularly.",
              },
              {
                title: "Open vs. Closed Frame",
                desc: "Open-frame rails (like Pedaltrain) let you mount a power supply underneath and route cables cleanly. Closed boards are more rigid but harder to cable-manage.",
              },
              {
                title: "Size vs. Your Pedal Count",
                desc: "Add 30% extra space to what you think you need. You will add more pedals. Everyone does.",
              },
              {
                title: "Included Case or Bag",
                desc: "A soft case is fine for most. If you fly with your rig or tour heavily, invest in a hard case separately — it will pay for itself the first time an airline handles your gear.",
              },
              {
                title: "Power Supply Compatibility",
                desc: "Make sure there's undersurface clearance or mounting space for a power supply. Daisy chains are noisy. Get an isolated supply like the MXR DC Brick or Strymon Zuma.",
              },
              {
                title: "Velcro vs. Mounting Plates",
                desc: "Hook-and-loop Velcro is the universal standard and works well. Temple Audio's mounting plate system is faster for rearranging but requires buying plates for each pedal.",
              },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="border-b border-zinc-200 dark:border-zinc-800 pb-6 last:border-0">
                <h3 className="font-semibold mb-2">{faq.name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* Conclusion + internal links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">The Bottom Line</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
            For most players, the <strong>Pedaltrain Classic 1</strong> hits the sweet spot — enough
            room to grow, built to last, and a proven choice for gigging musicians. If you&apos;re just
            starting out, the <strong>Donner DB-3</strong> gets you up and running for under $50.
            And if you&apos;re a serial pedal-swapper, <strong>Temple Audio</strong> will change your life.
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Once you have your board sorted, head over to the{" "}
            <Link href="/pedalboard" className="text-orange-500 hover:text-orange-400 underline underline-offset-2">
              Pedalboard Setup Guide
            </Link>{" "}
            for tips on mounting, power, and cable routing. Or jump straight into the{" "}
            <Link href="/pedalboard/builder" className="text-orange-500 hover:text-orange-400 underline underline-offset-2">
              Pedalboard Builder
            </Link>{" "}
            to plan your exact layout before you buy.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-100 dark:to-zinc-900 border border-orange-500/20 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Plan your pedalboard layout</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Use our free Pedalboard Builder to map out your pedals, check signal chain order,
            and see how everything fits before committing to a board size.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pedalboard/builder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              Try the Board Builder →
            </Link>
            <Link
              href="/pedalboard/cable-management"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 font-semibold hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              Cable Management Guide
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
