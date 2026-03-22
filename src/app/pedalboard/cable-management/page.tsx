import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  alternates: { canonical: "/pedalboard/cable-management" },
  title:
    "Pedalboard Cable Management Guide: Clean Rig, Better Tone (2026)",
  description:
    "Master pedalboard cable management with our complete guide. Learn routing techniques, patch cable selection, solderless kits, and pro tips for a clean, noise-free rig.",
  keywords: [
    "pedalboard cable management",
    "guitar pedal cable management",
    "pedalboard wiring",
    "patch cables pedalboard",
    "pedalboard cable routing",
    "clean pedalboard setup",
    "pedalboard cable organizer",
  ],
};

const CABLE_TYPES = [
  {
    name: "Soldered Patch Cables",
    pros: [
      "Most reliable connection",
      "Low capacitance = better tone",
      "Slim profile saves space",
    ],
    cons: [
      "Fixed length — no adjusting",
      "Requires soldering skill or pre-made cables",
    ],
    bestFor: "Permanent setups where reliability is critical",
    brands: "Evidence Audio, George L's, Mogami",
    priceRange: "$5–15 per cable",
  },
  {
    name: "Solderless Patch Cable Kits",
    pros: [
      "Custom lengths — cut to exact size",
      "No soldering required",
      "Easy to reconfigure",
    ],
    cons: [
      "Connections can loosen over time",
      "Slightly higher failure rate than soldered",
    ],
    bestFor: "Players who frequently change their board layout",
    brands: "EBS, Lava Cable, Free The Tone",
    priceRange: "$40–80 per kit (makes 6–10 cables)",
  },
  {
    name: "Standard Patch Cables",
    pros: [
      "Cheap and widely available",
      "Durable molded connectors",
      "Good for starting out",
    ],
    cons: [
      "Bulky connectors take up space",
      "Fixed lengths create excess cable",
      "Higher capacitance on cheap cables",
    ],
    bestFor: "Beginners and budget builds",
    brands: "Hosa, Planet Waves, Fender",
    priceRange: "$3–8 per cable",
  },
  {
    name: "Flat / Low-Profile Patch Cables",
    pros: [
      "Ultra-thin — fits under pedals",
      "Flexible routing around tight spaces",
      "Pancake connectors save space",
    ],
    cons: [
      "Can be fragile at the connector junction",
      "Limited brand options",
    ],
    bestFor: "Tightly packed boards with minimal clearance",
    brands: "Rockboard, EBS, Donner",
    priceRange: "$5–12 per cable",
  },
];

const ROUTING_TIPS = [
  {
    title: "Route signal cables and power cables separately",
    detail:
      "Running signal cables parallel to power cables introduces noise and hum. Keep them on opposite sides of the board, or cross them at 90° angles when they must intersect. This single tip eliminates most pedalboard noise issues.",
    icon: "⚡",
  },
  {
    title: "Use the shortest cables possible",
    detail:
      "Every inch of cable adds capacitance, which rolls off high frequencies. A pedalboard with 20 feet of total cable length sounds noticeably duller than one with 8 feet. Solderless kits let you cut cables to exact length.",
    icon: "📏",
  },
  {
    title: "Route cables underneath the board",
    detail:
      "Most pedalboard frames (Pedaltrain, Temple Audio) have space underneath for cable routing. Run your cables under the board between pedal rows. This keeps the top clean and prevents accidental disconnections from foot stomping.",
    icon: "⬇️",
  },
  {
    title: "Secure cables with zip ties or velcro straps",
    detail:
      "Loose cables shift during transport, pull connectors out, and create noise. Secure them with velcro cable ties (reusable and adjustable) or zip ties (more permanent). Velcro ties are preferred because you can reposition them when you change your layout.",
    icon: "🔒",
  },
  {
    title: "Label your cables",
    detail:
      "When troubleshooting noise or signal issues, knowing which cable goes where saves hours. Use colored tape, heat-shrink labels, or different colored cables for signal vs. power. Your future self will thank you.",
    icon: "🏷️",
  },
  {
    title: "Plan your layout before connecting anything",
    detail:
      "Place all pedals on the board without cables first. Arrange them following your signal chain order with inputs and outputs facing each other to minimize cable runs. Then connect, starting from the end of the chain and working backward.",
    icon: "📐",
  },
  {
    title: "Use a junction box for input/output",
    detail:
      "A junction box (like the Pedaltrain Novo System or a custom I/O plate) gives you fixed input/output jacks on the side of your board. This means you only plug/unplug two cables when setting up — everything else stays connected inside.",
    icon: "🔌",
  },
  {
    title: "Leave slack for pedal swaps",
    detail:
      "Don't cut every cable to the absolute minimum. Leave 1-2 inches of slack so you can swap a pedal for a slightly different-sized one without re-cabling the entire board.",
    icon: "↔️",
  },
];

const COMMON_MISTAKES = [
  {
    mistake: "Using cheap daisy-chain power cables near signal cables",
    fix: "Invest in an isolated power supply (like the Voodoo Lab Pedal Power) and route power cables separately from signal cables.",
  },
  {
    mistake: "Running 6-inch cables between pedals that are 2 inches apart",
    fix: "Cut solderless cables to exact length, or buy patch cables in multiple sizes (3\", 6\", 12\").",
  },
  {
    mistake: "Zip-tying cables too tightly to the board frame",
    fix: "Use velcro cable ties instead. They're reusable and won't damage cables when you need to make changes.",
  },
  {
    mistake: "Ignoring cable quality for the 'it's just patch cables' mindset",
    fix: "Patch cables carry your entire signal. One bad cable ruins your tone. Use quality cables with good shielding.",
  },
  {
    mistake: "No strain relief on connectors",
    fix: "Make sure cables aren't pulling on jack connections at sharp angles. Route them with gentle curves and secure near the connector.",
  },
];

const CHECKLIST = [
  "Map your signal chain order on paper first",
  "Choose a board with under-mounting space (Pedaltrain, Temple Audio)",
  "Get an isolated power supply — not a daisy chain",
  "Measure cable distances between pedals before buying/cutting",
  "Buy solderless kit or pre-measured patch cables",
  "Route power cables on one side, signal on the other",
  "Run cables underneath the board between rows",
  "Secure all cables with velcro ties",
  "Test signal with each pedal individually after wiring",
  "Play for a week before finalizing — you might want to swap something",
];

const FAQS = [
  {
    q: "What is the best patch cable for a pedalboard?",
    a: "For most players, a solderless kit (like EBS or Lava Cable) offers the best balance of quality, flexibility, and convenience. If you want maximum reliability and don't change your layout often, soldered cables from Evidence Audio or Mogami are the gold standard.",
  },
  {
    q: "How do I reduce noise on my pedalboard?",
    a: "Three things: (1) Use an isolated power supply instead of a daisy chain, (2) separate signal cables from power cables — route them on different sides of the board, and (3) cross signal and power cables at 90° angles when they must intersect. This eliminates 90% of pedalboard noise.",
  },
  {
    q: "Should I use right-angle or straight plugs?",
    a: "Right-angle (pancake) plugs save the most space and keep your board tidy. Use them on pedals with side-mounted jacks. Straight plugs work fine on pedals with top-mounted jacks. Many solderless kits include both types.",
  },
  {
    q: "How many patch cables do I need?",
    a: "You need one fewer patch cable than the number of pedals, plus one cable from your guitar to the board and one from the board to the amp. For example: 8 pedals = 7 patch cables + 2 instrument cables = 9 total cables.",
  },
  {
    q: "Does cable length affect my tone?",
    a: "Yes. Long cables add capacitance, which rolls off high frequencies. A pedalboard with minimal, well-routed cables sounds brighter and more present than one with excess cable length. This is why cutting cables to exact length matters — and why a buffer pedal at the start of your chain can help.",
  },
  {
    q: "What is cable management velcro and where do I get it?",
    a: "Cable management velcro ties are reusable straps that wrap around cable bundles to keep them organized. Brands like Velcro One-Wrap, Pedaltrain, and generic cable ties from Amazon all work great. They're cheap, reusable, and far better than zip ties for pedalboards.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: "How to Manage Cables on Your Guitar Pedalboard",
        description:
          "Step-by-step guide to organizing cables on your pedalboard for clean routing, less noise, and better tone.",
        step: ROUTING_TIPS.map((tip, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: tip.title,
          text: tip.detail,
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
      {
        "@type": "Article",
        headline:
          "Pedalboard Cable Management Guide: Clean Rig, Better Tone",
        description:
          "Complete guide to pedalboard cable management including routing techniques, patch cable selection, and pro tips.",
        author: { "@type": "Organization", name: "PedalRig" },
        publisher: {
          "@type": "Organization",
          name: "PedalRig",
          url: "https://pedalrig.com",
        },
        datePublished: "2026-03-22",
        dateModified: "2026-03-22",
      },
    ],
  };
}

export default function CableManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-zinc-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/pedalboard" className="hover:underline">Pedalboard</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-zinc-900 dark:text-zinc-100 font-medium">Cable Management</li>
            </ol>
          </nav>

          {/* Hero */}
          <header className="mb-14">
            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
              Pedalboard Setup Guide
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Pedalboard Cable Management: The Complete Guide
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              A messy pedalboard isn&apos;t just ugly — it causes noise, signal loss, and
              reliability problems. Good cable management improves your tone, makes
              troubleshooting easier, and looks professional. Here&apos;s how to do it right.
            </p>
          </header>

          {/* TOC */}
          <nav className="mb-14 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Contents</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              <li><a href="#why" className="text-orange-500 hover:underline">Why Cable Management Matters</a></li>
              <li><a href="#cables" className="text-orange-500 hover:underline">Choosing the Right Patch Cables</a></li>
              <li><a href="#routing" className="text-orange-500 hover:underline">8 Pro Routing Tips</a></li>
              <li><a href="#mistakes" className="text-orange-500 hover:underline">Common Mistakes</a></li>
              <li><a href="#checklist" className="text-orange-500 hover:underline">Setup Checklist</a></li>
              <li><a href="#faq" className="text-orange-500 hover:underline">FAQ</a></li>
            </ul>
          </nav>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* Why It Matters */}
          <section id="why" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Why Pedalboard Cable Management Matters
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                Every cable on your pedalboard is part of your signal path. Bad cables,
                sloppy routing, and tangled wiring directly affect three things:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6">
                {[
                  { icon: "🔊", title: "Tone", desc: "Excess cable length adds capacitance, rolling off highs. Clean, short runs preserve your signal." },
                  { icon: "🔇", title: "Noise", desc: "Signal cables running parallel to power cables pick up electromagnetic interference — the dreaded hum and buzz." },
                  { icon: "🔧", title: "Reliability", desc: "Loose, unsecured cables pull out during gigs. One bad connection = dead signal on stage." },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-bold mt-2 mb-1">{item.title}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p>
                A well-cabled board doesn&apos;t just look better — it sounds better, breaks
                less, and is easier to modify when you swap pedals. The 30 minutes you
                spend on cable management saves hours of troubleshooting later.
              </p>
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* Patch Cable Types */}
          <section id="cables" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Choosing the Right Patch Cables
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Not all patch cables are equal. Here are the four main types and when to use each.
            </p>
            <div className="space-y-4">
              {CABLE_TYPES.map((cable) => (
                <Card key={cable.name} className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-bold text-base">{cable.name}</h3>
                      <Badge variant="outline" className="text-xs border-zinc-300 dark:border-zinc-700">
                        {cable.priceRange}
                      </Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold text-green-500 uppercase tracking-wider mb-1">Pros</p>
                        <ul className="space-y-1">
                          {cable.pros.map((p) => (
                            <li key={p} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5">
                              <span className="text-green-500 shrink-0">✓</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">Cons</p>
                        <ul className="space-y-1">
                          {cable.cons.map((c) => (
                            <li key={c} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5">
                              <span className="text-red-500 shrink-0">✗</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-zinc-500 pt-1">
                      <span><strong>Best for:</strong> {cable.bestFor}</span>
                      <span><strong>Brands:</strong> {cable.brands}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* Routing Tips */}
          <section id="routing" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              8 Pro Cable Routing Tips
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Follow these techniques for a clean, quiet, professional-looking pedalboard.
            </p>
            <div className="space-y-4">
              {ROUTING_TIPS.map((tip, i) => (
                <div key={i} className="p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{tip.icon}</span>
                    <div>
                      <p className="font-bold text-sm mb-1">
                        <span className="text-orange-500 mr-2">{i + 1}.</span>
                        {tip.title}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {tip.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* Common Mistakes */}
          <section id="mistakes" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Common Cable Management Mistakes
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-sm">
              Avoid these — they cause noise, tone loss, and mid-gig failures.
            </p>
            <div className="space-y-3">
              {COMMON_MISTAKES.map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                    <span>⚠️</span> {item.mistake}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 font-medium">Fix:</span> {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* Checklist */}
          <section id="checklist" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Pedalboard Cable Setup Checklist
            </h2>
            <div className="p-5 rounded-xl bg-orange-500/5 border border-orange-500/15">
              <ol className="space-y-2.5">
                {CHECKLIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs text-orange-500 font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* FAQ */}
          <section id="faq" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold mb-2 text-base">{faq.q}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                  <Separator className="mt-6 bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-50 dark:to-zinc-900 border border-orange-500/20 p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Plan Your Pedalboard Layout
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-lg mx-auto">
              Use our interactive Board Builder to arrange your pedals, check cable
              distances, and plan the perfect layout before you start wiring.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pedalboard/builder"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Open Board Builder →
              </Link>
              <Link
                href="/pedal-order"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                Signal Chain Guide
              </Link>
              <Link
                href="/power-supply"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                Power Supply Guide
              </Link>
            </div>
          </section>

          {/* Internal links */}
          <div className="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              Related Guides
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/pedalboard", label: "Pedalboard Setup" },
                { href: "/pedalboard/builder", label: "Board Builder" },
                { href: "/pedal-order", label: "Signal Chain Guide" },
                { href: "/power-supply", label: "Power Supply Guide" },
                { href: "/compare", label: "Compare Pedals" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:border-orange-500/40 hover:text-orange-500 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
