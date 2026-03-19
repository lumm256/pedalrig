import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "DIY Guitar Pedal Kits 2026 — Build Your Own Effects Pedals",
  description:
    "Build your own guitar pedals with these beginner-friendly DIY kits. Learn soldering, save money, and customize your tone.",
  alternates: { canonical: "/diy" },
};

const KITS = [
  {
    name: "BYOC Overdrive Kit",
    price: 49,
    difficulty: "Easy",
    description:
      "A faithful recreation of the classic Tube Screamer circuit. Great first build — only a handful of components and a well-documented PCB. You'll end up with a pro-quality overdrive for a fraction of the retail price.",
    circuit: "Tube Screamer (JRC4558 op-amp clipping)",
    searchQuery: "BYOC Overdrive Kit guitar pedal",
  },
  {
    name: "StewMac Fuzz Face Kit",
    price: 39,
    difficulty: "Easy",
    description:
      "One of the simplest fuzz circuits ever designed — just two transistors and a handful of passives. Perfect for learning the basics of soldering and circuit theory without getting overwhelmed.",
    circuit: "Fuzz Face (germanium/silicon transistor)",
    searchQuery: "StewMac Fuzz Face Kit guitar pedal",
  },
  {
    name: "Aion FX Andromeda Delay Kit",
    price: 59,
    difficulty: "Medium",
    description:
      "A PT2399-based analog delay with warm, slightly degraded repeats. Aion FX kits are known for exceptional documentation and PCB quality. A satisfying step up once you've done a simpler build.",
    circuit: "PT2399 digital delay chip (analog-voiced)",
    searchQuery: "Aion FX Andromeda Delay Kit guitar pedal",
  },
  {
    name: "MOD Kits DIY The Persuader Deluxe",
    price: 69,
    difficulty: "Medium",
    description:
      "A dual-channel overdrive with independent gain and tone controls per channel. More components than the beginner kits, but MOD's instructions are clear and the result is a genuinely giggable pedal.",
    circuit: "Dual-channel op-amp overdrive",
    searchQuery: "MOD Kits DIY Persuader Deluxe guitar pedal",
  },
  {
    name: "Build Your Own Clone Li'l Mouse",
    price: 35,
    difficulty: "Easy",
    description:
      "A clone of the legendary ProCo RAT distortion. BYOC's Li'l Mouse is one of the most popular starter kits — affordable, well-documented, and the end result sounds fantastic.",
    circuit: "ProCo RAT (LM308 op-amp hard clipping)",
    searchQuery: "Build Your Own Clone Lil Mouse guitar pedal kit",
  },
];

const TOOLS = [
  { icon: "🔧", name: "Soldering Iron", note: "25–40W temperature-controlled. Don't cheap out here." },
  { icon: "🪡", name: "Solder", note: "60/40 rosin-core, 0.6mm diameter works well for pedal work." },
  { icon: "📏", name: "Multimeter", note: "For checking continuity and voltage. Any $15 unit works." },
  { icon: "✂️", name: "Wire Cutters / Strippers", note: "Flush cutters for trimming component leads." },
  { icon: "🔍", name: "Helping Hands / PCB Holder", note: "Keeps the board steady while you solder." },
  { icon: "🧹", name: "Flux & Isopropyl Alcohol", note: "Clean flux residue after soldering for a pro finish." },
  { icon: "💡", name: "Good Lighting", note: "A desk lamp or headlamp makes a huge difference." },
];

const STEPS = [
  {
    step: 1,
    title: "Read the Instructions First",
    desc: "Before touching a component, read the entire build guide. Understand the signal flow and identify every part. Surprises mid-build are how mistakes happen.",
  },
  {
    step: 2,
    title: "Sort and Identify Components",
    desc: "Lay out all resistors, capacitors, and ICs. Use a multimeter to verify resistor values — color codes are easy to misread under artificial light.",
  },
  {
    step: 3,
    title: "Populate the PCB (Low to High)",
    desc: "Start with the shortest components: resistors, diodes, then capacitors, then ICs and transistors. Solder in height order so the board lies flat as you work.",
  },
  {
    step: 4,
    title: "Wire the Off-Board Components",
    desc: "Pots, jacks, switches, and the LED connect off-board. Keep wires short and tidy. Label them if your kit doesn't color-code them.",
  },
  {
    step: 5,
    title: "Test Before Boxing",
    desc: "Power up the bare board before drilling or boxing. Plug in a guitar and amp, check for signal. Fix any cold joints or wrong component values now — it's much easier outside the enclosure.",
  },
  {
    step: 6,
    title: "Box It Up",
    desc: "Drill the enclosure, mount the hardware, and do your final wiring. Take your time with the enclosure — it's the part everyone sees.",
  },
];

const TIPS = [
  "Use a temperature-controlled iron set to 350°C. Too hot burns pads; too cold makes cold joints.",
  "Tin your iron tip before every session and wipe it on a damp sponge frequently.",
  "If a joint looks dull or grainy, reheat it and add a tiny bit of fresh solder.",
  "Take photos at each stage so you can reference your wiring if something goes wrong.",
  "Join the r/diypedals community — someone has built your kit before and can help troubleshoot.",
];

const FAQS = [
  {
    q: "Do I need prior electronics experience?",
    a: "No. Easy-rated kits are designed for complete beginners. If you can follow instructions and hold a soldering iron, you can build a pedal. Start with a simple fuzz or overdrive kit.",
  },
  {
    q: "How long does a first build take?",
    a: "Expect 3–6 hours for a beginner kit if you're new to soldering. Experienced builders can knock out a simple pedal in 1–2 hours. Don't rush — cold solder joints are the #1 cause of problems.",
  },
  {
    q: "Is it actually cheaper than buying a pedal?",
    a: "Yes, significantly. A $49 BYOC Overdrive kit produces a pedal that would cost $150+ retail. You also get the satisfaction of knowing exactly what's inside and the ability to mod it later.",
  },
  {
    q: "What if my pedal doesn't work after building?",
    a: "Don't panic. Check for cold solder joints first (they look dull or grainy). Then verify component orientation — electrolytic caps and diodes are polarized. Use a multimeter to trace the signal through the circuit.",
  },
  {
    q: "Can I customize the circuit after building?",
    a: "Absolutely — that's one of the best parts of DIY. Swap capacitor values to change the tone character, try different clipping diodes for different saturation, or add a tone bypass switch. The community has documented hundreds of mods.",
  },
];

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Medium: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  Hard: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export default function DIYPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-300">DIY Pedal Kits</span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl font-bold mb-4">DIY Guitar Pedal Kits — Build Your Own Effects</h1>

        {/* Intro */}
        <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
          Building your own guitar pedals is one of the most rewarding things you can do as a guitarist.
          You save serious money — a $50 kit often produces a pedal that retails for $150 or more. You
          learn how electronics actually work, which means you can fix, mod, and customize any pedal you
          own. And you end up with a tone that's uniquely yours.
        </p>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed">
          You don't need an engineering degree. Modern DIY kits come with pre-drilled enclosures,
          labeled PCBs, and step-by-step instructions. If you can follow a recipe, you can build a pedal.
        </p>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* Best Kits */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Best DIY Kits for Beginners</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            These five kits are the most recommended starting points in the DIY pedal community — good
            documentation, quality PCBs, and satisfying results.
          </p>
          <div className="space-y-6">
            {KITS.map((kit) => (
              <Card key={kit.name} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <CardTitle className="text-lg">{kit.name}</CardTitle>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xl font-bold text-orange-500">${kit.price}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${difficultyColor[kit.difficulty]}`}>
                        {kit.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">{kit.circuit}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{kit.description}</p>
                  <a
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(kit.searchQuery)}&tag=pedalrig-20`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                  >
                    Search on Amazon →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What You'll Need */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">What You'll Need</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Most kits include all the electronic components. You'll need to supply the tools.
          </p>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="pt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {TOOLS.map((tool) => (
                  <div key={tool.name} className="flex items-start gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{tool.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{tool.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Step-by-Step Guide</h2>
          <div className="space-y-4">
            {STEPS.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                  {s.step}
                </div>
                <div className="pt-0.5">
                  <p className="font-semibold mb-1">{s.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Tips for Success</h2>
          <div className="space-y-3">
            {TIPS.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-orange-500 font-bold flex-shrink-0">✓</span>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">FAQ</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <p className="font-semibold mb-2">{faq.q}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                <Separator className="mt-6 bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-100 dark:to-zinc-900 border border-orange-500/20 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Not ready to build?</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Browse our curated pedal recommendations and find the right effect for your sound.
          </p>
          <Link
            href="/types"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Browse Pedal Recommendations →
          </Link>
        </section>

      </div>
    </main>
  );
}
